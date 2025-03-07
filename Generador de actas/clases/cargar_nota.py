import tkinter as tk
from tkinter import ttk, messagebox
import mysql.connector
class CargarNotaWindow(tk.Toplevel):
    def __init__(self, parent, conexion, id_permiso, materia_id):
        super().__init__(parent)
        self.conexion = conexion
        self.id_permiso = id_permiso
        self.materia_id = materia_id
        self.title("Cargar Nota")
        self.geometry("300x150")
        self.configure(bg='#f0f2f5')
        
        self.nota = tk.StringVar()
        
        ttk.Label(self, text="Nota obtenida:", background='#f0f2f5').pack(pady=10)
        
        self.entry_nota = ttk.Entry(self, textvariable=self.nota, width=10, 
                                  font=('Arial', 12), justify='center')
        self.entry_nota.pack(pady=5)
        
        btn_frame = ttk.Frame(self)
        btn_frame.pack(pady=10)
        
        ttk.Button(btn_frame, text="Guardar", command=self.guardar_nota).grid(row=0, column=0, padx=5)
        ttk.Button(btn_frame, text="Cancelar", command=self.destroy).grid(row=0, column=1, padx=5)
        
        self.cargar_nota_actual()
    
    def cargar_nota_actual(self):
        cursor = self.conexion.cursor()
        try:
            cursor.execute('''
                SELECT nota FROM detalle_permiso 
                WHERE id_permiso = %s AND materia = %s
            ''', (self.id_permiso, self.materia_id))
            resultado = cursor.fetchone()
            if resultado and resultado[0]:
                self.nota.set(str(resultado[0]))
        except Exception as e:
            messagebox.showerror("Error", f"Error al cargar las notas: {e}")
        finally:
            cursor.close()
    
    def guardar_nota(self):
        try:
            nota_valor = float(self.nota.get().replace(',', '.'))
            if not (1 <= nota_valor <= 10):
                raise ValueError
        except ValueError:
            messagebox.showerror("Error", "🚨 Ingrese una nota válida (1-10)")
            return
            
        cursor = self.conexion.cursor()
        try:
            cursor.execute('''
                UPDATE detalle_permiso 
                SET nota = %s 
                WHERE id_permiso = %s AND materia = %s
            ''', (nota_valor, self.id_permiso, self.materia_id))
            self.conexion.commit()
            messagebox.showinfo("Éxito", "✅ Nota actualizada correctamente")
            self.master.cargar_datos()
            self.destroy()
        except mysql.connector.Error as err:
            self.conexion.rollback()
            messagebox.showerror("Error", f"🚨 No se pudo guardar la nota: {err}")
        finally:
            cursor.close()
