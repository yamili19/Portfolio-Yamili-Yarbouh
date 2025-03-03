import mysql.connector
import tkinter as tk
from tkinter import messagebox
from tkinter import ttk  # Para usar Combobox
import pandas as pd
import sys
import re
import os
from docx.shared import Pt
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from datetime import datetime
from docx.shared import Pt
from docx import Document
from .utils import obtener_ruta_recurso

ruta_permiso = obtener_ruta_recurso(r"recursos\PERMISOS EXAMEN - 2023.docx")


class TablaPermisos(tk.Toplevel):
    def __init__(self, parent, conexion):
        super().__init__(parent)
        self.conexion = conexion
        self.master = parent
        self.title("Registro de Permisos de Examen")
        self.geometry("1200x600")
        # Frame para los filtros
        frame_filtros = tk.Frame(self)
        frame_filtros.pack(pady=10, fill='x')
        
        # Filtro por DNI
        tk.Label(frame_filtros, text="Filtrar por DNI:").pack(side='left', padx=5)
        self.filtro_dni = tk.StringVar()
        tk.Entry(frame_filtros, textvariable=self.filtro_dni, width=15).pack(side='left', padx=5)
        
        # Filtro por Nombre
        tk.Label(frame_filtros, text="Filtrar por Nombre:").pack(side='left', padx=5)
        self.filtro_nombre = tk.StringVar()
        tk.Entry(frame_filtros, textvariable=self.filtro_nombre, width=20).pack(side='left', padx=5)
        
        # Filtro por Materia
        tk.Label(frame_filtros, text="Filtrar por Materia:").pack(side='left', padx=5)
        self.filtro_materia = tk.StringVar()
        self.combo_materias = ttk.Combobox(frame_filtros, 
                                         textvariable=self.filtro_materia,
                                         width=25)
        self.combo_materias.pack(side='left', padx=5)
        
        # Botón de búsqueda
        btn_buscar = tk.Button(frame_filtros, text="Buscar", command=self.cargar_datos)
        btn_buscar.pack(side='left', padx=5)
        
        # Botón limpiar filtros
        btn_limpiar = tk.Button(frame_filtros, text="Limpiar", command=self.limpiar_filtros)
        btn_limpiar.pack(side='left', padx=5)
        
        # Cargar materias en el combo
        self.cargar_materias()
        
        # Configurar el Treeview
        self.tree = ttk.Treeview(
            self, 
            columns=('DNI', 'Nombre', 'Materia', 'Especialidad', 'Curso', 'Condición', 
                    'id_permiso', 'materia_id', 'curso_original'),
            show='headings'
        )

        # Configurar encabezados visibles
        self.tree.heading('DNI', text='DNI')
        self.tree.heading('Nombre', text='Nombre')
        self.tree.heading('Materia', text='Materia')
        self.tree.heading('Especialidad', text='Especialidad')
        self.tree.heading('Curso', text='Curso')
        self.tree.heading('Condición', text='Condición')

        # Ocultar columnas técnicas
        for col in ['id_permiso', 'materia_id', 'curso_original']:
            self.tree.column(col, width=0, stretch=False)

        # Scrollbar
        scrollbar = ttk.Scrollbar(self, orient="vertical", command=self.tree.yview)
        self.tree.configure(yscrollcommand=scrollbar.set)
        
        # Layout
        self.tree.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")

        # Menú contextual
        self.menu = tk.Menu(self, tearoff=0)
        self.menu.add_command(label="Eliminar", command=self.eliminar_registro)
        self.menu.add_command(label="Modificar", command=self.modificar_registro)
        self.tree.bind("<Button-3>", self.mostrar_menu)       

        self.cargar_datos() 

    def cargar_materias(self):
        cursor = self.conexion.cursor()
        cursor.execute("SELECT DISTINCT nombre FROM materia")
        materias = [row[0] for row in cursor.fetchall()]
        self.combo_materias['values'] = materias

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
            cursor = self.conexion.cursor()
            # Eliminar el detalle_permiso
            cursor.execute('''
                DELETE FROM detalle_permiso
                WHERE id_permiso = %s 
                AND materia = %s 
            ''', (valores[6], valores[7]))

            # Verificar si quedan otros detalles para este permiso
            cursor.execute("SELECT COUNT(*) FROM detalle_permiso WHERE id_permiso = %s", (valores[6],))
            count = cursor.fetchone()[0]

            # Si no hay más detalles, eliminar el permiso
            if count == 0:
                cursor.execute("DELETE FROM permiso WHERE nro = %s", (valores[6],))

            self.conexion.commit()
            self.cargar_datos()
            messagebox.showinfo("Éxito", "Registro eliminado correctamente")
            
        except mysql.connector.Error as err:
            self.conexion.rollback()
            messagebox.showerror("Error", f"No se pudo eliminar: {err}")
    
    def modificar_registro(self):
        selected = self.tree.selection()
        if not selected:
            return
            
        item = self.tree.item(selected[0])
        valores = item['values']
        
        # Ventana de modificación
        edit_win = tk.Toplevel(self)
        edit_win.title("Modificar Registro")
        
        # Variables del formulario
        materia = tk.StringVar(value=f"{valores[7]} - {valores[2]}")  # ID - Nombre
        modalidad = tk.StringVar(value=valores[3])
        curso = tk.StringVar(value=valores[4])
        condicion = tk.StringVar(value=valores[5])

        # Función para actualizar materias según especialidad
        def actualizar_materias_combo(event=None):
            cursor = self.conexion.cursor()
            cursor.execute("SELECT id, nombre FROM materia WHERE modalidad = %s", 
                        (modalidad.get(),))
            materias = [f"{row[0]} - {row[1]}" for row in cursor.fetchall()]
            combo_materia['values'] = materias

        # Campos editables
        ttk.Label(edit_win, text="DNI:").grid(row=0, column=0, padx=5, pady=5)
        ttk.Label(edit_win, text=valores[0]).grid(row=0, column=1, padx=5, pady=5)  # Display DNI as a label
        ttk.Label(edit_win, text="Nombre:").grid(row=1, column=0, padx=5, pady=5)
        ttk.Label(edit_win, text=valores[1]).grid(row=1, column=1, padx=5, pady=5) # Display Nombre as a label
        
        #Especialidad
        ttk.Label(edit_win, text="Especialidad:").grid(row=2, column=0, padx=5, pady=5)
        ttk.Label(edit_win, text=valores[3]).grid(row=2, column=1, padx=5, pady=5) # Display Nombre as a label

        #combo_modalidad = ttk.Combobox(edit_win, textvariable=modalidad, 
        #                           values=["MMO", "TEM", "POLIMODAL"], state='readonly')
        #combo_modalidad.grid(row=2, column=1, padx=5, pady=5)
        #combo_modalidad.bind("<<ComboboxSelected>>", actualizar_materias_combo)
        
        # Materia (dependiente de especialidad)
        ttk.Label(edit_win, text="Materia:").grid(row=3, column=0, padx=5, pady=5)
        combo_materia = ttk.Combobox(edit_win, textvariable=materia)
        combo_materia.grid(row=3, column=1, padx=5, pady=5)
        actualizar_materias_combo()  # Cargar inicialmente
        
        # Curso
        ttk.Label(edit_win, text="Curso:").grid(row=4, column=0, padx=5, pady=5)
        combo_curso = ttk.Combobox(edit_win, textvariable=curso, 
                                values=self.master.generar_cursos())
        combo_curso.grid(row=4, column=1, padx=5, pady=5)
        
        # Condición
        ttk.Label(edit_win, text="Condición:").grid(row=5, column=0, padx=5, pady=5)
        combo_condicion = ttk.Combobox(edit_win, textvariable=condicion, 
                                    values=["LIBRE", "REGULAR"])
        combo_condicion.grid(row=5, column=1, padx=5, pady=5)

        def guardar_cambios():
            try:
                cursor = self.conexion.cursor()
                # Extraer ID de materia
                materia_id = materia.get().split(" - ")[0]
                
                cursor.execute('''
                    UPDATE detalle_permiso 
                    SET condicion = %s, 
                        materia = %s,
                        curso = %s
                    WHERE id_permiso = %s 
                    AND materia = %s 
                ''', (condicion.get(), 
                    materia_id,
                    curso.get(),
                    valores[6],  # id_permiso
                    valores[7])) # materia_id original
                
                self.conexion.commit()               

                self.cargar_datos()
                edit_win.destroy()
                messagebox.showinfo("Éxito", "Registro actualizado correctamente")
                
            except mysql.connector.Error as err:
                self.conexion.rollback()
                messagebox.showerror("Error", f"Error al actualizar: {err}")
        
        ttk.Button(edit_win, text="Guardar Cambios", command=guardar_cambios).grid(row=6, columnspan=2, pady=10)

    def cargar_datos(self):
        try:
            # Construir consulta con filtros
            query = '''
                SELECT 
                    a.dni,
                    a.nombre,
                    m.nombre,
                    m.modalidad,
                    dp.curso,
                    dp.condicion,
                    p.nro,
                    m.id,
                    dp.curso
                FROM alumno a
                JOIN permiso p ON a.dni = p.dni
                JOIN detalle_permiso dp ON p.nro = dp.id_permiso
                JOIN materia m ON dp.materia = m.id
                WHERE 1=1
            '''
            
            params = []
            
            # Aplicar filtros
            if self.filtro_dni.get():
                query += " AND a.dni LIKE %s"
                params.append(f"%{self.filtro_dni.get()}%")
            
            if self.filtro_nombre.get():
                query += " AND a.nombre LIKE %s"
                params.append(f"%{self.filtro_nombre.get().upper()}%")
            
            if self.filtro_materia.get():
                query += " AND m.nombre = %s"
                params.append(self.filtro_materia.get())
            
            query += " ORDER BY a.nombre"
            cursor = self.conexion.cursor()
            cursor.execute(query, params)
            
            # Limpiar tabla existente
            for item in self.tree.get_children():
                self.tree.delete(item)
            
            # Insertar nuevos datos
            for row in cursor.fetchall():
                self.tree.insert('', 'end', values=row)
                
        except mysql.connector.Error as err:
            messagebox.showerror("Error", f"Error al cargar datos:\n{err}")