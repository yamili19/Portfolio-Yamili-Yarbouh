import random
import customtkinter
from tkinter import Text, Toplevel, ttk, messagebox, Tk
from math import *
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import scipy.stats as stats

# Se genera el histograma
def generar_histograma_pruebas(entrada, lista):
    # Obtenemos la cantidad de intervalos ingresada
    bins = int(entrada.get())

    # obtenemos los datos de la tabla
    datos = lista

    # Creamos un histograma con la cantidad de intervalos especificada
    frecuencias, intervalos, _ = plt.hist(datos, bins=bins)

    # Agregamos etiquetas a los ejes y un título
    plt.xlabel('Intervalos')
    plt.ylabel('Frecuencia')
    plt.title('Histograma de números aleatorios')

    # Mostramos los intervalos en el gráfico
    ancho_intervalo = intervalos[1] - intervalos[0]
    etiquetas = [f'{intervalos[i]:.2f} - {intervalos[i + 1]:.2f}' for i in range(len(intervalos) - 1)]
    posiciones = [intervalos[i] + ancho_intervalo / 2 for i in range(len(intervalos) - 1)]
    plt.xticks(posiciones, etiquetas)
    return intervalos, frecuencias, etiquetas, plt


def generar_histograma_pruebasP(entrada, lista, min):
    # Obtenemos la cantidad de intervalos ingresada
    bins = entrada

    # obtenemos los datos de la tabla
    datos = lista

    # Creamos un histograma con la cantidad de intervalos especificada
    frecuencias, intervalos, _ = plt.hist(datos, bins=bins)

    # Agregamos etiquetas a los ejes y un título
    plt.xlabel('Valores')
    plt.ylabel('Frecuencia')
    plt.title('Histograma de números aleatorios')

    # Mostramos los intervalos en el gráfico
    etiquetas = []
    for i in range(entrada):
        etiquetas.append(min)
        min = min + 1

    plt.xticks(etiquetas)
    return frecuencias, etiquetas, plt

#funcion que acumula filas menores a 5
def verificarFrecuenciasEsperada(frecuencias_esp, frecuencias_o, intervalos):
    #Sacamos los limites superior e inferior
    li = []
    ls = []
    for i in range(len(intervalos)-1):
        li.append(intervalos[i])
        ls.append(intervalos[i+1])
    #Mientras haya una frecuencia esperada menor a 5 acumulamos los intervalos
    while np.any(frecuencias_esp < 5):
        idx = np.argmax(frecuencias_esp < 5)
        if idx == len(frecuencias_esp) - 1:
            frecuencias_esp[idx] += frecuencias_esp[idx - 1]
            frecuencias_o[idx] += frecuencias_o[idx - 1]
            frecuencias_esp = np.delete(frecuencias_esp, idx - 1)
            frecuencias_o = np.delete(frecuencias_o, idx - 1)
            del li[idx]
            del ls[idx - 1]
        else:
            frecuencias_esp[idx] += frecuencias_esp[idx + 1]
            frecuencias_o[idx] += frecuencias_o[idx + 1]
            frecuencias_esp = np.delete(frecuencias_esp, idx + 1)
            frecuencias_o = np.delete(frecuencias_o, idx + 1)
            del li[idx + 1]
            del ls[idx]
    
    etiquetas = [f'{li[i]:.2f} - {ls[i]:.2f}' for i in range(len(ls))]
    
    return frecuencias_esp, frecuencias_o, etiquetas

# Verificamos las frecuencias esperadas para la distribucion poisson
def verificarFrecuenciasEsperadaPoisson(frecuencias_esp, frecuencias_o, etiquetas):
    #Mientras haya una frecuencia esperada menor a 5 
    while np.any(frecuencias_esp < 5):
        idx = np.argmax(frecuencias_esp < 5)
        if idx == len(frecuencias_esp) - 1:
            frecuencias_esp[idx] += frecuencias_esp[idx - 1]
            frecuencias_o[idx] += frecuencias_o[idx - 1]
            frecuencias_esp = np.delete(frecuencias_esp, idx - 1)
            frecuencias_o = np.delete(frecuencias_o, idx - 1)
            etiquetas[idx] = (str(etiquetas[idx - 1]) + ';' + str(etiquetas[idx]))
            del etiquetas[idx - 1]
        else:
            frecuencias_esp[idx] += frecuencias_esp[idx + 1]
            frecuencias_o[idx] += frecuencias_o[idx + 1]
            frecuencias_esp = np.delete(frecuencias_esp, idx + 1)
            frecuencias_o = np.delete(frecuencias_o, idx + 1)
            etiquetas[idx] = (str(etiquetas[idx]) + ';' + str(etiquetas[idx + 1]))
            del etiquetas[idx + 1]
    return frecuencias_esp, frecuencias_o, etiquetas

def generarVentanaFrecuencias(dfTabla,titulos):
            # Creamos una ventana para mostrar la tabla
            ventana_tabla = Toplevel()
            ventana_tabla.title('Tabla de intervalos y frecuencias')
            # ventana_tabla.geometry(f"{1100}x{580}")

            # Creamos un widget de texto para mostrar la tabla
            #tabla_texto = Text(ventana_tabla)
            #tabla_texto.pack()

            # Creamos un widget de texto para mostrar la tabla
            tabla_frame = customtkinter.CTkScrollableFrame(master=ventana_tabla, corner_radius=10, width=600)
            # tabla_frame.grid_columnconfigure((0,1,2),weight=1)
            # tabla_frame.grid_rowconfigure((0),weight=1)
            tabla_frame.pack(padx=10, pady=10, fill='both')
            # tabla_texto = Text(tabla_frame, bg="#dbdbdb", borderwidth=0)
            # tabla_texto.pack(pady=10, padx=10)

            # configure grid layout (4x4)
            

            # Insertamos la tabla en el widget de texto
            # tabla_texto.insert('end', dfTabla.to_string(index=False, justify='center'))
            txt_tit1 = Text(tabla_frame, height=1, width=20, foreground="black",bg="#dbdbdb",borderwidth=0, font=("Genera Book", "12", "bold"))
            txt_tit1.grid(row=1,column=0)
            txt_tit1.insert('end',titulos[0])
            txt_tit2 = Text(tabla_frame, height=1, width=20, foreground="black",bg="#dbdbdb",borderwidth=0, font=("Genera Book", "12", "bold"))
            txt_tit2.grid(row=1,column=1)
            txt_tit2.insert('end',titulos[1])
            txt_tit3 = Text(tabla_frame, height=1, width=20, foreground="black",bg="#dbdbdb",borderwidth=0, font=("Genera Book", "12", "bold"))
            txt_tit3.grid(row=1,column=2)
            txt_tit3.insert('end',titulos[2])
            i=2
            for x in range(len(dfTabla)): #itera sobre las filas
                ttt = Text(tabla_frame, height=1, width=20, foreground="black",bg="#dbdbdb",borderwidth=0, font=("Genera Book", "12"))
                ttt.grid(row = i,column=0,)
                ttt.insert('end', str(dfTabla.iloc[x,0]))
                ttt = Text(tabla_frame, height=1, width=20, foreground="black",bg="#dbdbdb",borderwidth=0, font=("Genera Book", "12"))
                ttt.grid(row = i,column=1,)
                ttt.insert('end', str(dfTabla.iloc[x,1]))
                ttt = Text(tabla_frame, height=1, width=20, foreground="black",bg="#dbdbdb",borderwidth=0, font=("Genera Book", "12"))
                ttt.grid(row = i,column=2,)
                ttt.insert('end',str(dfTabla.iloc[x,2]))
                i+=1

def generarVentanaFrecuenciasChi(dfTabla,titulos,gradosLibertad, valorCritico,sumatoria):
            # Creamos una ventana para mostrar la tabla
            ventana_tabla = Toplevel()
            ventana_tabla.title('Tabla de intervalos y frecuencias')

            # Creamos un widget de texto para mostrar la tabla
            #tabla_texto = Text(ventana_tabla)
            #tabla_texto.pack()

            # Creamos un widget de texto para mostrar la tabla
            tabla_frame = customtkinter.CTkScrollableFrame(master=ventana_tabla, corner_radius=10, width=900)
            tabla_frame.pack(pady=10, padx=10, fill='both')
            
            conclusion1_frame = customtkinter.CTkFrame(master=ventana_tabla, corner_radius=10)
            conclusion1_frame.pack(pady=10, padx=10, anchor='w')
            conclusion2_frame = customtkinter.CTkFrame(master=ventana_tabla, corner_radius=10)
            conclusion2_frame.pack(pady=10, padx=10, anchor='w')
            conclusion3_frame = customtkinter.CTkFrame(master=ventana_tabla, corner_radius=10)
            conclusion3_frame.pack(pady=10, padx=10, anchor='w')
            # tabla_texto = Text(tabla_frame, bg="#dbdbdb", borderwidth=0)
            # tabla_texto.pack(pady=10, padx=10)

            

            # Insertamos la tabla en el widget de texto
            # tabla_texto.insert('end', dfTabla.to_string(index=False, justify='center'))
            txt_tit1 = Text(tabla_frame, height=1, width=20, foreground="black",bg="#dbdbdb",borderwidth=0, font=("Genera Book", "12", "bold"))
            txt_tit1.grid(row=1,column=0)
            txt_tit1.insert('end',titulos[0])
            txt_tit2 = Text(tabla_frame, height=1, width=20, foreground="black",bg="#dbdbdb",borderwidth=0, font=("Genera Book", "12", "bold"))
            txt_tit2.grid(row=1,column=1)
            txt_tit2.insert('end',titulos[1])
            txt_tit3 = Text(tabla_frame, height=1, width=20, foreground="black",bg="#dbdbdb",borderwidth=0, font=("Genera Book", "12", "bold"))
            txt_tit3.grid(row=1,column=2)
            txt_tit3.insert('end',titulos[2])
            txt_tit4 = Text(tabla_frame, height=1, width=20, foreground="black",bg="#dbdbdb",borderwidth=0, font=("Genera Book", "12", "bold"))
            txt_tit4.grid(row=1,column=3)
            txt_tit4.insert('end',titulos[3])
            txt_tit5 = Text(tabla_frame, height=1, width=20, foreground="black",bg="#dbdbdb",borderwidth=0, font=("Genera Book", "12", "bold"))
            txt_tit5.grid(row=1,column=4)
            txt_tit5.insert('end',titulos[4])
            i=2
            for x in range(len(dfTabla)): #itera sobre las filas
                ttt = Text(tabla_frame, height=1, width=20, foreground="black",bg="#dbdbdb",borderwidth=0, font=("Genera Book", "12"))
                ttt.grid(row = i,column=0,)
                ttt.insert('end', str(dfTabla.iloc[x,0]))
                ttt = Text(tabla_frame, height=1, width=20, foreground="black",bg="#dbdbdb",borderwidth=0, font=("Genera Book", "12"))
                ttt.grid(row = i,column=1,)
                ttt.insert('end', str(dfTabla.iloc[x,1]))
                ttt = Text(tabla_frame, height=1, width=20, foreground="black",bg="#dbdbdb",borderwidth=0, font=("Genera Book", "12"))
                ttt.grid(row = i,column=2,)
                ttt.insert('end',str(dfTabla.iloc[x,2]))
                ttt = Text(tabla_frame, height=1, width=20, foreground="black",bg="#dbdbdb",borderwidth=0, font=("Genera Book", "12"))
                ttt.grid(row = i,column=3,)
                ttt.insert('end',str(dfTabla.iloc[x,3]))
                ttt = Text(tabla_frame, height=1, width=20, foreground="black",bg="#dbdbdb",borderwidth=0, font=("Genera Book", "12"))
                ttt.grid(row = i,column=4,)
                ttt.insert('end',str(dfTabla.iloc[x,4]))
                i+=1
                
            # Sacamos una conclusion en base al valor que nos da chi y el valor critico
            txt_c1 = customtkinter.CTkLabel(master=conclusion1_frame, text='Valor crítico con un alfa de 0.05 y grado de libertad de '+ 
                                            str(gradosLibertad) + ': ' +str(valorCritico))
            txt_c1.pack(pady=5,padx=10)

            txt_c2 = customtkinter.CTkLabel(master=conclusion2_frame, text='Valor de chi calculado: ' + str(sumatoria))
            txt_c2.pack(pady=5,padx=10)
            if valorCritico >= sumatoria:
                txt_c3 = customtkinter.CTkLabel(master=conclusion3_frame, text='Como el chi calculado es menor que el tabulado NO se rechaza la hipotesis')
                txt_c3.pack(pady=5,padx=10)
            else:
                txt_c3 = customtkinter.CTkLabel(master=conclusion3_frame, text='Como el chi calculado es mayor que el tabulado se rechaza la hipotesis')
                txt_c3.pack(pady=5,padx=10)

def calcularChi(frecuencias_esp, frecuencias_o, interv):
    # Calculamos chi cuadrado
    sumatoria = 0
    tabla_data = []
    chi = 0
    for i in range(len(frecuencias_esp)):
        chi = (frecuencias_o[i] - frecuencias_esp[i]) ** 2 / frecuencias_esp[i]
        sumatoria += chi
        # Create a dictionary for the current row in the table
        row_dict = {'Intervalos': interv[i], 'FO': frecuencias_o[i], 'FE': frecuencias_esp[i],
                    'χ2': chi, '∑': sumatoria}
        # Append the dictionary to the list
        tabla_data.append(row_dict)
    tablaChi = pd.DataFrame(tabla_data)
    return tablaChi, sumatoria

class GeneradorAleatorioApp:
    def __init__(self, master):
        self.master = master
        master.title("Generador de números aleatorios")
        customtkinter.set_appearance_mode("Light")
        customtkinter.set_default_color_theme("green")

        # Crear contenedor para distribución
        self.distribucion_frame = customtkinter.CTkFrame(master=master)
        self.distribucion_frame.grid(row=0, column=0, padx=10, pady=10, sticky="nw")
        self.distribucion_lbl = customtkinter.CTkLabel(master=self.distribucion_frame, text="Distribución")
        self.distribucion_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="sw")

        # Crear contenedor para cantidad de números
        self.cantidad_frame = customtkinter.CTkFrame(master=master)
        self.cantidad_frame.grid(row=1, column=0, padx=10, pady=10, sticky="nw")
        self.cantidad_lbl = customtkinter.CTkLabel(master=self.cantidad_frame, text="Cantidad de números")
        self.cantidad_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="sw")

        # Crear contenedor para parámetros de distribución uniforme
        self.uniforme_frame = customtkinter.CTkFrame(master=master)
        self.uniforme_frame.grid(row=2, column=0, padx=10, pady=10, sticky="nw")
        self.uniforme_lbl = customtkinter.CTkLabel(master=self.uniforme_frame,
                                                   text="Parámetros de distribución uniforme")
        self.uniforme_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="w")
        self.uniforme_frame.grid_remove()

        # Crear contenedor para parámetros de distribución normal
        self.normal_frame = customtkinter.CTkFrame(master=master)
        self.normal_frame.grid(row=2, column=0, padx=10, pady=10, sticky="nw")
        self.normal_lbl = customtkinter.CTkLabel(master=self.normal_frame, text="Parámetros de distribución normal")
        self.normal_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="w")
        self.normal_frame.grid_remove()

        # Crear contenedor para parametros de distribucion exponencial
        self.exponencial_frame = customtkinter.CTkFrame(master=master)
        self.exponencial_frame.grid(row=2, column=0, padx=10, pady=10, sticky="nw")
        self.exponencial_lbl = customtkinter.CTkLabel(master=self.exponencial_frame,
                                                      text="Parámetros de distribución exponencial")
        self.exponencial_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="w")

        # Crear contenedor para parametros de distribucion Poisson
        self.poisson_frame = customtkinter.CTkFrame(master=master)
        self.poisson_frame.grid(row=2, column=0, padx=10, pady=10, sticky="nw")
        self.poisson_lbl = customtkinter.CTkLabel(master=self.poisson_frame, text="Parámetros de distribución poisson")
        self.poisson_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="w")

        # Opciones de distribución
        self.distribucion_var = customtkinter.StringVar()
        self.distribucion_var.set("")

        self.uniforme_radio = customtkinter.CTkRadioButton(self.distribucion_frame, text="Uniforme",
                                                           variable=self.distribucion_var,
                                                           value="uniforme", command=self.show_uniforme)
        self.uniforme_radio.grid(row=1, column=0, padx=5, pady=5, sticky="w")

        self.normal_radio = customtkinter.CTkRadioButton(self.distribucion_frame, text="Normal",
                                                         variable=self.distribucion_var,
                                                         value="normal", command=self.show_normal)
        self.normal_radio.grid(row=1, column=1, padx=5, pady=5, sticky="w")
        self.exponencial_radio = customtkinter.CTkRadioButton(self.distribucion_frame, text="Exponencial",
                                                              variable=self.distribucion_var,
                                                              value="exponencial", command=self.show_exponencial)
        self.exponencial_radio.grid(row=1, column=2, padx=5, pady=5, sticky="w")
        self.poisson_radio = customtkinter.CTkRadioButton(self.distribucion_frame, text="Poisson",
                                                          variable=self.distribucion_var,
                                                          value="poisson", command=self.show_poisson)
        self.poisson_radio.grid(row=1, column=3, padx=5, pady=5, sticky="w")

        # Si hay alguna distribucion seleccionada se deselecciona
        self.uniforme_frame.grid_remove()
        self.normal_frame.grid_remove()
        self.exponencial_frame.grid_remove()
        self.poisson_frame.grid_remove()

        # Cantidad de números
        self.cantidad_numeros_var = customtkinter.StringVar()
        self.cantidad_numeros_var.set("50000")

        self.cantidad_numeros_entry = customtkinter.CTkEntry(self.cantidad_frame,
                                                             textvariable=self.cantidad_numeros_var)
        self.cantidad_numeros_entry.grid(row=2, column=0, padx=5, pady=5)

        # Parámetros de distribución uniforme
        self.a_var = customtkinter.StringVar()
        self.a_var.set("0")

        self.a_label = customtkinter.CTkLabel(self.uniforme_frame, text="Valor mínimo:")
        self.a_label.grid(row=1, column=0, padx=5, pady=5, sticky="e")

        self.a_entry = customtkinter.CTkEntry(self.uniforme_frame, textvariable=self.a_var)
        self.a_entry.grid(row=1, column=1, padx=5, pady=5)

        self.b_var = customtkinter.StringVar()
        self.b_var.set("10")

        self.b_label = customtkinter.CTkLabel(self.uniforme_frame, text="Valor máximo:")
        self.b_label.grid(row=2, column=0, padx=5, pady=5, sticky="e")

        self.b_entry = customtkinter.CTkEntry(self.uniforme_frame, textvariable=self.b_var)
        self.b_entry.grid(row=2, column=1, padx=5, pady=5)

        self.inte_var = customtkinter.StringVar()
        self.inte_var.set("50")

        self.inte_label = customtkinter.CTkLabel(self.uniforme_frame, text="Cantidad intérvalos:")
        self.inte_label.grid(row=3, column=0, padx=5, pady=5, sticky="e")

        self.inte_entry = customtkinter.CTkEntry(self.uniforme_frame, textvariable=self.inte_var)
        self.inte_entry.grid(row=3, column=1, padx=5, pady=5)

        # Parámetros de distribución normal
        self.mu_var = customtkinter.StringVar()
        self.mu_var.set("0")

        self.mu_label = customtkinter.CTkLabel(self.normal_frame, text="Media:")
        self.mu_label.grid(row=1, column=0, padx=5, pady=5, sticky="e")

        self.mu_entry = customtkinter.CTkEntry(self.normal_frame, textvariable=self.mu_var)
        self.mu_entry.grid(row=1, column=1, padx=5, pady=5)

        self.sigma_var = customtkinter.StringVar()
        self.sigma_var.set("1")

        self.sigma_label = customtkinter.CTkLabel(self.normal_frame, text="Desviación estándar:")
        self.sigma_label.grid(row=2, column=0, padx=5, pady=5, sticky="e")

        self.sigma_entry = customtkinter.CTkEntry(self.normal_frame, textvariable=self.sigma_var)
        self.sigma_entry.grid(row=2, column=1, padx=5, pady=5)

        self.int_var = customtkinter.StringVar()
        self.int_var.set("5")

        self.int_label = customtkinter.CTkLabel(self.normal_frame, text="Cantidad intérvalos:")
        self.int_label.grid(row=3, column=0, padx=5, pady=5, sticky="e")

        self.int_entry = customtkinter.CTkEntry(self.normal_frame, textvariable=self.int_var)
        self.int_entry.grid(row=3, column=1, padx=5, pady=5)

        # parametros de distribucion exponencial
        self.lamb_var = customtkinter.StringVar()
        self.lamb_var.set("0.1")
        self.lamb_label = customtkinter.CTkLabel(self.exponencial_frame, text="Lambda:")
        self.lamb_label.grid(row=1, column=0, padx=5, pady=5, sticky="e")
        self.lamb_entry = customtkinter.CTkEntry(self.exponencial_frame, textvariable=self.lamb_var)
        self.lamb_entry.grid(row=1, column=1, padx=5, pady=5)
        self.in_var = customtkinter.StringVar()
        self.in_var.set("5")

        self.in_label = customtkinter.CTkLabel(self.exponencial_frame, text="Cantidad intérvalos:")
        self.in_label.grid(row=2, column=0, padx=5, pady=5, sticky="e")

        self.in_entry = customtkinter.CTkEntry(self.exponencial_frame, textvariable=self.in_var)
        self.in_entry.grid(row=2, column=1, padx=5, pady=5)

        # parametros de distribucion poisson
        self.l_var = customtkinter.StringVar()
        self.l_var.set("1")
        self.l_label = customtkinter.CTkLabel(self.poisson_frame, text="Media:")
        self.l_label.grid(row=1, column=0, padx=5, pady=5, sticky="e")
        self.l_entry = customtkinter.CTkEntry(self.poisson_frame, textvariable=self.l_var)
        self.l_entry.grid(row=1, column=1, padx=5, pady=5)

        # Botón de generación de números aleatorios
        self.generar_button = customtkinter.CTkButton(master, text="Generar números", command=self.generar_numeros)
        self.generar_button.grid(row=4, column=0, padx=10, pady=10)

        # Tabla de números aleatorios generados
        self.table_frame = customtkinter.CTkFrame(master=master)
        self.table_frame.grid(row=0, column=1, rowspan=4, padx=10, pady=10, sticky="ne")
        self.table_lbl = customtkinter.CTkLabel(master=self.table_frame, text="Números aleatorios generados")
        self.table_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="sw")
        self.table = ttk.Treeview(self.table_frame, columns=("Random","numero"))
        self.table.heading("#0", text="Índice")
        self.table.heading("Random", text="Random")
        self.table.heading("numero", text="Número")
        self.table.column("#0", width=50)
        self.table.column("numero", width=100)
        self.table.column("Random", width=250)
        self.table.grid(row=1, column=0, padx=5, pady=5, sticky="nsew")

    # Aca decimos decimos que hacemos cuando seleccionamos alguna de las distribuciones que tenemos como opciones
    def show_uniforme(self):
        self.uniforme_frame.grid()
        self.normal_frame.grid_remove()
        self.exponencial_frame.grid_remove()
        self.poisson_frame.grid_remove()

    def show_normal(self):
        self.normal_frame.grid()
        self.uniforme_frame.grid_remove()
        self.exponencial_frame.grid_remove()
        self.poisson_frame.grid_remove()

    def show_exponencial(self):
        self.exponencial_frame.grid()
        self.normal_frame.grid_remove()
        self.uniforme_frame.grid_remove()
        self.poisson_frame.grid_remove()

    def show_poisson(self):
        self.poisson_frame.grid()
        self.exponencial_frame.grid_remove()
        self.normal_frame.grid_remove()
        self.uniforme_frame.grid_remove()

    

    # Generamos los numeros aleatorios
    def generar_numeros(self):
        # Limpiar tabla de números anteriores
        for child in self.table.get_children():
            self.table.delete(child)
        sumatoria = 0
        chi = 0
        frec_esp = []
        tabla_data = []
        alfa = 0.05
        # Obtener parámetros de distribución y cantidad de números
        distribucion = self.distribucion_var.get()
        cantidad_numeros = int(self.cantidad_numeros_var.get())
        lista = []
        # Generar números aleatorios
        if distribucion == "uniforme":
            gradosLibertad = int(self.inte_var.get()) - 1
            a = float(self.a_var.get())
            b = float(self.b_var.get())
            for i in range(cantidad_numeros):
                rnd = random.random()
                numero = a + rnd * (b - a)
                lista.append(numero)
                self.table.insert("", "end", text=i + 1, values=(rnd, numero,)) #insertamos a la tabla los datos
            intervalos, frecuencias, etiquetas, plt = generar_histograma_pruebas(self.inte_var, lista)

            #Calculamos la frecuencia esperada
            frec = len(lista) / int(self.inte_var.get())
            # Creamos un DataFrame con los intervalos y las frecuencias
            tabla = pd.DataFrame({'Intervalos': etiquetas, 'Fo': frecuencias,
                                  'Fe': frec})
            titulos = ["Intervalos","FO","FE"]

            # Insertamos la tabla en el widget de texto
            generarVentanaFrecuencias(tabla,titulos)

            #Creamos el vector con las frecuencias esperadas
            frec_esp = [frec] * int(self.inte_var.get())
            # Pasamos los vectores a formato array solamente para trabajarlo con librerias de numpy
            frecuencias_esp = np.array(frec_esp)
            frecuencias_o = np.array(frecuencias)

            # Llamamos a la funcion para verificar la frecuencia esperada
            frecuencias_esperadas, frecuencias_observadas, interv = verificarFrecuenciasEsperada(frecuencias_esp,
                                                                                          frecuencias_o, intervalos)
            #Pasamos los arrays a formato de lista
            frecuencias_esp = frecuencias_esperadas.tolist()
            frecuencias_o = frecuencias_observadas.tolist()

            # Calculamos chi cuadrado
            tablaChi, sumatoria = calcularChi(frecuencias_esp, frecuencias_o, interv)
            
            titulos = ["Intervalos", "FO", "FE", "χ2","∑"]

            # Sacamos los grados de libertad
            gradosLibertad = len(interv) - 1

            # Sacamos el valor critico
            valorCritico = stats.chi2.ppf(1 - alfa, gradosLibertad)

            generarVentanaFrecuenciasChi(tablaChi,titulos,gradosLibertad,valorCritico,sumatoria)

            # Mostramos el histograma
            plt.show()

        elif distribucion == "normal":
            mu = float(self.mu_var.get())
            sigma = float(self.sigma_var.get())
            c = 0 #contador para que no genere numeros de mas
            for i in range(cantidad_numeros):
                rand1 = random.random()
                rand2 = random.random()
                numero1 = ((-2 * log(rand1)) ** (1/2) * cos(2 * pi * rand2)) * sigma + mu
                numero2 = ((-2 * log(rand1)) ** (1/2) * sin(2 * pi * rand2)) * sigma + mu
                lista.append(numero1)
                self.table.insert("", "end", text=c + 1, values=(str(rand1)+' - '+str(rand2), numero1, ))
                c += 1
                if c == cantidad_numeros:
                    break
                lista.append(numero2)
                self.table.insert("", "end", text=c + 1, values=(str(rand1)+' - '+str(rand2), numero2, ))
                c += 1
                if c == cantidad_numeros:
                    break
            intervalos, frecuencias, etiquetas, plt = generar_histograma_pruebas(self.int_var, lista)

            # Calculamos las frecuencias esperadas
            for i in range(int(int(self.int_var.get()))):
                marca_clase = (intervalos[i + 1] + intervalos[i]) / 2
                prob = (1 / ((2 * np.pi) ** (1/2) * sigma)) * np.exp(-0.5 * ((marca_clase - mu) ** 2) / (sigma ** 2)) * (intervalos[i + 1] - intervalos[i])
                # Calcula la frecuencia esperada en el intervalo
                fe = len(lista) * prob
                frec_esp.append(fe)

            # Creamos un DataFrame con los intervalos y las frecuencias tanto esperadas como observadas
            tabla = pd.DataFrame({'Intervalos': etiquetas, 'Fo': frecuencias,
                                  'Fe': frec_esp})
            titulos = ["Intervalos","FO","FE"]

            # Insertamos la tabla en el widget de texto
            generarVentanaFrecuencias(tabla,titulos)

             # Pasamos los vectores a formato array
            frecuencias_esp = np.array(frec_esp)
            frecuencias_o = np.array(frecuencias)

            # Llamamos a la funcion para verificar la frecuencia esperada
            frecuencias_esperadas, frecuencias_observadas, interv = verificarFrecuenciasEsperada(frecuencias_esp,
                                                                                          frecuencias_o, intervalos)
            
            #Pasamos los array a formato de lista
            frecuencias_esp = frecuencias_esperadas.tolist()
            frecuencias_o = frecuencias_observadas.tolist()
            
            # Calculamos chi cuadrado
            tablaChi, sumatoria = calcularChi(frecuencias_esp, frecuencias_o, interv)
            
            # Sacamos los grados de libertad
            gradosLibertad = len(interv) - 3

            titulos = ["Intervalos", "FO", "FE", "χ2","∑"]

            #verificamos que los grados de libertad sean positivos
            if gradosLibertad <= 0:
                messagebox.showerror("Rango Exedido", "La prueba de bondad no se puede calcular porque los grados de libertad son 0 o negativo.")
            else:

                # Sacamos el valor critico
                valorCritico = stats.chi2.ppf(1 - alfa, gradosLibertad)

                generarVentanaFrecuenciasChi(tablaChi,titulos,gradosLibertad,valorCritico,sumatoria)

            plt.show() # Mostrar el histograma

        elif distribucion == "exponencial":
            lamb = float(self.lamb_var.get())
            for i in range(cantidad_numeros):
                rnd = random.random()
                numero = (-1 / lamb) * log(1 - rnd)
                lista.append(numero)
                self.table.insert("", "end", text=i + 1, values=(rnd, numero,))
            intervalos, frecuencias, etiquetas, plt = generar_histograma_pruebas(self.in_var, lista)

            # Calculamos las frecuencias esperadas
            for i in range(int(int(self.in_var.get()))):
                # Calcula la probabilidad acumulada en los límites del intervalo
                prob_inf = (1 - exp(-lamb * intervalos[i]))
                prob_sup = (1 - exp(-lamb * intervalos[i + 1]))

                # Calcula la frecuencia esperada en el intervalo
                fe = len(lista) * (prob_sup - prob_inf)
                frec_esp.append(fe)

            # Creamos un DataFrame con los intervalos y las frecuencias tanto esperadas como observadas
            tabla = pd.DataFrame({'Intervalos': etiquetas, 'Fo': frecuencias,
                                  'Fe': frec_esp})
            titulos = ["Intervalos","FO","FE"]

            # Insertamos la tabla en el widget de texto
            generarVentanaFrecuencias(tabla,titulos)

            # Pasamos los vectores a formato array
            frecuencias_esp = np.array(frec_esp)
            frecuencias_o = np.array(frecuencias)

            # Llamamos a la funcion para verificar la frecuencia esperada
            frecuencias_esperadas, frecuencias_observadas, interv = verificarFrecuenciasEsperada(frecuencias_esp,
                                                                                          frecuencias_o, intervalos)
            
            #Pasamos los arrays a formato de lista
            frecuencias_esp = frecuencias_esperadas.tolist()
            frecuencias_o = frecuencias_observadas.tolist()
            
            # Calculamos chi cuadrado
            tablaChi, sumatoria = calcularChi(frecuencias_esp, frecuencias_o, interv)
            
            # Sacamos los grados de libertad
            gradosLibertad = len(interv) - 2

            titulos = ["Intervalos", "FO", "FE", "χ2","∑"]

            #verificamos que los grados de libertad sean positivos
            if gradosLibertad <= 0:
                messagebox.showerror("Rango Exedido", "La prueba de bondad no se puede calcular porque los grados de libertad son 0 o negativo.")
            else:

                # Sacamos el valor critico
                valorCritico = stats.chi2.ppf(1 - alfa, gradosLibertad)
                
                generarVentanaFrecuenciasChi(tablaChi,titulos,gradosLibertad,valorCritico,sumatoria)

            # Mostramos el histograma
            plt.show()
        elif distribucion == "poisson":

            media = float(self.l_var.get())
            
            #Verificamos que la media no supere el rango
            if media > 100 or int(cantidad_numeros) <= 1:
                
                # Mostrar un mensaje emergente
                messagebox.showerror("Rango Exedido", "El valor de la media no puede superar el valor de 100 y la Cantidad de Datos debe ser mayor a 1.")
            
            else:

                for i in range(cantidad_numeros):
                    x = -1
                    a = exp(-media)
                    p = 1

                    while a <= p:
                        u = random.random()
                        p = p * u
                        x = x + 1
                    numero = x
                    lista.append(numero)
                    self.table.insert("", "end", text=i + 1, values=(u,numero,))
                maximo = max(lista)
                minimo = min(lista)
                inter = maximo - minimo
                frecuencias, etiquetas, plt = generar_histograma_pruebasP(inter, lista, minimo)

                # Calculamos las frecuencias esperadas
                for i in range(inter):
                    # Calcula la probabilidad acumulada en los límites del intervalo
                    # media = lambda
                    prob = ((exp(-media)) * (media ** minimo)) / (factorial(minimo))
                    minimo += 1 

                    # Calcula la frecuencia esperada en el intervalo
                    fe = len(lista) * prob
                    frec_esp.append(trunc(fe))
                lista.clear()

                # Creamos un DataFrame con los intervalos y las frecuencias tanto esperadas como observadas
                tabla = pd.DataFrame({'Valores': etiquetas, 'Fo': frecuencias,
                                    'Fe': frec_esp})

                titulos = ["Valores","FO","FE"]

                # Insertamos la tabla en el widget de texto
                generarVentanaFrecuencias(tabla,titulos)

                # Pasamos los vectores a formato array
                frecuencias_esp = np.array(frec_esp)
                frecuencias_o = np.array(frecuencias)

                # Llamamos a la funcion para verificar la frecuencia esperada
                frecuencias_esp, frecuencias_o, valores = verificarFrecuenciasEsperadaPoisson(frecuencias_esp,
                                                                                            frecuencias_o, etiquetas)
                #Pasamos los array a formato de lista
                frecuencias_esp = frecuencias_esp.tolist()
                frecuencias_o = frecuencias_o.tolist()
                
                # Calculamos chi cuadrado
                tablaChi, sumatoria = calcularChi(frecuencias_esp, frecuencias_o, valores)

                # Sacamos los grados de libertad
                gradosLibertad = len(valores) - 2
                
                # Sacamos el valor critico
                valorCritico = stats.chi2.ppf(1 - alfa, gradosLibertad)
                
                titulos = ["Valores", "FO", "FE", "χ2","∑"]

                #verificamos que los grados de libertad sean positivos
                if gradosLibertad <= 0:
                    messagebox.showerror("Rango Exedido", "La prueba de bondad no se puede calcular porque los grados de libertad son 0 o negativo.")
                else:

                    # Sacamos el valor critico
                    valorCritico = stats.chi2.ppf(1 - alfa, gradosLibertad)
                    
                    generarVentanaFrecuenciasChi(tablaChi,titulos,gradosLibertad,valorCritico,sumatoria)

                # Mostrar histograma
                plt.show()

if __name__ == "__main__":
    root = customtkinter.CTk()
    app = GeneradorAleatorioApp(root)
    root.mainloop()