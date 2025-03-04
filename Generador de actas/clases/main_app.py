import tkinter as tk
from tkinter import ttk
from .editar_alumno import EditarAlumnoWindow
from .registro_materias import RegistroMateriasApp
from .tabla_permisos import TablaPermisos
from utils.generar_actas import generar_actas
from utils.generar_permisos import generar_permiso
from utils.exportar_excel import exportar_a_excel

class MainApp(tk.Tk):
    def __init__(self, conexion):
        super().__init__()
        self.conexion = conexion
        self.title("Sistema de Gestión de Exámenes")
        self.geometry("400x500")
        self.config(bg="#f0f0f0")
        
        # Configurar estilos primero
        self.establecer_estilo_botones()
        
        # Contenedor principal centrado
        main_frame = tk.Frame(self, bg="#f0f0f0")
        main_frame.place(relx=0.5, rely=0.5, anchor="center")

        # Lista de botones
        botones = [
            ("Nuevo Registro", self.abrir_registro_materias),
            ("Ver Permisos", self.abrir_tabla_permisos),
            ("Editar Alumno", self.abrir_editar_alumno),
            ("Generar Permisos", lambda: generar_permiso(self.conexion)),
            ("Generar Actas", lambda: generar_actas(self.conexion)),
            ("Exportar a Excel", lambda: exportar_a_excel(self.conexion)),
            ("Salir", self.quit)
        ]

        # Crear botones dinámicamente
        for texto, comando in botones:
            btn = ttk.Button(
                main_frame, 
                text=texto, 
                style="Menu.TButton",
                command=comando
            )
            btn.pack(pady=5, fill=tk.X)
            # Forzar aplicación del estilo
            btn.configure(style="Menu.TButton")
        
        # Actualizar estilos al recuperar el foco
        self.bind("<FocusIn>", self.reestablecer_estilos)

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
        RegistroMateriasApp(self, self.conexion)

    def abrir_tabla_permisos(self):
        TablaPermisos(self, self.conexion)
        self.establecer_estilo_botones()  # Restaurar el estilo después de abrir la tabla
    
    def abrir_editar_alumno(self):
        EditarAlumnoWindow(self, self.conexion)
    

