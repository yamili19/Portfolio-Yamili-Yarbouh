import mysql.connector
import tkinter as tk
from tkinter import messagebox
from tkinter import ttk  # Para usar Combobox

class EditarAlumnoWindow(tk.Toplevel):
    def __init__(self, parent, conexion):
        super().__init__(parent)
        self.conexion = conexion
        self.title("Editar Alumno")
        self.geometry("400x300")
        
        self.dni_busqueda = tk.StringVar()
        self.nombre = tk.StringVar()
        self.modalidad = tk.StringVar()
        
        tk.Label(self, text="DNI del Alumno:").pack(pady=5)
        tk.Entry(self, textvariable=self.dni_busqueda).pack(pady=5)
        tk.Button(self, text="Buscar", command=self.buscar_alumno).pack(pady=5)
        
        tk.Label(self, text="Nombre:").pack(pady=5)
        tk.Entry(self, textvariable=self.nombre).pack(pady=5)
        
        tk.Label(self, text="Modalidad:").pack(pady=5)
        self.combo_modalidad = ttk.Combobox(self, textvariable=self.modalidad, 
                                          values=["MMO", "TEM", "POLIMODAL"])
        self.combo_modalidad.pack(pady=5)
        
        tk.Button(self, text="Guardar Cambios", command=self.guardar_cambios).pack(pady=10)
    
    def buscar_alumno(self):
        cursor = self.conexion.cursor()
        dni = self.dni_busqueda.get()
        try:
            cursor.execute("SELECT nombre, modalidad FROM alumno WHERE dni = %s", (dni,))
            alumno = cursor.fetchone()
            if alumno:
                self.nombre.set(alumno[0])
                self.modalidad.set(alumno[1])
            else:
                messagebox.showerror("Error", "Alumno no encontrado")
        finally:
            cursor.close()
    
    def guardar_cambios(self):
        dni = self.dni_busqueda.get()
        nuevo_nombre = self.nombre.get().upper()
        nueva_modalidad = self.modalidad.get()
        
        cursor = self.conexion.cursor()
        try:
            cursor.execute("""
                UPDATE alumno 
                SET nombre = %s, 
                    modalidad = %s 
                WHERE dni = %s
            """, (nuevo_nombre, nueva_modalidad, dni))
            
            self.conexion.commit()
            messagebox.showinfo("Éxito", "Datos actualizados correctamente")
            self.destroy()
        except mysql.connector.Error as err:
            self.conexion.rollback()
            messagebox.showerror("Error", f"Error al actualizar: {err}")
        finally:
            cursor.close()