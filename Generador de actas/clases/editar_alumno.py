import mysql.connector
import tkinter as tk
from tkinter import messagebox
from tkinter import ttk  # Para usar Combobox

class EditarAlumnoWindow(tk.Toplevel):
    def __init__(self, parent, conexion):
        super().__init__(parent)
        self.conexion = conexion
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
        cursor = self.conexion.cursor()
        dni = self.dni_busqueda.get()
        try:
            if not dni.isdigit():
                messagebox.showerror("Error", "El DNI debe contener solo números")
                return
                
            cursor.execute("SELECT nombre, modalidad FROM alumno WHERE dni = %s", (dni,))
            alumno = cursor.fetchone()
            
            if alumno:
                self.nombre.set(alumno[0])
                self.modalidad.set(alumno[1])
                self.combo_modalidad.configure(style='TCombobox')
            else:
                messagebox.showerror("Error", "Alumno no encontrado")
                self.combo_modalidad.configure(style='Error.TCombobox')
        finally:
            cursor.close()

    def guardar_cambios(self):
        dni = self.dni_busqueda.get()
        nuevo_nombre = self.nombre.get().upper()
        nueva_modalidad = self.modalidad.get()
        
        if not dni.isdigit():
            messagebox.showerror("Error", "DNI inválido")
            return
            
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