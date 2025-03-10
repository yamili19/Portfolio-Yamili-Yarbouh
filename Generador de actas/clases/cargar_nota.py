import tkinter as tk
from tkinter import ttk, messagebox
from modelos.init import DetallePermiso
from sqlalchemy.exc import SQLAlchemyError

class CargarNotaWindow(tk.Toplevel):
    def __init__(self, parent, session, id_permiso, materia_id):
        super().__init__(parent)
        self.session = session
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
        try:
            # Buscar el detalle usando ORM
            detalle = self.session.query(DetallePermiso).filter(
                DetallePermiso.id_permiso == self.id_permiso,
                DetallePermiso.materia_id == self.materia_id
            ).first()
            
            if detalle and detalle.nota:
                self.nota.set(str(detalle.nota))
                
        except SQLAlchemyError as e:
            messagebox.showerror("Error", f"Error al cargar las notas: {str(e)}")
    
    def guardar_nota(self):
        try:
            nota_valor = float(self.nota.get().replace(',', '.'))
            if not (1 <= nota_valor <= 10):
                raise ValueError
        except ValueError:
            messagebox.showerror("Error", "🚨 Ingrese una nota válida (1-10)")
            return
            
        try:
            # Obtener y actualizar el registro usando ORM
            detalle = self.session.query(DetallePermiso).filter(
                DetallePermiso.id_permiso == self.id_permiso,
                DetallePermiso.materia_id == self.materia_id
            ).one()
            
            detalle.nota = nota_valor
            self.session.commit()
            
            messagebox.showinfo("Éxito", "✅ Nota actualizada correctamente")
            self.master.cargar_datos()  # Asumiendo que existe este método
            self.destroy()
            
        except SQLAlchemyError as e:
            self.session.rollback()
            messagebox.showerror("Error", f"🚨 No se pudo guardar la nota: {str(e)}")