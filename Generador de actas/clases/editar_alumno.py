import tkinter as tk
from tkinter import messagebox
from tkinter import ttk  # Para usar Combobox
from modelos.init import Alumno
from sqlalchemy.exc import IntegrityError, SQLAlchemyError


class EditarAlumnoWindow(tk.Toplevel):
    def __init__(self, parent, session):
        super().__init__(parent)
        self.session = session
        self.title("Editar Alumno")
        self.geometry("500x400")
        self.resizable(False, False)
        self.configure(bg='#f0f2f5')
        
        # Estilos
        self.style = ttk.Style()
        self.style.theme_use('clam')
        self._configurar_estilos()
        
        # Variables
        self.dni_busqueda = tk.StringVar()
        self.nombre = tk.StringVar()
        self.modalidad = tk.StringVar()
        
        # Frame principal
        main_frame = ttk.Frame(self, style='Main.TFrame')
        main_frame.pack(padx=20, pady=20, fill='both', expand=True)
        
        # Título
        ttk.Label(main_frame, 
                 text="Editar Alumno", 
                 style='Titulo.TLabel').grid(row=0, column=0, columnspan=2, pady=15)
        
        # Sección de búsqueda
        self._crear_seccion_busqueda(main_frame)
        
        # Sección de edición
        self._crear_seccion_edicion(main_frame)
        
        # Botón Guardar
        self.btn_guardar = ttk.Button(main_frame, 
                                     text="💾 Guardar Cambios", 
                                     style='Accent.TButton',
                                     command=self.guardar_cambios,
                                     state='disabled')
        self.btn_guardar.grid(row=4, column=0, columnspan=2, pady=20, ipadx=20)
        
        # Validación de entrada
        self.dni_busqueda.trace_add('write', self._validar_dni)

    def _configurar_estilos(self):
        """Configura los estilos visuales"""
        self.style.configure('Main.TFrame', background='#f0f2f5')
        self.style.configure('Titulo.TLabel', 
                           font=('Arial', 14, 'bold'), 
                           foreground='#2d3748',
                           background='#f0f2f5')
        self.style.configure('Seccion.TLabelframe', 
                           font=('Arial', 10, 'bold'),
                           foreground='#4a5568',
                           background='#f0f2f5')
        self.style.configure('Entrada.TEntry', 
                           font=('Arial', 10),
                           padding=5,
                           relief='flat')
        self.style.configure('Accent.TButton', 
                           foreground='white',
                           background='#4CAF50',
                           font=('Arial', 10, 'bold'),
                           padding=10,
                           borderwidth=0)
        self.style.map('Accent.TButton',
                     background=[('active', '#45a049'), ('disabled', '#81C784')])
        self.style.configure('TCombobox', 
                           font=('Arial', 10),
                           padding=5)

    def _crear_seccion_busqueda(self, parent):
        """Crea la sección de búsqueda"""
        frame_busqueda = ttk.LabelFrame(parent, 
                                      text="Búsqueda de Alumno", 
                                      style='Seccion.TLabelframe')
        frame_busqueda.grid(row=1, column=0, columnspan=2, pady=10, sticky='ew')
        
        ttk.Label(frame_busqueda, 
                 text="DNI del Alumno:", 
                 style='Filtro.TLabel').grid(row=0, column=0, padx=5, pady=5)
        
        entry_dni = ttk.Entry(frame_busqueda, 
                             textvariable=self.dni_busqueda,
                             style='Entrada.TEntry',
                             width=20)
        entry_dni.grid(row=0, column=1, padx=5, pady=5)
        
        btn_buscar = ttk.Button(frame_busqueda, 
                              text="🔍 Buscar", 
                              style='Accent.TButton',
                              command=self.buscar_alumno)
        btn_buscar.grid(row=0, column=2, padx=5, pady=5)

    def _crear_seccion_edicion(self, parent):
        """Crea la sección de edición"""
        frame_edicion = ttk.LabelFrame(parent, 
                                     text="Datos del Alumno", 
                                     style='Seccion.TLabelframe')
        frame_edicion.grid(row=2, column=0, columnspan=2, pady=10, sticky='ew')
        
        # Nombre
        ttk.Label(frame_edicion, 
                 text="Nombre completo:", 
                 style='Filtro.TLabel').grid(row=0, column=0, padx=5, pady=5, sticky='e')
        ttk.Entry(frame_edicion, 
                textvariable=self.nombre,
                style='Entrada.TEntry').grid(row=0, column=1, padx=5, pady=5, sticky='ew')
        
        # Modalidad
        ttk.Label(frame_edicion, 
                 text="Modalidad:", 
                 style='Filtro.TLabel').grid(row=1, column=0, padx=5, pady=5, sticky='e')
        self.combo_modalidad = ttk.Combobox(frame_edicion, 
                                          textvariable=self.modalidad,
                                          values=["MMO", "TEM", "POLIMODAL"],
                                          style='TCombobox',
                                          state='readonly')
        self.combo_modalidad.grid(row=1, column=1, padx=5, pady=5, sticky='ew')

    def _validar_dni(self, *args):
        """Valida que el DNI contenga solo números"""
        dni = self.dni_busqueda.get()
        if dni.isdigit() or dni == "":
            self.style.configure('Entrada.TEntry', foreground='black')
            self.btn_guardar.state(['!disabled'])
        else:
            self.style.configure('Entrada.TEntry', foreground='red')
            self.btn_guardar.state(['disabled'])

    def buscar_alumno(self):
        dni = self.dni_busqueda.get()
        try:
            if not dni.isdigit():
                messagebox.showerror("Error", "El DNI debe contener solo números")
                return
                
            # Buscar alumno usando ORM
            alumno = self.session.query(Alumno).get(dni)
            
            if alumno:
                self.nombre.set(alumno.nombre)
                self.modalidad.set(alumno.modalidad)
                self.combo_modalidad.configure(style='TCombobox')
            else:
                messagebox.showerror("Error", "Alumno no encontrado")
                self.combo_modalidad.configure(style='Error.TCombobox')
                
        except SQLAlchemyError as e:
            messagebox.showerror("Error", f"Error de base de datos: {str(e)}")


    def guardar_cambios(self):
        dni = self.dni_busqueda.get()
        nuevo_nombre = self.nombre.get().upper()
        nueva_modalidad = self.modalidad.get()
        
        if not dni.isdigit():
            messagebox.showerror("Error", "DNI inválido")
            return
            
        try:
            # Obtener y actualizar alumno usando ORM
            alumno = self.session.query(Alumno).get(dni)
            
            if not alumno:
                messagebox.showerror("Error", "Alumno no encontrado")
                return
                
            alumno.nombre = nuevo_nombre
            alumno.modalidad = nueva_modalidad
            
            self.session.commit()
            messagebox.showinfo("Éxito", "✅ Datos actualizados correctamente")
            self.destroy()
            
        except IntegrityError as e:
            self.session.rollback()
            messagebox.showerror("Error", 
                f"Error de integridad: {str(e.orig)}")
        except SQLAlchemyError as e:
            self.session.rollback()
            messagebox.showerror("Error", 
                f"Error de base de datos: {str(e)}")