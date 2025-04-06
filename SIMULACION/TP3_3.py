import copy
import random
import customtkinter
import tkinter as tk
from tkinter import ttk
from decimal import Decimal


class vectDatos:
    def __init__(self, semana, rnd1, pedido, rnd2, consumo, cantAlmacenada,
                 cantSobrepasada, costoPedir, costoAlmacenamiento, costoSobrePasar, consumoAcum, consumoProm, cantSinAlmacenar, probSinAlmacenamiento, gastos, gastosAcum, gastosProm, maxCantSobrepasada, maxGasto):
        self.semana = semana
        self.rnd1 = rnd1
        self.pedido = pedido
        self.rnd2 = rnd2
        self.consumo = consumo
        self.cantAlmacenada = cantAlmacenada
        self.cantSobrepasada = cantSobrepasada
        self.costoPedir = costoPedir
        self.costoAlmacenamiento = costoAlmacenamiento
        self.costoSobrePasar = costoSobrePasar
        self.consumoAcum = consumoAcum
        self.consumoProm = consumoProm
        self.cantSinAlmacenar = cantSinAlmacenar
        self.probSinAlmacenamiento = probSinAlmacenamiento
        self.gastos = gastos
        self.gastosAcum = gastosAcum
        self.gastosProm = gastosProm
        self.maxCantSobrepasada = maxCantSobrepasada
        #metricas adicionales
        self.maxGasto = maxGasto

class MontercarlooApp:
    def __init__(self, master):
        self.master = master
        master.title("MontecarloSimulador")
        customtkinter.set_appearance_mode("Light")
        customtkinter.set_default_color_theme("green")
        #Creamos los contenedores para los parametros
        self.cantidad_frame = customtkinter.CTkFrame(master=master)
        self.cantidad_frame.grid(row=1, column=0, padx=10, pady=10, sticky="nw")
        self.cantidad_lbl = customtkinter.CTkLabel(master=self.cantidad_frame, text="Cantidad de ""\nsimulaciones")
        self.cantidad_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="s")

        self.cantidad_numeros_var = customtkinter.StringVar()
        self.cantidad_numeros_var.set("50000")

        self.cantidad_numeros_entry = customtkinter.CTkEntry(self.cantidad_frame,
                                                             textvariable=self.cantidad_numeros_var)
        self.cantidad_numeros_entry.grid(row=1, column=0, padx=5, pady=5)

        self.ver_desde_frame = customtkinter.CTkFrame(master=master)
        self.ver_desde_frame.grid(row=2, column=0, padx=10, pady=10, sticky="nw")
        self.ver_desde_lbl = customtkinter.CTkLabel(master=self.ver_desde_frame, text="Ver desde")
        self.ver_desde_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="s")

        self.ver_desde_var = customtkinter.StringVar()
        self.ver_desde_var.set("5000")
        self.ver_desde_entry = customtkinter.CTkEntry(self.ver_desde_frame, textvariable=self.ver_desde_var)
        self.ver_desde_entry.grid(row=1, column=0, padx=5, pady=5)

        self.cost_pedir_frame = customtkinter.CTkFrame(master=master)
        self.cost_pedir_frame.grid(row=3, column=0, padx=10, pady=10, sticky="nw")
        self.cost_pedir_lbl = customtkinter.CTkLabel(master=self.cost_pedir_frame, text="Costo de pedir")
        self.cost_pedir_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="s")

        self.cost_pedir_var = customtkinter.StringVar()
        self.cost_pedir_var.set("25500")
        self.cost_pedir_entry = customtkinter.CTkEntry(self.cost_pedir_frame, textvariable=self.cost_pedir_var)
        self.cost_pedir_entry.grid(row=1, column=0, padx=5, pady=5)

        self.cost_sobrepasar_frame = customtkinter.CTkFrame(master=master)
        self.cost_sobrepasar_frame.grid(row=4, column=0, padx=10, pady=10, sticky="nw")
        self.cost_sobrepasar_lbl = customtkinter.CTkLabel(master=self.cost_sobrepasar_frame, text="Costo de sobrepasar ""\nla capacidad de ""\nalmacenamiento")
        self.cost_sobrepasar_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="s")

        self.costo_sobrepasar = customtkinter.StringVar()
        self.costo_sobrepasar.set("5000")
        self.costo_sobrepasar_entry = customtkinter.CTkEntry(self.cost_sobrepasar_frame, textvariable=self.costo_sobrepasar)
        self.costo_sobrepasar_entry.grid(row=1, column=0, padx=5, pady=5)

        self.costo_almacenamiento_frame = customtkinter.CTkFrame(master=master)
        self.costo_almacenamiento_frame.grid(row=5, column=0, padx=10, pady=10, sticky="nw")
        self.costo_almacenamiento_lbl = customtkinter.CTkLabel(master=self.costo_almacenamiento_frame, text="Costo de""\nalmacenamiento")
        self.costo_almacenamiento_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="s")

        self.costo_almacenamiento = customtkinter.StringVar()
        self.costo_almacenamiento.set("2500")
        self.costo_almacenamiento_entry = customtkinter.CTkEntry(self.costo_almacenamiento_frame, textvariable=self.costo_almacenamiento)
        self.costo_almacenamiento_entry.grid(row=1, column=0, padx=5, pady=5)
        
        self.capacidad_almacenamiento_frame = customtkinter.CTkFrame(master=master)
        self.capacidad_almacenamiento_frame.grid(row=6, column=0, padx=10, pady=10, sticky="nw")
        self.capacidad_almacenamiento_lbl = customtkinter.CTkLabel(master=self.capacidad_almacenamiento_frame, text="Capacidad de""\nalmacenamiento")
        self.capacidad_almacenamiento_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="s")

        self.capacidad_almacenamiento = customtkinter.StringVar()
        self.capacidad_almacenamiento.set("20000")
        self.capacidad_almacenamiento_entry = customtkinter.CTkEntry(self.capacidad_almacenamiento_frame, textvariable=self.capacidad_almacenamiento)
        self.capacidad_almacenamiento_entry.grid(row=1, column=0, padx=5, pady=5)

        # Tabla de números aleatorios generados
        self.table_frame = customtkinter.CTkFrame(master=master)
        self.table_frame.grid(row=0, column=1, rowspan=8, padx=10, pady=10, sticky="ne")
        self.table_lbl = customtkinter.CTkLabel(master=self.table_frame, text="Tabla de simulaciones")
        self.table_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="sw")

        self.canvas = tk.Canvas(self.table_frame)
        self.canvas.grid(row=0, column=0, padx=5, pady=5, sticky="nsew")
        #self.canvas.config(width=ventana.winfo_screenwidth()-200, height=ventana.winfo_screenheight()-350)
        self.canvas.config(width=1150, height=410)

        # Crear un Canvas para contener la tabla
        self.table = ttk.Treeview(self.canvas, columns=("RND1", "PedidoSemanal",  "RND2", "ConsumoSemanal",
                                                             "CantAlmacenada", "CantSobrepasada","costPedir","CostoAlmacenamiento", "CostoSobrepasar",
                                                              "AcumuladorConsumo", "ConsumoPromedio",
                                                             "VecesSinAlmacenamiento", "ProbSinAlmacenamiento","Gastos",
                                                             "AcumuladorGastos", "GastoPromedio", "MaxCantSobrepasada", "MaxGasto"))
        self.table.configure(height=19)
        style = ttk.Style()
        style.configure("Treeview.Heading", font=('Calibri', 8, 'bold'), anchor="center", )
        self.table.heading("#0", text="Semana")
        self.table.heading("RND1", text="RNDPedido")
        self.table.heading("PedidoSemanal", text="Pedido")
        self.table.heading("RND2", text="RNDConsumo")
        self.table.heading("ConsumoSemanal", text="Consumo")
        self.table.heading("CantAlmacenada", text="Cant\nAlmacenada")
        self.table.heading("CantSobrepasada", text="Cant\nSobrepasada")
        self.table.heading("costPedir", text="CostPedir")
        self.table.heading("CostoSobrepasar", text="Costo\nSobrepasar")
        self.table.heading("CostoAlmacenamiento", text="Costo\nAlm")
        self.table.heading("AcumuladorConsumo", text="++\nConsumo")
        self.table.heading("ConsumoPromedio", text="Consumo\nPromedio")
        self.table.heading("VecesSinAlmacenamiento", text="VecesSin\nAlm")
        self.table.heading("ProbSinAlmacenamiento", text="P() Sin\nAlm")
        self.table.heading("Gastos", text="Gastos")
        self.table.heading("AcumuladorGastos", text="++\nGastos")
        self.table.heading("GastoPromedio", text="Gasto\npromedio")
        self.table.heading("MaxCantSobrepasada", text="MaxCant\nSobrepasada")
        self.table.heading("MaxGasto", text="Max\nGasto")
        self.table.column("#0", width=100)
        self.table.column("RND1", width=80)
        self.table.column("PedidoSemanal", width=50)
        self.table.column("RND2", width=90)
        self.table.column("ConsumoSemanal", width=60)
        self.table.column("CantAlmacenada", width=100)
        self.table.column("CantSobrepasada", width=100)
        self.table.column("costPedir", width=55)
        self.table.column("CostoAlmacenamiento", width=60)
        self.table.column("CostoSobrepasar", width=80)
        self.table.column("AcumuladorConsumo", width=60)
        self.table.column("ConsumoPromedio", width=80)
        self.table.column("VecesSinAlmacenamiento", width=60)
        self.table.column("ProbSinAlmacenamiento", width=100)
        self.table.column("Gastos", width=70)
        self.table.column("AcumuladorGastos", width=100)
        self.table.column("GastoPromedio", width=90)
        self.table.column("MaxCantSobrepasada", width=90)
        self.table.column("MaxGasto", width=80)

        # Crear el scrollbar horizontal y configurar el canvas para desplazarse con él
        self.h_scroll = tk.Scrollbar(self.table_frame, orient="horizontal", command=self.canvas.xview)
        self.canvas.configure(xscrollcommand=self.h_scroll.set)
        self.h_scroll.grid(row=2, column=0, sticky="ew")
        # Crear el scrollbar vertical y configurar la tabla para desplazarse con él
        self.v_scroll = tk.Scrollbar(self.table_frame, orient=tk.VERTICAL, command=self.table.yview)
        self.table.configure(yscrollcommand=self.v_scroll.set)
        self.v_scroll.grid(row=0, column=1, sticky="ns")


        # Colocar la tabla dentro del canvas
        self.canvas.create_window((0, 0), window=self.table, anchor="nw")

        # Configurar el tamaño del canvas y el comportamiento del scrollbar
        self.table.bind("<Configure>", lambda e: self.canvas.configure(scrollregion=self.canvas.bbox("all")))


        # Botón para generar simulaciones
        self.generar_button = customtkinter.CTkButton(master, text="Generar simulaciones", font=('Calibri', 14, 'bold'), command=self.funcPrincipal)
        self.generar_button.grid(row=6, column=0, padx=10, pady=10)

        # Conclusion 
        self.conclu_frame = customtkinter.CTkFrame(master=master)
        self.conclu_frame.grid(row=6, column=1, padx=10, pady=10, sticky="news")
        self.conclu_lbl0 = customtkinter.CTkLabel(master=self.conclu_frame, text="Métricas:")
        self.conclu_lbl0.grid(row=0, column=0, padx=10, pady=0, sticky="sw")

        self.conclu_lbl1 = customtkinter.CTkLabel(master=self.conclu_frame, text="")
        self.conclu_lbl1.grid(row=1, column=0, padx=10, pady=0, sticky="sw")
 
        self.conclu_lbl2 = customtkinter.CTkLabel(master=self.conclu_frame, text="")
        self.conclu_lbl2.grid(row=2, column=0, padx=10, pady=0, sticky="nw")
        
        self.conclu_lbl3 = customtkinter.CTkLabel(master=self.conclu_frame, text="")
        self.conclu_lbl3.grid(row=3, column=0, padx=10, pady=0, sticky="nw")
        
        self.conclu_lbl4 = customtkinter.CTkLabel(master=self.conclu_frame, text="")
        self.conclu_lbl4.grid(row=4, column=0, padx=10, pady=0, sticky="nw")
        
        self.conclu_lbl5 = customtkinter.CTkLabel(master=self.conclu_frame, text="")
        self.conclu_lbl5.grid(row=5, column=0, padx=10, pady=0, sticky="nw")
        
    def definirConclusion(self,vecEstado):
        #ampliamiento del almacen
        if (vecEstado.probSinAlmacenamiento <= 0.5):
            tex1 = "Como la probabilidad de que nos quedemos sin almacenamiento es menor o igual al 0,5 podemos decir que no es necesario ampliar el almacenamiento"
        else:
            tex1 = "Como la probabilidad es mayor al 0,5 podemos decir que es necesario ampliar el almacenamiento"

        #Consumo Promedio
        tex2 = "El consumo promedio por semana de la fabrica es de: " + str(vecEstado.consumoProm) + " metros cuadrados de acero"

        #Gasto Promedio
        tex3 = "El gasto promedio por semana de la fabrica es de: $" + str(vecEstado.gastosProm)

        #maxima cantidad sobrepasada
        tex4 = "La cantidad maxima sobrepasada de acero en el almacen es de: " + str(vecEstado.maxCantSobrepasada) + " metros cuadrados"

        #Gasto Maximo
        tex5 = "El gasto maximo calculado en toda la simulacion es de: $" + str(vecEstado.maxGasto)

        self.conclu_lbl1.configure(text=tex1) # la capacidad del deposito es adecuada ¿?
        self.conclu_lbl2.configure(text=tex2) # consumo promedio
        self.conclu_lbl3.configure(text=tex3) # gasto promedio
        self.conclu_lbl4.configure(text=tex4) # max cant sobrepasada
        self.conclu_lbl5.configure(text=tex5) # gasto maximo


    def intervaloPedido(self, rnd):
        #plantear intervalos de pedido
        if (rnd < 0.70): # 8000 mts2
            return 8000
        else: # 11000 mts2
            return 11000

    def intervaloConsumo(self, rnd):
        #plantear intervalos de consumo
        if (rnd < 0.05): # 6000 mts2
            return 6000
        elif (rnd < 0.20): # 7000 mts2
            return 7000
        elif (rnd < 0.40): # 8000 mts2
            return 8000
        elif ( rnd < 0.70): # 9000 mts2
            return 9000
        elif (rnd < 0.90): # 10000 mts2 
            return 10000
        else: # 11000 mts2
            return 11000

    #calcula la cantidad almacenada, sobrepasada y maxima sobrepasada
    def cantidadAlmacenada(self,vecEstado,i,consumo):
        if i == 1:
            cant = vecEstado[0].cantAlmacenada + vecEstado[1].pedido - consumo
        else:
            cant = vecEstado[1].cantAlmacenada + vecEstado[0].pedido - consumo
        if cant > int(self.capacidad_almacenamiento.get()):
            exed = cant - int(self.capacidad_almacenamiento.get())
            cant = int(self.capacidad_almacenamiento.get())
            #compara con  el valor del maximo en la fila anterior y saca el mayor
            if i == 1:
                if exed > vecEstado[0].maxCantSobrepasada:
                    maximo = exed
                else:
                    maximo = vecEstado[0].maxCantSobrepasada
            else:
                if exed > vecEstado[1].maxCantSobrepasada:
                    maximo = exed
                else:
                    maximo = vecEstado[1].maxCantSobrepasada

        else:
            exed = 0
            if i == 1:
                maximo = vecEstado[0].maxCantSobrepasada
            else:
                maximo = vecEstado[1].maxCantSobrepasada
        return cant, exed, maximo
    
    def costoAlmacenamientoYSobrepasado(self, vecEstado,i):
        if i == 1:
            costA = vecEstado[1].cantAlmacenada *   float(self.costo_almacenamiento.get())
            costS = vecEstado[1].cantSobrepasada * float(self.costo_sobrepasar.get())
        else:
            costA = vecEstado[0].cantAlmacenada * float(self.costo_almacenamiento.get())
            costS = vecEstado[0].cantSobrepasada * float(self.costo_sobrepasar.get())
        if costA < 0:
            costA = 0
        return costA, costS
    
    #funcion que calcula el consumo promedio y acumulado
    def consumoAcumYprom(self, vecEstado,i):
        if i == 1:
            consum = vecEstado[0].consumoAcum + vecEstado[1].consumo
            prom = consum / vecEstado[1].semana
        else:
            consum = vecEstado[1].consumoAcum + vecEstado[0].consumo
            prom = consum / vecEstado[0].semana
        return consum, prom

    #funcion que cuenta las veces que se sobrepaso del almacenamiento y calcula la probabilidad
    def cantSobrepasar(self, vecEstado,i,exed):
        ac=0
        prob=0
        if i == 1:
            if exed > 0:
                ac = vecEstado[0].cantSinAlmacenar + 1
                prob = ac / vecEstado[1].semana
            else:
                ac = vecEstado[0].cantSinAlmacenar
                prob = ac / vecEstado[1].semana
        else:
            if exed > 0:
                ac = vecEstado[1].cantSinAlmacenar + 1
                prob = ac / vecEstado[0].semana
            else:
                ac = vecEstado[1].cantSinAlmacenar
                prob = ac / vecEstado[0].semana
        return ac , prob
        

    def calculoGastos(self, vecEstado,i):
        if i == 1:
            gasto = vecEstado[1].costoPedir + vecEstado[1].costoAlmacenamiento + vecEstado[1].costoSobrePasar
            gastoAcum = gasto + vecEstado[0].gastosAcum
            gastoProm = gastoAcum / vecEstado[1].semana
            if vecEstado[0].maxGasto > gasto:
                gastomax = vecEstado[0].maxGasto
            else:
                gastomax = gasto

        else:
            gasto = vecEstado[0].costoPedir + vecEstado[0].costoAlmacenamiento + vecEstado[0].costoSobrePasar
            gastoAcum = gasto + vecEstado[1].gastosAcum
            gastoProm = gastoAcum / vecEstado[0].semana
            if vecEstado[1].maxGasto > gasto:
                gastomax = vecEstado[1].maxGasto
            else:
                gastomax = gasto

        return gasto,gastoAcum,gastoProm,gastomax


    #funcion de iteracion del metodo
    def funcPrincipal(self):
        # Limpiar tabla de números anteriores
        for child in self.table.get_children():
            self.table.delete(child)
        for i in range(int(self.cantidad_numeros_entry.get())+1):
            rnd1 = float("{:.2f}".format(random.random()))
            rnd2 = float("{:.2f}".format(random.random()))
            pedido = self.intervaloPedido(rnd1)
            consumo = self.intervaloConsumo(rnd2)
            #Seteamos todo en 0 en la primera fila
            if (i == 0):
                vecEstado = [vectDatos(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0), vectDatos(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)]
            
            #para cuando estamos en el vector i=1
            elif ( i % 2 != 0):
                vecEstado[1].semana = i
                vecEstado[1].pedido = pedido
                vecEstado[1].consumo = consumo
                #calculo de cantidad almacenada y sobrepasada
                cant,exed,maximo = self.cantidadAlmacenada(vecEstado,1,consumo)
                costoPedir =  float(self.cost_pedir_var.get())
                vecEstado[1].costoPedir = costoPedir
                vecEstado[1].cantAlmacenada = cant
                vecEstado[1].cantSobrepasada = exed
                #calculo de costo de almacenamiento
                costoAlmacenamiento, costoSobrepasado = self.costoAlmacenamientoYSobrepasado(vecEstado,1)
                vecEstado[1].costoAlmacenamiento = costoAlmacenamiento
                vecEstado[1].costoSobrePasar = costoSobrepasado
                #calculo Consumo acumulado y consumo promedio
                consumoAcumulado, consumoPromedio = self.consumoAcumYprom(vecEstado,1)
                #calculo de veces que se exedio del almacenamiento y su probabilidad
                vecesExedAlmacenam, probExedAlmacenam = self.cantSobrepasar(vecEstado,1,exed) 
                #calculo de gastos 
                gastos, gastosAcum, gastosProm, maxGasto = self.calculoGastos(vecEstado,1)

                #definir en vector estado
                vecEstado[1].rnd1 = rnd1
                vecEstado[1].rnd2 = rnd2
                vecEstado[1].consumoAcum = consumoAcumulado
                vecEstado[1].consumoProm = float("{:.2f}".format(consumoPromedio))
                vecEstado[1].cantSinAlmacenar = vecesExedAlmacenam
                vecEstado[1].probSinAlmacenamiento = float("{:.2f}".format(probExedAlmacenam))
                vecEstado[1].gastos = gastos
                vecEstado[1].gastosAcum = gastosAcum
                vecEstado[1].gastosProm = float("{:.2f}".format(gastosProm))
                vecEstado[1].maxCantSobrepasada = maximo
                vecEstado[1].maxGasto = maxGasto
                

            #para cuando estamos en el vector i=0
            else:
                vecEstado[0].semana = i
                vecEstado[0].pedido = pedido
                vecEstado[0].consumo = consumo
                #calculo de cantidad almacenada y sobrepasada
                cant,exed,maximo = self.cantidadAlmacenada(vecEstado,0,consumo)
                costoPedir = float(self.cost_pedir_var.get())
                vecEstado[0].costoPedir = costoPedir
                vecEstado[0].cantAlmacenada = cant
                vecEstado[0].cantSobrepasada = exed
                #calculo de costo de almacenamiento
                costoAlmacenamiento, costoSobrepasado = self.costoAlmacenamientoYSobrepasado(vecEstado,0)
                vecEstado[0].costoAlmacenamiento = costoAlmacenamiento
                vecEstado[0].costoSobrePasar = costoSobrepasado
                #calculo Consumo acumulado y consumo promedio
                consumoAcumulado, consumoPromedio = self.consumoAcumYprom(vecEstado,0)
                #calculo de veces que se exedio del almacenamiento y su probabilidad
                vecesExedAlmacenam, probExedAlmacenam = self.cantSobrepasar(vecEstado,0,exed) 
                #calculo de gastos 
                gastos, gastosAcum, gastosProm, maxGasto = self.calculoGastos(vecEstado,0)


                #definir en vector estado
                vecEstado[0].rnd1 = rnd1
                vecEstado[0].rnd2 = rnd2
                vecEstado[0].consumoAcum = consumoAcumulado
                vecEstado[0].consumoProm = float("{:.2f}".format(consumoPromedio))
                vecEstado[0].cantSinAlmacenar = vecesExedAlmacenam
                vecEstado[0].probSinAlmacenamiento = float("{:.5f}".format(probExedAlmacenam))
                vecEstado[0].gastos = gastos
                vecEstado[0].gastosAcum = gastosAcum
                vecEstado[0].gastosProm =  float("{:.2f}".format(gastosProm))
                vecEstado[0].maxCantSobrepasada = maximo
                vecEstado[0].maxGasto = maxGasto

            # guarda la ultima semana
            if (i+1 > int(self.cantidad_numeros_var.get())):
                if ( i % 2 == 0):
                    self.table.insert("", "end", text=i, values=(vecEstado[0].rnd1, vecEstado[0].pedido,
                                                                 vecEstado[0].rnd2, vecEstado[0].consumo, vecEstado[0].cantAlmacenada,
                                                                 vecEstado[0].cantSobrepasada, vecEstado[0].costoPedir,
                                                                 vecEstado[0].costoAlmacenamiento, vecEstado[0].costoSobrePasar,
                                                                 vecEstado[0].consumoAcum, vecEstado[0].consumoProm,
                                                                 vecEstado[0].cantSinAlmacenar, vecEstado[0].probSinAlmacenamiento,
                                                                 vecEstado[0].gastos, vecEstado[0].gastosAcum, vecEstado[0].gastosProm,
                                                                 vecEstado[0].maxCantSobrepasada,
                                                                 vecEstado[0].maxGasto))
                    self.definirConclusion(vecEstado[0])
                else:
                    self.table.insert("", "end", text=i, values=(vecEstado[1].rnd1, vecEstado[1].pedido,
                                                                 vecEstado[1].rnd2, vecEstado[1].consumo, vecEstado[1].cantAlmacenada,
                                                                 vecEstado[1].cantSobrepasada, vecEstado[1].costoPedir,
                                                                 vecEstado[1].costoAlmacenamiento, vecEstado[1].costoSobrePasar,
                                                                 vecEstado[1].consumoAcum, vecEstado[1].consumoProm,
                                                                 vecEstado[1].cantSinAlmacenar, vecEstado[1].probSinAlmacenamiento,
                                                                 vecEstado[1].gastos, vecEstado[1].gastosAcum, vecEstado[1].gastosProm,
                                                                 vecEstado[1].maxCantSobrepasada,
                                                                 vecEstado[1].maxGasto))
                    self.definirConclusion(vecEstado[1])

            # guardando vectores (500 semanas a partir de x semanas)
            if (i >= int(self.ver_desde_var.get())) and i<=int(self.ver_desde_var.get())+500:
                if ( i % 2 == 0):
                    #copia = copy.deepcopy(vecEstado[0])
                    #vecShow500.append(copia)
                    self.table.insert("", "end", text=i, values=(vecEstado[0].rnd1, vecEstado[0].pedido,
                                                                 vecEstado[0].rnd2, vecEstado[0].consumo, vecEstado[0].cantAlmacenada,
                                                                 vecEstado[0].cantSobrepasada, vecEstado[0].costoPedir,
                                                                 vecEstado[0].costoAlmacenamiento, vecEstado[0].costoSobrePasar,
                                                                 vecEstado[0].consumoAcum, vecEstado[0].consumoProm,
                                                                 vecEstado[0].cantSinAlmacenar, vecEstado[0].probSinAlmacenamiento,
                                                                 vecEstado[0].gastos, vecEstado[0].gastosAcum, vecEstado[0].gastosProm,
                                                                 vecEstado[0].maxCantSobrepasada,
                                                                 vecEstado[0].maxGasto))
                else:
                    #copia = copy.deepcopy(vecEstado[1])
                    #vecShow500.append(copia)
                    self.table.insert("", "end", text=i, values=(vecEstado[1].rnd1, vecEstado[1].pedido,
                                                                 vecEstado[1].rnd2, vecEstado[1].consumo, vecEstado[1].cantAlmacenada,
                                                                 vecEstado[1].cantSobrepasada, vecEstado[1].costoPedir,
                                                                 vecEstado[1].costoAlmacenamiento, vecEstado[1].costoSobrePasar,
                                                                 vecEstado[1].consumoAcum, vecEstado[1].consumoProm,
                                                                 vecEstado[1].cantSinAlmacenar, vecEstado[1].probSinAlmacenamiento,
                                                                 vecEstado[1].gastos, vecEstado[1].gastosAcum, vecEstado[1].gastosProm,
                                                                 vecEstado[1].maxCantSobrepasada,
                                                                 vecEstado[1].maxGasto))
                #if (500 < len(vecShow500)):
                    #vecShow500 = vecShow500[1:]

        #mostrar los mensajes

        #una vez finalizado se ordenan las 500 filas
        #vecShow500.sort(key=lambda x: x.semana) # en teoria es redudante xq con el [1:] ya borramos el primer elemento


if __name__ == "__main__":
    ventana = customtkinter.CTk()
    # Obtener la anchura y altura de la pantalla en milímetros
    ancho_mm, altura_mm = ventana.winfo_screenmmwidth(), ventana.winfo_screenmmheight()
    # Obtener la resolución de la pantalla en píxeles
    resolucion = ventana.winfo_screenwidth(), ventana.winfo_screenheight()

    # Calcular la densidad de píxeles de la pantalla
    dpi_x, dpi_y = float(resolucion[0]) / float(ancho_mm) * 25.4, float(resolucion[1]) / float(altura_mm) * 25.4

    # Calcular la anchura y altura de la ventana en píxeles
    ancho_px, altura_px = int(ancho_mm / 25.4 * dpi_x), int(altura_mm / 25.4 * dpi_y)

    # Configurar la anchura y altura de la ventana
    #ventana.geometry("%dx%d" % (ancho_px, altura_px))
    ventana.geometry("%dx%d" % (1735, 850))

    # Obtener la posición X e Y de la ventana
    pos_x = int(resolucion[0] / 2 - ancho_px / 2)
    pos_y = int(resolucion[1] / 2 - altura_px / 2)

    # Configurar la posición de la ventana
    ventana.geometry("+{}+{}".format(pos_x, pos_y))
    app = MontercarlooApp(ventana)
    ventana.mainloop()