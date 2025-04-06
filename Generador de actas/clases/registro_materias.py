import tkinter as tk
from tkinter import messagebox
from tkinter import ttk  # Para usar Combobox
from .tabla_permisos import TablaPermisos
from utils.utils import filtrar_materias
from datetime import date
from modelos.init import Materia, DetallePermiso, Permiso, Alumno
from sqlalchemy.exc import IntegrityError


class RegistroMateriasApp(tk.Toplevel):
    def __init__(self, parent, session):  # Agregar parámetro parent
        super().__init__(parent)
        self.session = session
        self.title("Registro de Materias")
        self.geometry("1200x1200")
        
        self.dni = tk.StringVar()
        self.nombre = tk.StringVar()
        self.especialidad = tk.StringVar()
        self.curso = tk.StringVar() 
        self.materia = tk.StringVar()
        self.condicion = tk.StringVar()
        self.materias_seleccionadas = []
        
        self.crear_widgets()

    def mostrar_tabla(self):
        TablaPermisos(self, self.session)

    def validate_dni(self, new_value):
        # Valida que sólo contenga números
        return new_value.isdigit() or new_value == ""

        
    def crear_widgets(self):
        # Configurar estilos
        style = ttk.Style()
        style.theme_use('clam')
        
        # Estilo para botones principales
        style.configure('TButton',
            font=('Arial', 12, 'bold'),
            padding=10,
            relief='flat',
            foreground='#ffffff',
            background='#4CAF50',  # Verde moderno
            borderwidth=0
        )
        style.map('TButton',
            background=[('active', '#45a049'), ('disabled', '#cccccc')],
            foreground=[('disabled', '#666666')]
        )
        
        # Estilo para botones secundarios
        style.configure('Secondary.TButton',
            background='#2196F3',  # Azul
            font=('Arial', 11)
        )
        style.map('Secondary.TButton',
            background=[('active', '#1976D2')]
        )
        
        # Estilo para botones peligro
        style.configure('Danger.TButton',
            background='#f44336',  # Rojo
            font=('Arial', 11)
        )
        style.map('Danger.TButton',
            background=[('active', '#d32f2f')]
        )

        # Frame principal
        main_frame = ttk.Frame(self)
        main_frame.pack(pady=20, padx=20, fill='both', expand=True)

        # Campos para datos del alumno en un frame
        form_frame = ttk.LabelFrame(main_frame, text="Datos del Alumno")
        form_frame.pack(fill='x', pady=10)

        ttk.Label(form_frame, text="Nombre y Apellido:").grid(row=0, column=0, padx=5, pady=5, sticky='w')
        ttk.Entry(form_frame, textvariable=self.nombre, width=40).grid(row=0, column=1, padx=5, pady=5)

        ttk.Label(form_frame, text="DNI:").grid(row=1, column=0, padx=5, pady=5, sticky='w')
        vcmd = (self.register(self.validate_dni), '%P')
        ttk.Entry(form_frame, textvariable=self.dni, validate='key', 
                 validatecommand=vcmd, width=40).grid(row=1, column=1, padx=5, pady=5)

        ttk.Label(form_frame, text="Especialidad:").grid(row=2, column=0, padx=5, pady=5, sticky='w')
        self.combo_especialidad = ttk.Combobox(form_frame, textvariable=self.especialidad, 
                                              values=["MMO", "TEM", "POLIMODAL"])
        self.combo_especialidad.grid(row=2, column=1, padx=5, pady=5)
        self.combo_especialidad.bind("<<ComboboxSelected>>", self.actualizar_materias)

        # Frame para selección de materias
        materias_frame = ttk.LabelFrame(main_frame, text="Selección de Materias")
        materias_frame.pack(fill='x', pady=10)

        ttk.Label(materias_frame, text="Materia:").grid(row=0, column=0, padx=5, pady=5)
        self.combo_materia = ttk.Combobox(materias_frame, textvariable=self.materia, width=35)
        self.combo_materia.grid(row=0, column=1, padx=5, pady=5)

        ttk.Label(materias_frame, text="Curso:").grid(row=0, column=2, padx=5, pady=5)
        self.combo_curso = ttk.Combobox(materias_frame, textvariable=self.curso, 
                                      values=self.master.generar_cursos(), width=10)
        self.combo_curso.grid(row=0, column=3, padx=5, pady=5)

        ttk.Label(materias_frame, text="Condición:").grid(row=0, column=4, padx=5, pady=5)
        self.combo_condicion = ttk.Combobox(materias_frame, textvariable=self.condicion, 
                                         values=["LIBRE", "REGULAR"], width=12)
        self.combo_condicion.grid(row=0, column=5, padx=5, pady=5)

        # Botones de acciones
        btn_frame = ttk.Frame(materias_frame)
        btn_frame.grid(row=1, column=0, columnspan=6, pady=10)

        ttk.Button(btn_frame, text="➕ Agregar Materia", style='Secondary.TButton',
                 command=self.agregar_materia).pack(side='left', padx=5)
        ttk.Button(btn_frame, text="➖ Eliminar Selección", style='Danger.TButton',
                 command=self.eliminar_materia).pack(side='left', padx=5)

        # Listbox con scrollbar
        list_frame = ttk.Frame(main_frame)
        list_frame.pack(fill='both', expand=True, pady=10)

        scrollbar = ttk.Scrollbar(list_frame)
        scrollbar.pack(side='right', fill='y')

        self.listbox = tk.Listbox(list_frame, 
                                yscrollcommand=scrollbar.set,
                                selectbackground='#e0f7fa',
                                selectmode='single',
                                font=('Arial', 11),
                                height=8)
        self.listbox.pack(fill='both', expand=True)
        scrollbar.config(command=self.listbox.yview)

        # Botón final
        action_frame = ttk.Frame(main_frame)
        action_frame.pack(fill='x', pady=20)

        ttk.Button(action_frame, text="💾 Guardar Registro", 
                 style='TButton', command=self.guardar_registro).pack(pady=10)
        
        # Botón para mostrar tabla
        btn_frame_tabla = ttk.Frame(main_frame)
        btn_frame_tabla.pack(pady=15, fill='x')
        
        ttk.Button(btn_frame_tabla,
                  text="👁️ Ver Permisos Registrados",
                  style='Secondary.TButton',
                  command=self.mostrar_tabla,
                  width=30).pack(pady=5, ipady=3)

    def eliminar_materia(self):
        selected_index = self.listbox.curselection()
        if selected_index:
            index = selected_index[0]
            del self.materias_seleccionadas[index]
            self.listbox.delete(index)
        else:
            messagebox.showinfo("Información", "Seleccione una materia para eliminar.")
    
    
    def actualizar_materias(self, event=None):
        especialidad = self.especialidad.get()
        materias = self.session.query(Materia).filter_by(modalidad=especialidad).all()
        self.lista_materias = [f"{m.id} - {m.nombre}" for m in materias]
        self.combo_materia['values'] = self.lista_materias
        self.combo_materia.bind('<KeyRelease>', self.filtrar_materias)


    def filtrar_materias(self, event=None):
        filtrar_materias(self.combo_materia, self.lista_materias)

    def agregar_materia(self):
        materia = self.combo_materia.get()
        condicion = self.condicion.get()
        if materia and condicion:
            self.materias_seleccionadas.append((materia.split(" - ")[0], condicion))
            self.listbox.insert(tk.END, f"{materia.split(' - ')[1]} ({condicion})")
    
    def validar_campos(self):
        errores = []
        
        # Validar campos básicos
        if not self.nombre.get().strip():
            errores.append("Nombre y Apellido")
        if not self.dni.get().strip():
            errores.append("DNI")
        if not self.especialidad.get():
            errores.append("Especialidad")
        if not self.materia.get():
            errores.append("Materia")
        if not self.condicion.get():
            errores.append("Condición")
        if not self.curso.get():
            errores.append("Curso")
        
        # Validar materias agregadas
        if not self.materias_seleccionadas:
            errores.append("Debe agregar al menos una materia")
        
        # Mostrar errores si existen
        if errores:
            mensaje = "Faltan completar los siguientes campos:\n"
            mensaje += "\n".join(f"- {campo}" for campo in errores)
            messagebox.showerror("Error de validación", mensaje)
            return False
        
        # Validar modalidad usando ORM
        alumno = self.session.query(Alumno).get(self.dni.get())
        if alumno and alumno.modalidad != self.especialidad.get():
            messagebox.showerror("Error", "La modalidad no coincide con el alumno")
            return False
        
        return True
    
    def guardar_registro(self):

        if not self.validar_campos():
            return
        # Validación adicional del DNI
        if not self.dni.get().isdigit() or len(self.dni.get()) < 7:
            messagebox.showerror("Error", "DNI inválido: Debe contener sólo números y tener al menos 7 dígitos")
            return
        
        try:
            # Manejo de Alumno
            alumno = self.session.query(Alumno).get(self.dni.get())
            if not alumno:
                alumno = Alumno(
                    dni=self.dni.get(),
                    nombre=self.nombre.get().upper(),
                    modalidad=self.especialidad.get().upper()
                )
                self.session.add(alumno)

            # Manejo de Permiso
            permiso = self.session.query(Permiso).filter_by(dni=alumno.dni).first()
            if not permiso:
                permiso = Permiso(
                    dni=alumno.dni,
                    fechaPermiso=date.today()
                )
                self.session.add(permiso)
                self.session.flush()  # Generar ID del permiso

            # Agregar detalles
            for materia_id, condicion in self.materias_seleccionadas:
                detalle = DetallePermiso(
                    id_permiso=permiso.nro,
                    materia=int(materia_id),
                    condicion=condicion,
                    curso=self.curso.get()
                )
                self.session.add(detalle)

            self.session.commit()
            
            # Limpiar formulario
            self.limpiar_formulario()
            messagebox.showinfo("Éxito", "Registro guardado correctamente")

        except IntegrityError as e:
            self.session.rollback()
            self.manejar_error_integridad(e)
        except Exception as e:
            self.session.rollback()
            messagebox.showerror("Error", f"Error inesperado: {str(e)}")

    def limpiar_formulario(self):
        # Código para limpiar los campos
        self.dni.set('')
        self.nombre.set('')
        self.especialidad.set('')
        self.materia.set('')
        self.condicion.set('')
        self.curso.set('')
        self.listbox.delete(0, tk.END)
        self.materias_seleccionadas = []

    def manejar_error_integridad(self, error):
        if "Duplicate entry" in str(error.orig):
            messagebox.showerror("Error", 
                "El alumno ya está registrado en esta materia")
        else:
            messagebox.showerror("Error", 
                f"Error de base de datos: {error.orig}")
         