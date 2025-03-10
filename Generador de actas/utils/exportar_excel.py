from tkinter import messagebox, filedialog
import pandas as pd
from openpyxl import load_workbook
from datetime import datetime
from sqlalchemy import extract, and_, case, func
from sqlalchemy.exc import SQLAlchemyError
from modelos.init import Materia, DetallePermiso, Permiso, Alumno

def ajustar_ancho_columnas(ruta_excel):
    """Ajusta el ancho de las columnas basado en el contenido"""
    try:
        wb = load_workbook(ruta_excel)
        ws = wb.active

        for col in ws.columns:
            max_length = 0
            col_letter = col[0].column_letter
            for cell in col:
                try:
                    if cell.value:
                        max_length = max(max_length, len(str(cell.value)))
                except:
                    pass
            adjusted_width = max_length + 2
            ws.column_dimensions[col_letter].width = adjusted_width

        wb.save(ruta_excel)
    except Exception as e:
        print(e)
        messagebox.showerror("Error", f"Error ajustando columnas: {str(e)}")

def exportar_a_excel(session):
    path = filedialog.askdirectory(title="Seleccionar carpeta para exportar")
    if not path:
        messagebox.showwarning("Advertencia", "No se seleccionó ninguna ubicación")
        return
    
    try:
        current_date = datetime.now()
        mes_actual = current_date.month
        año_actual = current_date.year

        # Consulta para permisos (usando solo el objeto query)
        permisos_query = (
            session.query(
                Permiso.nro,
                Alumno.dni,
                Alumno.nombre,
                Materia.nombre.label("materia"),
                DetallePermiso.curso,
                DetallePermiso.condicion,
                DetallePermiso.nota
            )
            .join(DetallePermiso, Permiso.detalles)
            .join(Alumno, Permiso.alumno)
            .join(Materia, DetallePermiso.materia_rel)
            .filter(
                and_(
                    extract('month', Permiso.fechaPermiso) == mes_actual,
                    extract('year', Permiso.fechaPermiso) == año_actual
                )
            )
        )

        df_permisos = pd.read_sql(permisos_query.statement, session.bind)

        # Consulta para actas con agregaciones (corregida)
        actas_query = (
            session.query(
                Materia.nombre.label("materia"),
                Materia.modalidad,
                DetallePermiso.curso,
                DetallePermiso.condicion,
                func.sum(
                    case((DetallePermiso.nota >= 6, 1), else_=0)
                ).label("aprobados"),
                func.sum(
                    case((DetallePermiso.nota < 6, 1), else_=0)
                ).label("desaprobados"),
                func.count('*').label("cantidad_alumnos")
            )
            .join(Permiso, DetallePermiso.permiso)
            .join(Materia, DetallePermiso.materia_rel)
            .filter(
                and_(
                    extract('month', Permiso.fechaPermiso) == mes_actual,
                    extract('year', Permiso.fechaPermiso) == año_actual
                )
            )
            .group_by(
                Materia.nombre,
                Materia.modalidad,
                DetallePermiso.curso,
                DetallePermiso.condicion
            )
        )

        df_actas = pd.read_sql(actas_query.statement, session.bind)

        # Después de crear los DataFrames
        if df_permisos.empty or df_actas.empty:
            messagebox.showwarning("Advertencia", "⚠️ No hay datos para exportar este mes")
            return

        # Generar rutas de archivo
        fecha = current_date.strftime("%m-%Y")
        ruta_permisos = f"{path}/permisos-{fecha}.xlsx"
        ruta_actas = f"{path}/actas-{fecha}.xlsx"

        try:
            # Exportar permisos
            df_permisos.to_excel(
                ruta_permisos, 
                index=False, 
                engine='openpyxl',
                sheet_name='Permisos'
            )
            ajustar_ancho_columnas(ruta_permisos)

            # Exportar actas
            df_actas.to_excel(
                ruta_actas, 
                index=False, 
                engine='openpyxl',
                sheet_name='Actas'
            )
            ajustar_ancho_columnas(ruta_actas)

        except PermissionError:
            messagebox.showerror("Error", "❌ Cierre los archivos Excel antes de guardar")
        except Exception as e:
            messagebox.showerror("Error", f"Error al guardar: {str(e)}")

        messagebox.showinfo("Éxito", f"✅ Archivos exportados correctamente en:\n{path}")

    except SQLAlchemyError as e:
        messagebox.showerror("Error", f"🚨 Error de base de datos:\n{str(e)}")
    except Exception as e:
        messagebox.showerror("Error", f"🚨 Error inesperado:\n{str(e)}")