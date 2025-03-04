import mysql.connector
import tkinter as tk
from tkinter import messagebox
from tkinter import ttk  # Para usar Combobox
from .tabla_permisos import TablaPermisos


class RegistroMateriasApp(tk.Toplevel):
    def __init__(self, parent, conexion):  # Agregar parámetro parent
        super().__init__(parent)
        self.conexion = conexion
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
        TablaPermisos(self, self.conexion)

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
        cursor = self.conexion.cursor()
        especialidad = self.especialidad.get()
        cursor.execute("SELECT id, nombre FROM materia WHERE modalidad = %s", (especialidad,))
        materias = [f"{row[0]} - {row[1]}" for row in cursor.fetchall()]
        self.combo_materia['values'] = materias
    
    def agregar_materia(self):
        materia = self.combo_materia.get()
        condicion = self.condicion.get()
        if materia and condicion:
            self.materias_seleccionadas.append((materia.split(" - ")[0], condicion))
            self.listbox.insert(tk.END, f"{materia.split(' - ')[1]} ({condicion})")
    
    def validar_campos(self):
        errores = []
        cursor = self.conexion.cursor()
        cursor.execute("SELECT modalidad FROM alumno WHERE dni = %s", (self.dni.get(),))
        resultado = cursor.fetchone()
        
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
        
        if not resultado:
            pass
        else:
            modalidad_bd = resultado[0]
            if modalidad_bd != self.especialidad.get():
                messagebox.showerror("Error", "La modalidad seleccionada no es la misma que que tiene registrada el alumno.")
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
            # Guardar alumno
            dni = self.dni.get()
            nombre = self.nombre.get()
            curso = self.curso.get()
            especialidad = self.especialidad.get()

            cursor = self.conexion.cursor()
        
            cursor.execute("INSERT IGNORE INTO alumno VALUES (%s, %s, %s)", (dni, nombre.upper(), especialidad.upper()))
        
            # 2. Obtener o crear permiso
            cursor.execute("SELECT nro FROM permiso WHERE dni = %s", (dni,))
            permiso_existente = cursor.fetchone()

            if permiso_existente:
                id_permiso = permiso_existente[0]
            else:
                cursor.execute("INSERT INTO permiso (dni) VALUES (%s)", (dni,))
                id_permiso = cursor.lastrowid
        
            # Guardar materias
            for materia_id, condicion in self.materias_seleccionadas:
                cursor.execute("INSERT INTO detalle_permiso (id_permiso, materia, condicion, curso) VALUES (%s, %s, %s, %s)", 
                         (id_permiso, int(materia_id), condicion, curso))
            self.conexion.commit()
        
            # Limpiar formulario
            self.dni.set('')
            self.nombre.set('')
            self.especialidad.set('')
            self.materia.set('')
            self.condicion.set('')
            self.curso.set('')
            self.listbox.delete(0, tk.END)
            self.materias_seleccionadas = []
        
            tk.messagebox.showinfo("Éxito", "Registro guardado correctamente")
        except mysql.connector.Error as err:
            self.conexion.rollback()
            messagebox.showerror("Error", f"Error de base de datos:\n{err}") 