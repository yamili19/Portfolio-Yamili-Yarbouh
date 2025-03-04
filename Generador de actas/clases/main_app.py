import tkinter as tk
from tkinter import ttk
from .editar_alumno import EditarAlumnoWindow
from .registro_materias import RegistroMateriasApp
from .tabla_permisos import TablaPermisos
from utils.generar_actas import generar_actas
from utils.generar_permisos import generar_permiso

class MainApp(tk.Tk):
    def __init__(self, conexion):
        super().__init__()
        self.conexion = conexion
        self.title("Sistema de Gestión de Exámenes")
        self.geometry("400x400")  # Aumentamos el tamaño para mejor visualización
        self.config(bg="#f0f0f0")
        
        # Contenedor principal centrado
        main_frame = tk.Frame(self, bg="#f0f0f0")
        main_frame.place(relx=0.5, rely=0.5, anchor="center")
        
        # Estilo para los botones del menú
        style = ttk.Style()
        style.configure("Menu.TButton", 
                       font=("Arial", 12), 
                       padding=10, 
                       width=20,
                       foreground="#333333")
        
        # Botones (versión corregida)
        botones = [
            ("Nuevo Registro", self.abrir_registro_materias),
            ("Ver Permisos", self.abrir_tabla_permisos),
            ("Editar Alumno", self.abrir_editar_alumno),
            ("Generar Permisos", lambda: generar_permiso(self.conexion)), # Usando lambda
            ("Generar Actas", lambda: generar_actas(self.conexion)), # Usando lambda
            ("Salir", self.quit)
        ]
        
        # Crear botones dinámicamente
        for texto, comando in botones:
            ttk.Button(
                main_frame, 
                text=texto, 
                style="Menu.TButton",
                command=comando  # Sin ejecución inmediata
            ).pack(pady=5, fill=tk.X)
        
        # Configuración responsiva
        self.grid_columnconfigure(0, weight=1)
        self.grid_rowconfigure(0, weight=1)
    
    def generar_cursos(self):
        cursos = []
        for anio in range(1, 8):
            for division in range(1, 3):
                cursos.append(f"{anio}°{division}°")
        return cursos
    
    def abrir_registro_materias(self):
        RegistroMateriasApp(self, self.conexion)
    
    def abrir_tabla_permisos(self):
        TablaPermisos(self, self.conexion)
    
    def abrir_editar_alumno(self):
        EditarAlumnoWindow(self, self.conexion)
