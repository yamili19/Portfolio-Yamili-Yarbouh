import tkinter as tk
from tkinter import messagebox
from tkinter import ttk  # Para usar Combobox
from modelos.init import Materia
from sqlalchemy.exc import IntegrityError  # Añade esta línea en las importaciones
from utils.utils import filtrar_materias


class AgregarMateriaWindow(tk.Toplevel):
    def __init__(self, parent, session):
        super().__init__(parent)
        self.session = session
        self.title("Agregar Materia")
        self.geometry("500x400")
        self.resizable(False, False)
        self.configure(bg='#f0f2f5')
        
        # Estilos
        self.style = ttk.Style()
        self.style.theme_use('clam')
        self._configurar_estilos()
        
        # Variables
        self.materia = tk.StringVar()
        self.modalidad = tk.StringVar()
        self.correlativa = tk.StringVar()
        self._configurar_validacion()  # Activar validación automática
        
        # Frame principal
        main_frame = ttk.Frame(self, style='Main.TFrame')
        main_frame.pack(padx=20, pady=20, fill='both', expand=True)
        
        # Título
        ttk.Label(main_frame, 
                 text="Agregar Materia", 
                 style='Titulo.TLabel').grid(row=0, column=0, columnspan=2, pady=15)
                
        # Sección de edición
        self._crear_seccion_edicion(main_frame)
        
        # Botón Guardar
        self.btn_guardar = ttk.Button(main_frame, 
                                     text="💾 Agregar Materia", 
                                     style='Accent.TButton',
                                     command=self.guardar_cambios,
                                     state='disabled')
        self.btn_guardar.grid(row=4, column=0, columnspan=2, pady=20, ipadx=20)
        
    def _configurar_validacion(self):
        """Configura la validación para habilitar el botón"""
        self.materia.trace_add('write', self.validar_campos)
        self.modalidad.trace_add('write', self.validar_campos)

    def validar_campos(self, *args):
        """Habilita el botón si todos los campos están completos"""
        if self.materia.get().strip() and self.modalidad.get().strip():
            self.btn_guardar['state'] = 'normal'
        else:
            self.btn_guardar['state'] = 'disabled'

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
        
        self.style.configure('Filtro.TLabel', 
                    foreground='#4a5568',
                    background='#f0f2f5',
                    font=('Arial', 9))

    def _crear_seccion_edicion(self, parent):
        """Crea la sección de edición"""
        frame_edicion = ttk.LabelFrame(parent, 
                                     text="Datos de la materia",
                                     style='Seccion.TLabelframe')
        frame_edicion.grid(row=2, column=0, columnspan=2, pady=10, sticky='ew')
        
        # Nombre
        ttk.Label(frame_edicion, 
                 text="Nombre Materia:", 
                 style='Filtro.TLabel').grid(row=0, column=0, padx=5, pady=5, sticky='e')
        ttk.Entry(frame_edicion, 
                textvariable=self.materia,
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
        self.combo_modalidad.bind("<<ComboboxSelected>>", self.actualizar_materias)

        ttk.Label(frame_edicion, text="Correlativa:", style='Filtro.TLabel').grid(row=2, column=0, padx=5, pady=5)
        self.combo_correlativa = ttk.Combobox(frame_edicion, textvariable=self.correlativa, width=35)
        self.combo_correlativa.grid(row=2, column=1, padx=5, pady=5)

    def actualizar_materias(self, event=None):
        modalidad = self.modalidad.get()
        materias = self.session.query(Materia).filter_by(modalidad=modalidad).all()
        self.lista_materias = [f"{m.id} - {m.nombre}" for m in materias]
        self.combo_correlativa['values'] = self.lista_materias
        self.combo_correlativa.bind('<KeyRelease>', self.filtrar_materias)

    def filtrar_materias(self, event=None):
        filtrar_materias(self.correlativa, self.lista_materias)

    def guardar_cambios(self):
        materia_nombre = self.materia.get().upper()
        modalidad = self.modalidad.get()

        if not materia_nombre or not modalidad:
            messagebox.showerror("Error", "Todos los campos son obligatorios")
            return

        try:
            # Verificar existencia usando ORM
            existe = self.session.query(Materia).filter(
                Materia.nombre == materia_nombre,
                Materia.modalidad == modalidad
            ).first()

            if existe:
                messagebox.showerror("Error", "⚠️ Esta materia ya existe en la modalidad seleccionada")
                return

            # Crear nueva materia con ORM
            nueva_materia = Materia(
                nombre=materia_nombre,
                modalidad=modalidad,
                correlativa=None  # Se puede asignar luego desde la UI
            )

            self.session.add(nueva_materia)
            self.session.commit()
            
            messagebox.showinfo("Éxito", "✅ Materia agregada correctamente")
            self.destroy()

        except IntegrityError as e:
            self.session.rollback()
            messagebox.showerror("Error", 
                f"🚨 Error de integridad: {str(e)}")
        except Exception as e:
            self.session.rollback()
            messagebox.showerror("Error", 
                f"🚨 Error inesperado: {str(e)}")