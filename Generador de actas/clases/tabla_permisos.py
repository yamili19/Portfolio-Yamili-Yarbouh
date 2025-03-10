import mysql.connector
import tkinter as tk
from tkinter import messagebox
from sqlalchemy.exc import SQLAlchemyError
from tkinter import ttk  # Para usar Combobox
from .cargar_nota import CargarNotaWindow
from utils.utils import filtrar_materias
from modelos.init import Materia, DetallePermiso, Permiso, Alumno



class TablaPermisos(tk.Toplevel):
    def __init__(self, parent, session):
        super().__init__(parent)
        self.session = session
        self.master = parent
        self.title("Registro de Permisos de Examen")
        self.geometry("1280x720")
        self.configure(bg='#f0f2f5')
        
        # Variables de filtrado
        self.filtro_dni = tk.StringVar()
        self.filtro_nombre = tk.StringVar()
        self.filtro_materia = tk.StringVar()
        
        # Configurar estilos
        self.style = ttk.Style()
        self._configurar_estilos()
        
        # Crear interfaz
        self._crear_filtros_modernos()
        self._crear_tabla()
        self._crear_menu_contextual()
        
        # Cargar datos iniciales
        self.cargar_datos()
        self.cargar_materias()

    def _configurar_estilos(self):
        """Configura todos los estilos visuales"""
        self.style.theme_use('clam')
        
        # Estilo general
        self.style.configure('TFrame', background='#f0f2f5')
        
        # Estilos para filtros
        self.style.configure('Filtro.TEntry', 
            font=('Arial', 10), 
            padding=5,
            relief='flat'
        )
        self.style.configure('Filtro.TCombobox', 
            font=('Arial', 10),
            padding=5
        )
        self.style.configure('Filtro.TLabel', 
            font=('Arial', 10, 'bold'), 
            background='#f0f2f5',
            foreground='#2d3748'
        )
        
        # Estilos para botones
        self.style.configure('Buscar.TButton', 
            foreground='white',
            background='#4CAF50',
            font=('Arial', 10, 'bold'),
            padding=10,
            borderwidth=0,
            relief='flat'
        )
        self.style.map('Buscar.TButton',
            background=[('active', '#45a049'), ('disabled', '#81C784')]
        )
        
        self.style.configure('Limpiar.TButton', 
            foreground='white',
            background='#607D8B',
            font=('Arial', 10, 'bold'),
            padding=10,
            borderwidth=0,
            relief='flat'
        )
        self.style.map('Limpiar.TButton',
            background=[('active', '#546E7A'), ('disabled', '#90A4AE')]
        )

        # Estilo para la tabla
        self.style.configure('Treeview.Heading', 
            font=('Arial', 10, 'bold'), 
            background='#4a5568', 
            foreground='white',
            padding=8,
            relief='flat'
        )
        self.style.configure('Treeview', 
            font=('Arial', 10), 
            rowheight=30,
            fieldbackground='#ffffff',
            background='#ffffff',
            borderwidth=0
        )
        self.style.map('Treeview', 
            background=[('selected', '#cbd5e0')],
            foreground=[('selected', 'black')]
        )

    def _crear_filtros_modernos(self):
        """Crea la sección de filtros con diseño moderno"""
        frame_filtros = ttk.Frame(self, style='TFrame')
        frame_filtros.pack(pady=15, padx=20, fill='x')
        
        # Elementos de filtrado
        elementos = [
            ('DNI:', self.filtro_dni, 15),
            ('Nombre:', self.filtro_nombre, 20),
            ('Materia:', self.filtro_materia, 25)
        ]
        
        for texto, variable, ancho in elementos:
            contenedor = ttk.Frame(frame_filtros)
            contenedor.pack(side='left', padx=8)
            
            lbl = ttk.Label(contenedor, text=texto, style='Filtro.TLabel')
            lbl.pack(side='left')
            
            if texto == 'Materia:':
                self.combo_materias = ttk.Combobox(contenedor, 
                    textvariable=variable, 
                    width=ancho,
                    style='Filtro.TCombobox'
                )
                self.combo_materias.pack(side='left')
                self.combo_materias.bind("<KeyRelease>", lambda event: filtrar_materias(self.combo_materias, self.materias))

            else:
                entry = ttk.Entry(contenedor, 
                    textvariable=variable, 
                    width=ancho,
                    style='Filtro.TEntry'
                )
                entry.pack(side='left')

        # Contenedor de botones
        btn_contenedor = ttk.Frame(frame_filtros)
        btn_contenedor.pack(side='left', padx=15)
        
        # Botones con íconos
        ttk.Button(btn_contenedor, 
            text="🔍 Buscar", 
            style='Buscar.TButton',
            command=self.cargar_datos
        ).pack(side='left', padx=5, ipadx=8)
        
        ttk.Button(btn_contenedor, 
            text="🧹 Limpiar", 
            style='Limpiar.TButton',
            command=self.limpiar_filtros
        ).pack(side='left', padx=5, ipadx=8)

    def _crear_tabla(self):
        """Crea y configura la tabla con estilo moderno"""
        contenedor_tabla = ttk.Frame(self)
        contenedor_tabla.pack(padx=20, pady=(0, 20), fill='both', expand=True)
        
        # Scrollbars
        scroll_y = ttk.Scrollbar(contenedor_tabla, orient='vertical')
        scroll_x = ttk.Scrollbar(contenedor_tabla, orient='horizontal')
        
        # Configurar Treeview
        self.tree = ttk.Treeview(
            contenedor_tabla,
            columns=('DNI', 'Nombre', 'Materia', 'Especialidad', 'Curso', 'Condición', 'Nota', 
                    'id_permiso', 'materia_id', 'curso_original'),
            show='headings',
            yscrollcommand=scroll_y.set,
            xscrollcommand=scroll_x.set,
            style='Treeview'
        )
        
        # Configurar columnas
        columnas = {
            'DNI': {'width': 120, 'anchor': 'center'},
            'Nombre': {'width': 250},
            'Materia': {'width': 200},
            'Especialidad': {'width': 120, 'anchor': 'center'},
            'Curso': {'width': 100, 'anchor': 'center'},
            'Condición': {'width': 120, 'anchor': 'center'},
            'Nota': {'width': 120, 'anchor': 'center'}
        }
        
        for col, config in columnas.items():
            self.tree.heading(col, text=col)
            self.tree.column(col, **config)
        
        # Ocultar columnas técnicas
        for col in ['id_permiso', 'materia_id', 'curso_original']:
            self.tree.column(col, width=0, stretch=False)
        
        # Configurar scrollbars
        scroll_y.config(command=self.tree.yview)
        scroll_x.config(command=self.tree.xview)
        
        # Diseño en grid
        self.tree.grid(row=0, column=0, sticky='nsew')
        scroll_y.grid(row=0, column=1, sticky='ns')
        scroll_x.grid(row=1, column=0, sticky='ew')
        
        contenedor_tabla.grid_rowconfigure(0, weight=1)
        contenedor_tabla.grid_columnconfigure(0, weight=1)
    
    def cargar_nota(self):
        selected = self.tree.selection()
        if not selected:
            return
            
        item = self.tree.item(selected[0])
        valores = item['values']
        CargarNotaWindow(self, self.session, valores[7], valores[8])
        self.cargar_datos()

    def _crear_menu_contextual(self):
        """Crea el menú contextual con estilo moderno"""
        self.menu = tk.Menu(
            self,
            tearoff=0,
            bg='#2d3748',
            fg='white',
            font=('Arial', 10),
            activebackground='#4a5568',
            activeforeground='white'
        )
        self.menu.add_command(
            label="✖️ Eliminar Registro",
            command=self.eliminar_registro
        )
        self.menu.add_command(
            label="✏️ Modificar Registro",
            command=self.modificar_registro
        )

        self.menu.add_command(
            label="📝 Cargar Nota",
            command=self.cargar_nota
        )

        self.tree.bind("<Button-3>", self.mostrar_menu)

    def mostrar_menu(self, event):
        """Muestra el menú contextual en la posición del clic"""
        item = self.tree.identify_row(event.y)
        if item:
            self.tree.selection_set(item)
            self.menu.post(event.x_root, event.y_root)
        
    def cargar_materias(self):
        try:
            self.materias = [m.nombre for m in self.session.query(Materia.nombre).distinct().all()]
            self.combo_materias['values'] = self.materias
        except SQLAlchemyError as e:
            messagebox.showerror("Error", f"Error al cargar las materias: {str(e)}")

    def limpiar_filtros(self):
        self.filtro_dni.set('')
        self.filtro_nombre.set('')
        self.filtro_materia.set('')
        self.cargar_datos()


    def mostrar_menu(self, event):
        item = self.tree.identify_row(event.y)
        if item:
            self.tree.selection_set(item)
            self.menu.post(event.x_root, event.y_root)
    
    def eliminar_registro(self):
        selected = self.tree.selection()
        if not selected:
            return
            
        item = self.tree.item(selected[0])
        valores = item['values']
        
        try:
            # Obtener el detalle a eliminar
            detalle = self.session.query(DetallePermiso).filter(
                DetallePermiso.id_permiso == valores[7],
                DetallePermiso.materia == valores[8]
            ).one()
            
            # Eliminar detalle
            self.session.delete(detalle)
            
            # Verificar si quedan otros detalles
            permiso = self.session.query(Permiso).get(valores[7])
            if not permiso.detalles:  # Si no hay más detalles
                self.session.delete(permiso)
            
            self.session.commit()
            self.cargar_datos()
            messagebox.showinfo("Éxito", "Registro eliminado correctamente")
            
        except SQLAlchemyError as e:
            self.session.rollback()
            messagebox.showerror("Error", f"No se pudo eliminar: {str(e)}")

    
    def modificar_registro(self):
        selected = self.tree.selection()
        if not selected:
            return
            
        item = self.tree.item(selected[0])
        valores = item['values']
        
        # Ventana de modificación
        edit_win = tk.Toplevel(self)
        edit_win.title("Modificar Registro")
        edit_win.configure(bg='#f0f2f5')
        edit_win.geometry("500x400")
        edit_win.resizable(False, False)

        # Frame principal
        main_frame = ttk.Frame(edit_win, style='TFrame')
        main_frame.pack(padx=20, pady=20, fill='both', expand=True)

        # Título
        ttk.Label(main_frame, 
                text="Editar Registro de Permiso", 
                style='Titulo.TLabel',
                font=('Arial', 14, 'bold')).grid(row=0, column=0, columnspan=2, pady=15)

        # Variables
        materia = tk.StringVar(value=f"{valores[7]} - {valores[2]}")
        modalidad = tk.StringVar(value=valores[3])
        curso = tk.StringVar(value=valores[4])
        condicion = tk.StringVar(value=valores[5])

        # Función para actualizar materias con ORM
        def actualizar_materias_combo(event=None):
            try:
                materias = self.session.query(Materia).filter(
                    Materia.modalidad == modalidad.get()
                ).all()
                
                materias_modalidad = [f"{m.id} - {m.nombre}" for m in materias]
                combo_materia['values'] = materias_modalidad
                return materias_modalidad
                
            except SQLAlchemyError as e:
                messagebox.showerror("Error", f"Error al cargar las materias: {str(e)}")
                return []

        # Configurar grid
        rows = [
            ('DNI:', valores[0]),
            ('Nombre:', valores[1]),
            ('Especialidad:', valores[3]),
            ('Materia:', materia),
            ('Curso:', curso),
            ('Condición:', condicion)
        ]

        for i, (label_text, value) in enumerate(rows, start=1):
            # Etiquetas
            ttk.Label(main_frame, 
                    text=label_text, 
                    style='Filtro.TLabel').grid(row=i, column=0, padx=10, pady=8, sticky='e')
            
            # Campos
            if label_text in ['DNI:', 'Nombre:', 'Especialidad:']:
                ttk.Label(main_frame, 
                        text=value, 
                        style='Dato.TLabel').grid(row=i, column=1, padx=10, pady=8, sticky='w')
            elif label_text == 'Materia:':
                combo_materia = ttk.Combobox(main_frame, 
                                            textvariable=value,
                                            style='Filtro.TCombobox')
                combo_materia.grid(row=i, column=1, padx=10, pady=8, sticky='ew')
                materias_modalidad = actualizar_materias_combo()
                combo_materia.bind("<KeyRelease>", lambda event: filtrar_materias(combo_materia, materias_modalidad))

            elif label_text == 'Curso:':
                combo_curso = ttk.Combobox(main_frame, 
                                        textvariable=value, 
                                        values=self.master.generar_cursos(),
                                        style='Filtro.TCombobox')
                combo_curso.grid(row=i, column=1, padx=10, pady=8, sticky='ew')
            elif label_text == 'Condición:':
                combo_condicion = ttk.Combobox(main_frame, 
                                            textvariable=value, 
                                            values=["LIBRE", "REGULAR"],
                                            style='Filtro.TCombobox')
                combo_condicion.grid(row=i, column=1, padx=10, pady=8, sticky='ew')

        def guardar_cambios():
            try:
                # Obtener el detalle del permiso usando ORM
                detalle = self.session.query(DetallePermiso).filter(
                    DetallePermiso.id_permiso == valores[7],
                    DetallePermiso.materia == valores[8]
                ).one()

                # Actualizar los campos
                detalle.condicion = condicion.get()
                detalle.materia = int(materia.get().split(" - ")[0])
                detalle.curso = curso.get()

                self.session.commit()
                
                self.cargar_datos()
                edit_win.destroy()
                messagebox.showinfo("Éxito", "Registro actualizado correctamente")
                
            except SQLAlchemyError as e:
                self.session.rollback()
                messagebox.showerror("Error", f"Error al actualizar: {str(e)}")
            except ValueError:
                messagebox.showerror("Error", "Formato de materia inválido")
            except Exception as e:
                messagebox.showerror("Error", f"Error inesperado: {str(e)}")

        # Botón de guardar
        btn_guardar = ttk.Button(main_frame, 
                                text="💾 Guardar Cambios", 
                                style='Buscar.TButton',
                                command=guardar_cambios)
        btn_guardar.grid(row=7, column=0, columnspan=2, pady=20, ipadx=20)

        # Estilos
        self.style.configure('Titulo.TLabel', 
                        foreground='#2d3748', 
                        background='#f0f2f5')
        
        self.style.configure('Dato.TLabel', 
                            foreground='#4a5568',
                            background='#f0f2f5',
                            font=('Arial', 10))

    def cargar_datos(self):
        try:
            # Construir consulta con ORM
            query = self.session.query(
                Alumno.dni,
                Alumno.nombre,
                Materia.nombre,
                Materia.modalidad,
                DetallePermiso.curso,
                DetallePermiso.condicion,
                DetallePermiso.nota,
                Permiso.nro,
                DetallePermiso.materia,
                DetallePermiso.curso
            ).join(Permiso, Alumno.dni == Permiso.dni)\
             .join(DetallePermiso, Permiso.nro == DetallePermiso.id_permiso)\
             .join(Materia, DetallePermiso.materia_rel)

            # Aplicar filtros
            if self.filtro_dni.get():
                query = query.filter(Alumno.dni.contains(self.filtro_dni.get()))
            
            if self.filtro_nombre.get():
                query = query.filter(Alumno.nombre.ilike(f"%{self.filtro_nombre.get()}%"))
            
            if self.filtro_materia.get():
                query = query.filter(Materia.nombre == self.filtro_materia.get())

            resultados = query.order_by(Alumno.nombre).all()

            # Limpiar tabla
            for item in self.tree.get_children():
                self.tree.delete(item)
            
            # Insertar nuevos datos
            for row in resultados:
                self.tree.insert('', 'end', values=(
                    row[0],  # DNI
                    row[1],  # Nombre
                    row[2],  # Materia (nombre)
                    row[3],  # Especialidad (modalidad)
                    row[4],  # Curso
                    row[5],  # Condición
                    row[6],  # Nota
                    row[7],  # id_permiso
                    row[8],  # materia_id (ID de Materia)
                    row[9]   # curso_original (si es necesario)
    ))
                
        except SQLAlchemyError as e:
            messagebox.showerror("Error", f"Error al cargar datos:\n{str(e)}")