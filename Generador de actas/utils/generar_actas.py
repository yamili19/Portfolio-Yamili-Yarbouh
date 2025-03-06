from tkinter import messagebox
import pandas as pd
import re
import os
from docx import Document
from .utils import obtener_ruta_recurso, aplicar_estilo_encabezado, aplicar_estilo_personalizado_celda
from tkinter import filedialog  


ruta_acta = obtener_ruta_recurso(r"recursos\ACTA DE EXAMEN.docx")

def generar_actas_examen(conexion, modalidad, base_path):
        cursor = conexion.cursor(dictionary=True)

        try:
            
            # Consulta para obtener datos de alumnos y materias
            cursor.execute('''
                SELECT a.nombre AS alumno, a.dni, dp.curso, dp.condicion, m.nombre AS materia, m.modalidad FROM detalle_permiso dp 
                JOIN permiso p ON p.nro = dp.id_permiso 
                JOIN alumno a ON p.dni = a.dni
                JOIN materia m ON dp.materia = m.id
                WHERE m.modalidad = %s
            ''', (modalidad,))
            
            datos = cursor.fetchall()
            
            
            # Agrupar por materia, curso y condición
            grupos = {}
            for registro in datos:
                clave = (registro['materia'], registro['curso'], registro['condicion'])
                if clave not in grupos:
                    grupos[clave] = []
                grupos[clave].append(registro)
            # Procesar cada grupo
            for (materia, curso, condicion), alumnos in grupos.items():
                doc = Document(ruta_acta)
                
                # Llenar encabezados del acta
                for paragraph in doc.paragraphs:
                    if "EXAMEN DE ALUMNO" in paragraph.text:
                        aplicar_estilo_encabezado(paragraph, "REGULAR", condicion)
                    if "ESPACIO CURRICULAR" in paragraph.text:
                        aplicar_estilo_encabezado(paragraph, "HISTORIA III", materia.split(" (")[0])
                    if "PLAN DE ESTUDIO" in paragraph.text:
                        aplicar_estilo_encabezado(paragraph, "TEM", modalidad)
                    if "CURSO" in paragraph.text:
                        aplicar_estilo_encabezado(paragraph, "3º1º", curso)
                
                # Llenar tabla con alumnos
                tabla = doc.tables[0]
                fila_actual = 2  # Empezar desde la tercera fila (0-based)
                
                for i, alumno in enumerate(alumnos, start=1):
                    if fila_actual >= len(tabla.rows):
                        tabla.add_row()
                    
                    celdas = tabla.rows[fila_actual].cells
                    aplicar_estilo_personalizado_celda(celdas[0], str(i).zfill(2), fuente="Arial", tamaño=11, negrita=True)
                    aplicar_estilo_personalizado_celda(celdas[2], alumno['alumno'], fuente="Arial", tamaño=9, negrita=True)
                    aplicar_estilo_personalizado_celda(celdas[9], str(alumno['dni']) if pd.notna(alumno['dni']) else "", fuente="Arial", tamaño=9, negrita=True)

                    for idx in [1, 3, 4, 5, 6, 7, 8]:
                        aplicar_estilo_personalizado_celda(celdas[idx], "", fuente="Arial", tamaño=9, negrita=True)
                    
                    fila_actual += 1
                
                # Limpiar caracteres inválidos en el nombre del archivo
                materia_limpia = re.sub(r'[<>:"/\\|?*]', '', materia.split(" (")[0])
                curso_limpio = re.sub(r'[<>:"/\\|?*]', '', curso)
                modalidad_limpia = re.sub(r'[<>:"/\\|?*]', '', modalidad)
                condicion_limpia = re.sub(r'[<>:"/\\|?*]', '', condicion)

                carpeta_modalidad = os.path.join(base_path, f"ACTAS_{modalidad.upper()}")
                if not os.path.exists(carpeta_modalidad):
                    os.makedirs(carpeta_modalidad)

                # Generar el nombre del archivo
                nombre_archivo = f"Acta_{modalidad_limpia}{materia_limpia}{curso_limpio}_{condicion_limpia}.docx"

                # Generar la ruta completa
                ruta_archivo = os.path.join(carpeta_modalidad, nombre_archivo)

                # Guardar el documento
                doc.save(ruta_archivo)
                
            messagebox.showinfo("Éxito", f"✅ Actas {str(modalidad)} generadas y guardadas correctamente en {base_path}")
        
        except Exception as e:
            messagebox.showerror("Error", f"🚨 Error al generar actas: {str(e)}")
    
def generar_actas(conexion):
    try:
        # Pedir ubicación para guardar
        base_path = filedialog.askdirectory(
            title="Seleccionar carpeta para guardar las actas",
            mustexist=True
        )
        
        if not base_path:  # Si el usuario cancela
            messagebox.showwarning("Operación cancelada", "No se seleccionó ubicación para guardar")
            return
            
        generar_actas_examen(conexion, "TEM", base_path)
        generar_actas_examen(conexion, "MMO", base_path)
        
    except Exception as e:
        messagebox.showerror("Error", f"Error al generar actas: {str(e)}")