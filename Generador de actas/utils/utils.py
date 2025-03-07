import sys
import os
from tkinter import ttk  # Para usar Combobox
import os
from docx.shared import Pt
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from docx.shared import Pt

def obtener_ruta_recurso(relativa):
    if getattr(sys, 'frozen', False):
        base_path = sys._MEIPASS
    else:
        base_path = os.path.abspath(".")
    return os.path.join(base_path, relativa)

def aplicar_estilo_encabezado(paragraph, texto, texto1, fuente="Calibri", tamaño=11, negrita=False):
    """
    Aplica el estilo Calibri de tamaño 11 solo a los encabezados, sin alterar el formato.
    """
    # Reemplazamos el texto sin cambiar el formato
    for run in paragraph.runs:
        if texto in run.text:  # Buscar el texto a reemplazar
            run.text = run.text.replace(run.text, texto1)
            run.font.name = fuente
            run.font.size = Pt(tamaño)
            run.font.bold = negrita

def aplicar_estilo_personalizado_celda(celda, texto, fuente="Arial", tamaño=11, negrita=False):
    """
    Escribe texto en un párrafo dentro de una celda con estilo personalizado.
    """
    # Aseguramos que estamos trabajando con un párrafo en la celda
    p = celda.paragraphs[0]  # Primer párrafo en la celda
    p.clear()  # Limpiar el contenido previo
    run = p.add_run(texto)  # Agregar texto al párrafo
    run.font.name = fuente  # Tipo de letra
    run.font.size = Pt(tamaño)  # Tamaño de letra
    run.bold = negrita  # Negrita

    # Configuración explícita para garantizar el tipo de letra
    rPr = run._element.get_or_add_rPr()
    rFonts = OxmlElement('w:rFonts')
    rFonts.set(qn('w:ascii'), fuente)
    rFonts.set(qn('w:hAnsi'), fuente)
    rFonts.set(qn('w:eastAsia'), fuente)
    rFonts.set(qn('w:cs'), fuente)
    rPr.append(rFonts)

def filtrar_materias(combo_materia, lista_materias):
    entrada = combo_materia.get().lower()
    filtradas = [m for m in lista_materias if entrada in m.lower()]
    combo_materia['values'] = filtradas if filtradas else lista_materias
    if entrada == "":
        combo_materia.set("")
