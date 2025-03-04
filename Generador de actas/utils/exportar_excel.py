from tkinter import messagebox, filedialog
import pandas as pd
def exportar_a_excel(conexion):
    path = filedialog.askdirectory(title="Seleccionar carpeta para exportar")
    if not path:
        messagebox.showwarning("Advertencia", "No se seleccionó ninguna ubicación")
        return
    
    try:
        cursor = conexion.cursor()
        cursor.execute("""
            SELECT p.nro, a.dni, a.nombre, m.nombre AS materia, dp.curso, dp.condicion, dp.nota 
            FROM permiso p
            JOIN detalle_permiso dp ON p.nro = dp.id_permiso
            JOIN alumno a ON p.dni = a.dni
            JOIN materia m ON dp.materia = m.id
        """)
        permisos = cursor.fetchall()
        df_permisos = pd.DataFrame(permisos, columns=["Número", "DNI", "Alumno", "Materia", "Curso", "Condición", "Nota"])

        cursor.execute("""
            SELECT m.nombre AS materia, m.modalidad, dp.curso, dp.condicion, COUNT(*) AS cantidad_alumnos 
            FROM detalle_permiso dp
            JOIN materia m ON dp.materia = m.id
            GROUP BY m.nombre, m.modalidad, dp.curso, dp.condicion
        """)
        actas = cursor.fetchall()
        df_actas = pd.DataFrame(actas, columns=["Materia", "Modalidad", "Curso", "Condición", "Cantidad de Alumnos"])

        df_permisos.to_excel(f"{path}/permisos.xlsx", index=False)
        df_actas.to_excel(f"{path}/actas.xlsx", index=False)

        messagebox.showinfo("Éxito", f"Archivos exportados correctamente en:\n{path}")
    except Exception as e:
        messagebox.showerror("Error", f"Error al exportar a Excel:\n{str(e)}")