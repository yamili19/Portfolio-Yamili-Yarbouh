import tkinter as tk
from tkinter import ttk, messagebox
import threading
from .editar_alumno import EditarAlumnoWindow
from .registro_materias import RegistroMateriasApp
from .tabla_permisos import TablaPermisos
from utils.generar_actas import generar_actas
from utils.generar_permisos import generar_permiso
from utils.exportar_excel import exportar_a_excel
from .agregar_materia import AgregarMateriaWindow

class LoadingScreen(tk.Toplevel):
    def __init__(self, parent):
        super().__init__(parent)
        self.title("Procesando...")
        self.geometry("300x100")
        self.configure(bg='#f0f0f0')
        self.resizable(False, False)
        
        # Centrar la ventana
        parent_x = parent.winfo_x()
        parent_y = parent.winfo_y()
        parent_width = parent.winfo_width()
        parent_height = parent.winfo_height()
        
        x = parent_x + (parent_width - 300) // 2
        y = parent_y + (parent_height - 100) // 2
        
        self.geometry(f"+{x}+{y}")
        
        self.label = ttk.Label(
            self, 
            text="Procesando, por favor espere...",
            font=('Arial', 10),
            background='#f0f0f0'
        )
        self.label.pack(pady=10)
        
        self.progress = ttk.Progressbar(
            self, 
            mode='indeterminate',
            length=200
        )
        self.progress.pack()
        
        self.progress.start()

class MainApp(tk.Tk):
    def __init__(self, session):
        super().__init__()
        self.session = session
        self.title("Sistema de Gestión de Exámenes")
        self.geometry("400x500")
        self.config(bg="#f0f0f0")
        self.loading_screen = None
        
        # Configurar estilos
        self.establecer_estilo_botones()
        
        # Contenedor principal
        self.main_frame = tk.Frame(self, bg="#f0f0f0")
        self.main_frame.place(relx=0.5, rely=0.5, anchor="center")

        # Lista de botones
        botones = [
            ("Nuevo Registro", self.abrir_registro_materias),
            ("Ver Permisos", self.abrir_tabla_permisos),
            ("Agregar Materia", self.abrir_agregar_materia),
            ("Editar Alumno", self.abrir_editar_alumno),
            ("Generar Permisos", self.iniciar_generar_permisos),
            ("Generar Actas", self.iniciar_generar_actas),
            ("Exportar a Excel", self.iniciar_exportar_excel),
            ("Salir", self.quit)
        ]

        # Crear botones
        self.botones = []
        for texto, comando in botones:
            btn = ttk.Button(
                self.main_frame, 
                text=texto, 
                style="Menu.TButton",
                command=comando
            )
            btn.pack(pady=5, fill=tk.X)
            self.botones.append(btn)

        self.bind("<FocusIn>", self.reestablecer_estilos)

    def toggle_buttons(self, state):
        for btn in self.botones:
            btn.configure(state=state)

    def mostrar_loading(self):
        self.toggle_buttons('disabled')
        self.loading_screen = LoadingScreen(self)
        self.loading_screen.grab_set()

    def ocultar_loading(self):
        if self.loading_screen:
            self.loading_screen.destroy()
            self.loading_screen = None
        self.toggle_buttons('normal')

    def ejecutar_con_loading(self, funcion, *args):
        def wrapper():
            try:
                funcion(*args)
                #self.after(0, lambda: messagebox.showinfo("Éxito", "✅ Operación completada correctamente"))
            except Exception as e:
                self.after(0, lambda: messagebox.showerror("Error", f"🚨 Error: {str(e)}"))
            finally:
                self.after(0, self.ocultar_loading)
        
        self.mostrar_loading()
        threading.Thread(target=wrapper, daemon=True).start()

    def iniciar_generar_actas(self):
        self.ejecutar_con_loading(generar_actas, self.session)

    def iniciar_generar_permisos(self):
        self.ejecutar_con_loading(generar_permiso, self.session)

    def iniciar_exportar_excel(self):
        self.ejecutar_con_loading(exportar_a_excel, self.session)

    def establecer_estilo_botones(self):
        style = ttk.Style()
        style.theme_use('clam')  # Mantener el mismo tema en toda la aplicación
        style.configure("Menu.TButton", 
                        font=("Arial", 12), 
                        padding=10, 
                        width=20,
                        foreground="#333333",
                        background="#e1e1e1",
                        bordercolor="#cccccc",
                        relief="flat")
        style.map("Menu.TButton",
                background=[('active', '#d1d1d1'), ('disabled', '#f0f0f0')],
                relief=[('active', 'sunken'), ('!active', 'flat')])

    def reestablecer_estilos(self, event=None):
        """Reaplica los estilos al recuperar el foco"""
        self.establecer_estilo_botones()
        self.update_idletasks()

        
    def generar_cursos(self):
        """Genera todas las combinaciones de año y división"""
        cursos = []
        for anio in range(1, 8):  # Años del 1 al 7
            for division in range(1, 3):  # Divisiones 1 y 2
                cursos.append(f"{anio}°{division}°")
        return cursos
                        
        
    def abrir_registro_materias(self):
        RegistroMateriasApp(self, self.session)

    def abrir_agregar_materia(self):
        AgregarMateriaWindow(self, self.session)

    def abrir_tabla_permisos(self):
        TablaPermisos(self, self.session)
        self.establecer_estilo_botones()  # Restaurar el estilo después de abrir la tabla
    
    def abrir_editar_alumno(self):
        EditarAlumnoWindow(self, self.session)
    

