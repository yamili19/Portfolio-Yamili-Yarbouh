import tkinter as tk
from tkinter import messagebox
from .editar_alumno import EditarAlumnoWindow
from .registro_materias import RegistroMateriasApp
from .tabla_permisos import TablaPermisos

class MainApp(tk.Tk):
    def __init__(self, conexion):
        super().__init__()
        self.conexion = conexion
        self.title("Sistema de Gestión de Exámenes")
        self.geometry("400x300")
        
        menubar = tk.Menu(self)
        
        file_menu = tk.Menu(menubar, tearoff=0)
        file_menu.add_command(label="Salir", command=self.quit)
        menubar.add_cascade(label="Archivo", menu=file_menu)
        
        registro_menu = tk.Menu(menubar, tearoff=0)
        registro_menu.add_command(label="Nuevo Registro", command=self.abrir_registro_materias)
        registro_menu.add_command(label="Ver Permisos", command=self.abrir_tabla_permisos)
        menubar.add_cascade(label="Registros", menu=registro_menu)
        
        editar_menu = tk.Menu(menubar, tearoff=0)
        editar_menu.add_command(label="Editar Alumno", command=self.abrir_editar_alumno)
        menubar.add_cascade(label="Alumno", menu=editar_menu)
        
        self.config(menu=menubar)
    
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