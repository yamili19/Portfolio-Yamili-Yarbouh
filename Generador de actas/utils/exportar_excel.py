from tkinter import messagebox, filedialog
import pandas as pd
from openpyxl import load_workbook

def ajustar_ancho_columnas(ruta_excel):
    """Ajusta el ancho de las columnas basado en el contenido"""
    wb = load_workbook(ruta_excel)
    ws = wb.active

    for col in ws.columns:
        max_length = 0
        col_letter = col[0].column_letter  # Obtiene la letra de la columna
        for cell in col:
            try:
                if cell.value:
                    max_length = max(max_length, len(str(cell.value)))
            except:
                pass
        ws.column_dimensions[col_letter].width = max_length + 2  # Ajuste con margen

    wb.save(ruta_excel)

def exportar_a_excel(conexion):
    path = filedialog.askdirectory(title="Seleccionar carpeta para exportar")
    if not path:
        messagebox.showwarning("Advertencia", "No se seleccionó ninguna ubicación")
        return
    cursor = conexion.cursor()

    try:
        cursor.execute("""
            SELECT p.nro, a.dni, a.nombre, m.nombre AS materia, dp.curso, dp.condicion, dp.nota 
            FROM permiso p
            JOIN detalle_permiso dp ON p.nro = dp.id_permiso
            JOIN alumno a ON p.dni = a.dni
            JOIN materia m ON dp.materia = m.id
        """)
        permisos = cursor.fetchall()
        df_permisos = pd.DataFrame(permisos, columns=["Número", "DNI", "Alumno", "Materia", "Curso", "Condición", "Nota"])

        # Exportar actas con aprobados y desaprobados
        cursor.execute("""
            SELECT 
                m.nombre AS materia, 
                m.modalidad, 
                dp.curso, 
                dp.condicion,
                COUNT(CASE WHEN dp.nota >= 6 THEN 1 END) AS aprobados,
                COUNT(CASE WHEN dp.nota < 6 THEN 1 END) AS desaprobados, 
                COUNT(*) AS cantidad_alumnos
            FROM detalle_permiso dp
            JOIN materia m ON dp.materia = m.id
            GROUP BY m.nombre, m.modalidad, dp.curso, dp.condicion
        """)
        actas = cursor.fetchall()
        df_actas = pd.DataFrame(actas, columns=["Materia", "Modalidad", "Curso", "Condición", "Aprobados", 'Desaprobados',"Cantidad de Alumnos"])

        # Rutas de los archivos
        ruta_permisos = f"{path}/permisos.xlsx"
        ruta_actas = f"{path}/actas.xlsx"

        # Guardar los archivos con openpyxl como motor
        df_permisos.to_excel(ruta_permisos, index=False, engine='openpyxl')
        df_actas.to_excel(ruta_actas, index=False, engine='openpyxl')

        # Ajustar columnas
        ajustar_ancho_columnas(ruta_permisos)
        ajustar_ancho_columnas(ruta_actas)


        messagebox.showinfo("Éxito", f"✅ Archivos exportados correctamente en:\n{path}")
    except Exception as e:
        messagebox.showerror("Error", f"Error al exportar a Excel:\n{str(e)}")
    finally:
        cursor.close()