from math import *
from copy import deepcopy
import random
import customtkinter
import pandas as pd
from openpyxl import Workbook
from openpyxl.utils.dataframe import dataframe_to_rows
import os
import pdb

class vectDatos:
    def __init__(self, evento, reloj,
                 RND_llegVehiculo, tiempo_llegVehiculo, horaLL_llegVehiculo,
                 RND_llgrupo, Tiempo_llgrupo, HoraLL_llgrupo, RND_cantidad, Cantidad, RND_intencion, intencion,
                 RND_fCobroEstacionamiento, tiempo_fCobroEstacionamiento, horaFin_fCobroEstacionamiento1,
                 horaFin_fCobroEstacionamiento2, horaFin_fCobroEstacionamiento3,
                 horaFin_fCobroEstacionamiento4, horaFin_fCobroEstacionamiento5, RND_cant, cant, RND_inte, inte,
                 horaFin_LlegadaCobroEntr,
                 horaFin_ControlEntr1, horaFin_ControlEntr2,
                 RND_CobrEntr, tiempo_CobroEntr, horaFin_CobroEntr1, horaFin_CobroEntr2, horaFin_CobroEntr3,
                 horaFin_CobroEntr4, horaFin_CobroEntr5, horaFin_CobroEntr6,
                 HoraFin_Detec1, HoraFin_Detec2, HoraFin_Detec3, HoraFin_Detec4,
                 ColaEstacionamiento,
                 ColaEntrada1, ColaEntrada2, ColaEntrada3,
                 ColaDetector,
                 ColaControlEntradas1, ColaControlEntradas2,
                 CajaEstacionamiento1, CajaEstacionamiento2, CajaEstacionamiento3, CajaEstacionamiento4,
                 CajaEstacionamiento5,
                 CajaEntradas1, CajaEntradas2, CajaEntradas3, CajaEntradas4, CajaEntradas5, CajaEntradas6,
                 CajaDetector1, CajaDetector2, CajaDetector3, CajaDetector4,
                 CajaControlEntradas1, CajaControlEntradas2,
                 maxColaAutos, tiempoHastaComprarEntrada, clienteEntradaColaXTiempo, tiempoPermanencia, personasPasadas,
                 tiempoPromedioEntrada, cantidadPromedioCola, tiempoPromedioPermanencia,
                 oGrupoConAuto, oGrupoSinAuto, oPersona, oVehiculo, listaColaControlEntrada):
        # inicio
        self.evento = evento
        self.reloj = reloj
        # llegadas
        # Llegada Vehiculo
        self.RND_llegVehiculo = RND_llegVehiculo
        self.tiempo_llegVehiculo = tiempo_llegVehiculo
        self.horaLL_llegVehiculo = horaLL_llegVehiculo  # EVENTO
        # Llegada grupo sin auto
        self.RND_llgrupo = RND_llgrupo
        self.Tiempo_llgrupo = Tiempo_llgrupo
        self.HoraLL_llgrupo = HoraLL_llgrupo  # EVENTO
        self.RND_cantidad = RND_cantidad
        self.Cantidad = Cantidad
        self.RND_intencion = RND_intencion
        self.intencion = intencion

        # Fines
        # fin Cobro estacionamiento
        self.RND_fCobroEstacionamiento = RND_fCobroEstacionamiento
        self.tiempo_fCobroEstacionamiento = tiempo_fCobroEstacionamiento
        self.horaFin_fCobroEstacionamiento1 = horaFin_fCobroEstacionamiento1  # EVENTO
        self.horaFin_fCobroEstacionamiento2 = horaFin_fCobroEstacionamiento2  # EVENTO
        self.horaFin_fCobroEstacionamiento3 = horaFin_fCobroEstacionamiento3  # EVENTO
        self.horaFin_fCobroEstacionamiento4 = horaFin_fCobroEstacionamiento4  # EVENTO
        self.horaFin_fCobroEstacionamiento5 = horaFin_fCobroEstacionamiento5  # EVENTO
        self.RND_cant = RND_cant
        self.cant = cant
        self.RND_inte = RND_inte
        self.inte = inte
        # fin llegada cobro entrada ( los 5 minutos caminando desde q estaciona )
        self.horaFin_LlegadaCobroEntr = horaFin_LlegadaCobroEntr  # EVENTO
        # fin control entrada ( constrante .25 )
        self.horaFin_ControlEntr1 = horaFin_ControlEntr1  # EVENTO
        self.horaFin_ControlEntr2 = horaFin_ControlEntr2  # EVENTO
        # fin cobro entrada
        self.RND_CobrEntr = RND_CobrEntr
        self.tiempo_CobroEntr = tiempo_CobroEntr
        self.horaFin_CobroEntr1 = horaFin_CobroEntr1  # EVENTO
        self.horaFin_CobroEntr2 = horaFin_CobroEntr2  # EVENTO
        self.horaFin_CobroEntr3 = horaFin_CobroEntr3  # EVENTO
        self.horaFin_CobroEntr4 = horaFin_CobroEntr4  # EVENTO
        self.horaFin_CobroEntr5 = horaFin_CobroEntr5  # EVENTO
        self.horaFin_CobroEntr6 = horaFin_CobroEntr6  # EVENTO
        # fin deteccion
        self.HoraFin_Detec1 = HoraFin_Detec1  # EVENTO
        self.HoraFin_Detec2 = HoraFin_Detec2  # EVENTO
        self.HoraFin_Detec3 = HoraFin_Detec3  # EVENTO
        self.HoraFin_Detec4 = HoraFin_Detec4  # EVENTO

        # Colas
        # estacionamiento 1
        self.ColaEstacionamiento = ColaEstacionamiento
        # compra de entradas 3
        self.ColaEntrada1 = ColaEntrada1
        self.ColaEntrada2 = ColaEntrada2
        self.ColaEntrada3 = ColaEntrada3
        # cola detector 1
        self.ColaDetector = ColaDetector
        # cola control entradas 2
        self.ColaControlEntradas1 = ColaControlEntradas1
        self.ColaControlEntradas2 = ColaControlEntradas2

        # servidores
        # caja estacionamiento 5
        self.CajaEstacionamiento1 = CajaEstacionamiento1
        self.CajaEstacionamiento2 = CajaEstacionamiento2
        self.CajaEstacionamiento3 = CajaEstacionamiento3
        self.CajaEstacionamiento4 = CajaEstacionamiento4
        self.CajaEstacionamiento5 = CajaEstacionamiento5
        # caja entradas 6
        self.CajaEntradas1 = CajaEntradas1
        self.CajaEntradas2 = CajaEntradas2
        self.CajaEntradas3 = CajaEntradas3
        self.CajaEntradas4 = CajaEntradas4
        self.CajaEntradas5 = CajaEntradas5
        self.CajaEntradas6 = CajaEntradas6
        # caja detectores 4
        self.Detector1 = CajaDetector1
        self.Detector2 = CajaDetector2
        self.Detector3 = CajaDetector3
        self.Detector4 = CajaDetector4
        # caja control entradas 2
        self.CajaControlEntradas1 = CajaControlEntradas1
        self.CajaControlEntradas2 = CajaControlEntradas2

        # acumuladores
        self.maxColaAutos = maxColaAutos
        self.tiempoHastaComprarEntrada = tiempoHastaComprarEntrada
        self.clienteEntradaColaXTiempo = clienteEntradaColaXTiempo
        self.tiempoPermanencia = tiempoPermanencia
        self.personasPasadas = personasPasadas
        # estadisticas
        self.tiempoPromedioEntrada = tiempoPromedioEntrada
        self.cantidadPromedioCola = cantidadPromedioCola
        self.tiempoPromedioPermanencia = tiempoPromedioPermanencia

        # Objetos
        self.oGrupoConAuto = oGrupoConAuto
        self.oGrupoSinAuto = oGrupoSinAuto
        self.oPersona = oPersona
        self.oVehiculo = oVehiculo

        #extras
        self.listaColaControlEntrada = listaColaControlEntrada

    def to_lista(self):
        return [self.evento
            , self.reloj
            , self.RND_llegVehiculo
            , self.tiempo_llegVehiculo
            , self.horaLL_llegVehiculo
            , self.RND_llgrupo
            , self.Tiempo_llgrupo
            , self.HoraLL_llgrupo
            , self.RND_cantidad
            , self.Cantidad
            , self.RND_intencion
            , self.intencion
            , self.RND_fCobroEstacionamiento
            , self.tiempo_fCobroEstacionamiento
            , self.horaFin_fCobroEstacionamiento1
            , self.horaFin_fCobroEstacionamiento2
            , self.horaFin_fCobroEstacionamiento3
            , self.horaFin_fCobroEstacionamiento4
            , self.horaFin_fCobroEstacionamiento5
            , self.RND_cant
            , self.cant
            , self.RND_inte
            , self.inte
            , self.horaFin_LlegadaCobroEntr
            , self.horaFin_ControlEntr1
            , self.horaFin_ControlEntr2
            , self.RND_CobrEntr
            , self.tiempo_CobroEntr
            , self.horaFin_CobroEntr1
            , self.horaFin_CobroEntr2
            , self.horaFin_CobroEntr3
            , self.horaFin_CobroEntr4
            , self.horaFin_CobroEntr5
            , self.horaFin_CobroEntr6
            , self.HoraFin_Detec1
            , self.HoraFin_Detec2
            , self.HoraFin_Detec3
            , self.HoraFin_Detec4
            , self.ColaEstacionamiento
            , self.ColaEntrada1
            , self.ColaEntrada2
            , self.ColaEntrada3
            , self.ColaDetector
            , self.ColaControlEntradas1
            , self.ColaControlEntradas2
            , self.CajaEstacionamiento1
            , self.CajaEstacionamiento2
            , self.CajaEstacionamiento3
            , self.CajaEstacionamiento4
            , self.CajaEstacionamiento5
            , self.CajaEntradas1
            , self.CajaEntradas2
            , self.CajaEntradas3
            , self.CajaEntradas4
            , self.CajaEntradas5
            , self.CajaEntradas6
            , self.Detector1
            , self.Detector2
            , self.Detector3
            , self.Detector4
            , self.CajaControlEntradas1
            , self.CajaControlEntradas2
            , self.maxColaAutos
            , self.tiempoHastaComprarEntrada
            , self.clienteEntradaColaXTiempo
            , self.tiempoPermanencia
            , self.personasPasadas
            , self.tiempoPromedioEntrada
            , self.cantidadPromedioCola
            , self.tiempoPromedioPermanencia
            , self.oGrupoConAuto
            , self.oGrupoSinAuto
            , self.oPersona
            , self.oVehiculo]


class grupoConAuto:
    def __init__(self, estado, horallegada, horaLLegColaEntrada, cantidad):
        self.estado = estado
        self.horallegada = horallegada
        self.hora_llegColaEntrada = horaLLegColaEntrada
        self.cantidad = cantidad


class persona:
    def __init__(self, estado, horallegada):
        self.estado = estado
        self.horallegada = horallegada


class auto:
    def __init__(self, estado, horallegada):
        self.estado = estado
        self.horallegada = horallegada


class grupoSinAuto:
    def __init__(self, estado, horallegada, cantidad):
        self.estado = estado
        self.horallegada = horallegada
        self.cantidad = cantidad


class datos:
    def __init__(self, mediallv, mediallgrupoSinAuto, mediaFinCobroEstacionamiento, mediafinCobroEntrada,
                 finControlEntradas, finDeteccion):
        self.mediallv = mediallv
        self.mediallgrupoSinAuto = mediallgrupoSinAuto
        self.mediaFinCobroEstacionamiento = mediaFinCobroEstacionamiento
        self.mediafinCobroEntrada = mediafinCobroEntrada
        self.finControlEntradas = finControlEntradas
        self.finDeteccion = finDeteccion


def encontrar_indice(lista, valor):
    try:
        indice = lista.index(valor)
        return indice
    except ValueError:
        return -1  # Si el valor no se encuentra en la lista, se devuelve -1


def menorTiempoCobro(vecEstado, i):
    x = [vecEstado[i].horaFin_fCobroEstacionamiento1, vecEstado[i].horaFin_fCobroEstacionamiento2,
         vecEstado[i].horaFin_fCobroEstacionamiento3, vecEstado[i].horaFin_fCobroEstacionamiento4,
         vecEstado[i].horaFin_fCobroEstacionamiento5]
    try:
        menor = min(variable for variable in x if variable != 0 and variable > vecEstado[i].reloj)
        indice = encontrar_indice(x, menor)
        return menor, indice + 1
    except ValueError:
        return -1, -1


def menorTiempoControl(vecEstado, i):
    x = [vecEstado[i].ColaControlEntradas1, vecEstado[i].ColaControlEntradas2]
    try:
        menor = min(variable for variable in x if variable != 0 and variable > vecEstado[i].reloj)
        indice = encontrar_indice(x, menor)
        return menor, indice + 1
    except ValueError:
        return -1, -1


def menorTiempoDetector(vecEstado, i):
    x = [vecEstado[i].HoraFin_Detec1, vecEstado[i].HoraFin_Detec2, vecEstado[i].HoraFin_Detec3,
         vecEstado[i].HoraFin_Detec4]
    try:
        menor = min(variable for variable in x if variable != 0 and variable > vecEstado[i].reloj)
        indice = encontrar_indice(x, menor)
        return menor, indice + 1
    except ValueError:
        return -1, -1


def menorTiempoEventos(vecEstado, i):
    x = [vecEstado[i].horaLL_llegVehiculo, vecEstado[i].HoraLL_llgrupo, vecEstado[i].horaFin_fCobroEstacionamiento1,
         vecEstado[i].horaFin_fCobroEstacionamiento2,
         vecEstado[i].horaFin_fCobroEstacionamiento3, vecEstado[i].horaFin_fCobroEstacionamiento4,
         vecEstado[i].horaFin_fCobroEstacionamiento5,
         vecEstado[i].horaFin_LlegadaCobroEntr, vecEstado[i].horaFin_ControlEntr1, vecEstado[i].horaFin_ControlEntr2,
         vecEstado[i].horaFin_CobroEntr1, vecEstado[i].horaFin_CobroEntr2,
         vecEstado[i].horaFin_CobroEntr3, vecEstado[i].horaFin_CobroEntr4, vecEstado[i].horaFin_CobroEntr5,
         vecEstado[i].horaFin_CobroEntr6, vecEstado[i].HoraFin_Detec1,
         vecEstado[i].HoraFin_Detec2, vecEstado[i].HoraFin_Detec3, vecEstado[i].HoraFin_Detec4]
    menor = min(variable for variable in x if variable != 0)
    indice = encontrar_indice(x, menor)
    return menor, indice


def tipoEvento(vecEstado, i, relojActual):
    if relojActual == vecEstado[i].horaLL_llegVehiculo:
        return "llegada vehiculo"
    elif relojActual == vecEstado[i].HoraLL_llgrupo:
        return "llegada de grupo"
    elif relojActual == vecEstado[i].horaFin_fCobroEstacionamiento1:
        return "fin cobro estacionamiento1"
    elif relojActual == vecEstado[i].horaFin_fCobroEstacionamiento2:
        return "fin cobro estacionamiento2"
    elif relojActual == vecEstado[i].horaFin_fCobroEstacionamiento3:
        return "fin cobro estacionamiento3"
    elif relojActual == vecEstado[i].horaFin_fCobroEstacionamiento4:
        return "fin cobro estacionamiento4"
    elif relojActual == vecEstado[i].horaFin_fCobroEstacionamiento5:
        return "fin cobro estacionamiento5"
    elif relojActual == vecEstado[i].horaFin_LlegadaCobroEntr:
        return "fin llegada a la cola de entradas"
    elif relojActual == vecEstado[i].horaFin_ControlEntr1:
        return "fin control de Entradas1"
    elif relojActual == vecEstado[i].horaFin_ControlEntr2:
        return "fin control de Entradas2"
    elif relojActual == vecEstado[i].horaFin_CobroEntr1:
        return "fin cobro de entradas1"
    elif relojActual == vecEstado[i].horaFin_CobroEntr2:
        return "fin cobro de entradas2"
    elif relojActual == vecEstado[i].horaFin_CobroEntr3:
        return "fin cobro de entradas3"
    elif relojActual == vecEstado[i].horaFin_CobroEntr4:
        return "fin cobro de entradas4"
    elif relojActual == vecEstado[i].horaFin_CobroEntr5:
        return "fin cobro de entradas5"
    elif relojActual == vecEstado[i].horaFin_CobroEntr6:
        return "fin cobro de entradas6"
    elif relojActual == vecEstado[i].HoraFin_Detec1:
        return "fin de deteccion1"
    elif relojActual == vecEstado[i].HoraFin_Detec2:
        return "fin de deteccion2"
    elif relojActual == vecEstado[i].HoraFin_Detec3:
        return "fin de deteccion3"
    elif relojActual == vecEstado[i].HoraFin_Detec4:
        return "fin de deteccion4"
    else:
        return "WTF"


def EventoLLegadaVehiculo(vectorEstado, i):
    # calcula la nueva llegada
    vectorEstado[i].RND_llegVehiculo = float("{:.2f}".format(random.random()))
    while vectorEstado[i].RND_llegVehiculo == 1:
        vectorEstado[i].RND_llegVehiculo = float("{:.2f}".format(random.random()))
    vectorEstado[i].tiempo_llegVehiculo = -(d.mediallv) * log(1 - vectorEstado[i].RND_llegVehiculo)
    vectorEstado[i].horaLL_llegVehiculo = vectorEstado[i].tiempo_llegVehiculo + vectorEstado[i].reloj

    # cobro de estacionamiento MALLLL

    estado = ""
    # fila anterior
    j = 0
    if i == 0:
        j = 1
    # TODO verificar: trabajo con una copia del vector anterior, ver cual es el anterior
    # vectorEstado[i] = deepcopy(vectorEstado[j])

    # consulta si algun servidor esta libre
    cajas = [vectorEstado[j].CajaEstacionamiento1, vectorEstado[j].CajaEstacionamiento2,
             vectorEstado[j].CajaEstacionamiento3,
             vectorEstado[j].CajaEstacionamiento4, vectorEstado[j].CajaEstacionamiento5]
    indice = encontrar_indice(cajas, 'Libre')

    if indice != -1:
        # setear el valor del RND cobro estacionamiento , tiempo cobro estacionamiento y hora de finalizacion del cobro estacionamiento
        vectorEstado[i].RND_fCobroEstacionamiento = float("{:.2f}".format(random.random()))
        while vectorEstado[i].RND_fCobroEstacionamiento == 1:
            vectorEstado[i].RND_fCobroEstacionamiento = float("{:.2f}".format(random.random()))
        vectorEstado[i].tiempo_fCobroEstacionamiento = (-d.mediafinCobroEntrada) * (
            log(float(1 - vectorEstado[i].RND_fCobroEstacionamiento)))
        valor = vectorEstado[i].tiempo_fCobroEstacionamiento + vectorEstado[i].reloj
        setattr(vectorEstado[i], f"horaFin_fCobroEstacionamiento{indice + 1}", valor)
        # setear el valor del servidor a ocupado
        setattr(vectorEstado[i], f"CajaEstacionamiento{indice + 1}", 'Ocupado')
        # seteamos el estado del objeto nuevo
        estado = f"EnCajaEstacionamiento{indice + 1}"
    # en el caso que el servidor esa ocupado
    else:
        # incorporamos 1 en la cola --> solamente hay una cola
        vectorEstado[i].ColaEstacionamiento += 1
        estado = "EnColaCajaEstacionamiento"

    vechiculo = auto(estado, vectorEstado[i].reloj)
    vectorEstado[i].oVehiculo.append(vechiculo)

    # ----------------Acumuladores--------------------------
    # calculamos la cantidad maxima de autos que hubo en toda la simulacion
    vectorEstado[i].maxColaAutos = max(vectorEstado[i].ColaEstacionamiento, vectorEstado[i].maxColaAutos)

    # ----------------Estadisticas--------------------------
    # fin
    return vectorEstado

    # aca deberiamos anular o setear en 0 todo lo que no queremos que se muestre
    # seteamos todo lo que hay que arrastrar hacia abajo


# Evento de llegada de un grupo sin auto

def EventoLLegadaGrupo(vectorEstado, i):
    # TODO verificar: trabajo con una copia del vector anterior, ver cual es el anterior
    # vectorEstado[i] = deepcopy(vectorEstado[j])

    # calcula la nueva llegada
    vectorEstado[i].RND_llgrupo = float("{:.2f}".format(random.random()))
    while vectorEstado[i].RND_llgrupo == 1:
        vectorEstado[i].RND_llgrupo = float("{:.2f}".format(random.random()))
    vectorEstado[i].Tiempo_llgrupo = -(d.mediallgrupoSinAuto * log(1 - vectorEstado[i].RND_llgrupo))
    vectorEstado[i].HoraLL_llgrupo = vectorEstado[i].Tiempo_llgrupo + vectorEstado[i].reloj
    # Calcular la cantidad y la intencion
    vectorEstado[i].RND_cantidad = float("{:.2f}".format(random.random()))
    vectorEstado[i].Cantidad = int(1 + (vectorEstado[i].RND_cantidad * (4 - 1)))
    vectorEstado[i].RND_intencion = float("{:.2f}".format(random.random()))

    estado = ""
    # fila anterior
    j = 0
    if i == 0:
        j = 1
    #
    if vectorEstado[i].RND_intencion < 0.60:
        vectorEstado[i].intencion = 'ParaComprar'
        # en el caso que uno de los 6 servidores este libre
        cajas = [vectorEstado[j].CajaEntradas1, vectorEstado[j].CajaEntradas2, vectorEstado[j].CajaEntradas3,
                 vectorEstado[j].CajaEntradas4, vectorEstado[j].CajaEntradas5, vectorEstado[j].CajaEntradas6]
        indice = encontrar_indice(cajas, 'Libre')
        if indice != -1:
            # setear el valor del RND cobro entrada , tiempo cobro entrada y hora de finalizacion del cobro entrada
            # los random te pueden dar 1 --> dan error de dominio en la funcion exponencial
            vectorEstado[i].RND_CobrEntr = float("{:.2f}".format(random.random()))
            while vectorEstado[i].RND_CobrEntr == 1:
                vectorEstado[i].RND_CobrEntr = float("{:.2f}".format(random.random()))
            vectorEstado[i].tiempo_CobroEntr = (-d.mediafinCobroEntrada) * log(1 - vectorEstado[i].RND_CobrEntr)
            valor = vectorEstado[i].tiempo_CobroEntr + vectorEstado[i].reloj
            setattr(vectorEstado[i], f"horaFin_CobroEntr{indice + 1}", valor)
            # setear el valor del servidor a ocupado
            setattr(vectorEstado[i], f"CajaEntradas{indice + 1}", 'Ocupado')
            estado = f"EnCajaEntrada{indice + 1}"
        # en el caso que el servidor esa ocupado
        else:
            # elige la cola mas chica y se pone ahi y cambia su propio estado
            x = [vectorEstado[j].ColaEntrada1, vectorEstado[j].ColaEntrada2, vectorEstado[j].ColaEntrada3]
            menor = min(variable for variable in x)
            indice2 = encontrar_indice(x, menor)
            valor = getattr(vectorEstado[i], f"ColaEntrada{indice2 + 1}") + 1
            setattr(vectorEstado[i], f"ColaEntrada{indice2 + 1}", valor)
            estado = f"EnColaCajaEntrada{indice2 + 1}"



    # si la intencion es ya comprada --> se dirige al control de entrada
    else:
        vectorEstado[i].intencion = 'YaComprada'
        # en el caso que el servidor esta libre
        cajas = [vectorEstado[j].CajaControlEntradas1, vectorEstado[j].CajaControlEntradas2]
        indice = encontrar_indice(cajas, 'Libre')
        if indice != -1:
            # setear el valor de hora fin control entrada
            valor = d.finControlEntradas + vectorEstado[i].reloj
            setattr(vectorEstado[i], f"horaFin_ControlEntr{indice + 1}", valor)
            # setear el valor del servidor a ocupado
            setattr(vectorEstado[i], f"CajaControlEntradas{indice + 1}", 'Ocupado')
            estado = f"EnControlEntrada{indice + 1}"
            #Agregamos en una lista con objetos combinados para el control de entrada
            grupoSinAuto1 = grupoSinAuto(estado, vectorEstado[i].reloj, vectorEstado[i].Cantidad)
            vectorEstado[i].listaColaControlEntrada.append(grupoSinAuto1)
        # en el caso que el servidor esa ocupado
        else:
            x = [vectorEstado[j].ColaControlEntradas1, vectorEstado[j].ColaControlEntradas2]
            menor = min(variable for variable in x)
            indice2 = encontrar_indice(x, menor)
            valor = getattr(vectorEstado[i], f"ColaControlEntradas{indice2 + 1}") + 1
            setattr(vectorEstado[i], f"ColaControlEntradas{indice2 + 1}", valor)
            estado = f"EnColaControlEntradas{indice2+1}"
            #Agregamos en una lista con objetos combinados para el control de entrada
            grupoSinAuto1 = grupoSinAuto(estado, vectorEstado[i].reloj, vectorEstado[i].Cantidad)
            vectorEstado[i].listaColaControlEntrada.append(grupoSinAuto1)
            
    # agregar objeto
    # para mostrarlo en la tabla, pregunto si hay lugares libres para guardar en la tabla
    # agregamos un objeto tipo auto
    grupoSinAuto1 = grupoSinAuto(estado, vectorEstado[i].reloj, vectorEstado[i].Cantidad)
    vectorEstado[i].oGrupoSinAuto.append(grupoSinAuto1)
    # fin
    return vectorEstado

    # aca deberiamos anular o setear en 0 todo lo que no queremos que se muestre
    # seteamos todo lo que hay que arrastrar hacia abajo


def HoraFinCobroEstacionamiento(vectorEstado, i, indice):
    # fila anterior
    j = 0
    if i == 0:
        j = 1
    # TODO verificar: trabajo con una copia del vector anterior, ver cual es el anterior
    # vectorEstado[i] = deepcopy(vectorEstado[j])
    
    # pisamos el tiempo fin del evento
    setattr(vectorEstado[i], f"horaFin_fCobroEstacionamiento{indice}", 0)
    # Borramos el objeto atendido
    # el menor y que este atendido en caja
    #primero buscamos la hora a la que llego y despues lo borramos
    horallegada = 0
    for h in range(len(vectorEstado[i].oVehiculo)):
        if vectorEstado[i].oVehiculo[h].estado == f"EnCajaEstacionamiento{indice}":
            horallegada = vectorEstado[i].oVehiculo[h].horallegada
            del vectorEstado[i].oVehiculo[h]
            break

    # consultar si hay alguien en la cola --> hay una sola fila de estacionamiento
    # en el caso que sea mayor a 0 generamos un nuevo fin cobro estacionamiento
    if vectorEstado[j].ColaEstacionamiento > 0:
        # setear el valor del RND cobro estacionamiento , tiempo cobro estacionamiento y hora de finalizacion del cobro estacionamiento
        vectorEstado[i].RND_fCobroEstacionamiento = float("{:.2f}".format(random.random()))
        while vectorEstado[i].RND_fCobroEstacionamiento == 1:
            vectorEstado[i].RND_fCobroEstacionamiento = float("{:.2f}".format(random.random()))
        vectorEstado[i].tiempo_fCobroEstacionamiento = -d.mediafinCobroEntrada * log(
            1 - vectorEstado[j].RND_fCobroEstacionamiento)
        valor = vectorEstado[i].tiempo_fCobroEstacionamiento + vectorEstado[i].reloj
        setattr(vectorEstado[i], f"horaFin_fCobroEstacionamiento{indice}", valor)
        # setear el valor del servidor a ocupado
        setattr(vectorEstado[i], f"CajaEstacionamiento{indice}", 'Ocupado')
        vectorEstado[i].ColaEstacionamiento -= 1
        # seteamos el estado del objeto nuevo
        estadoVehiculo = f"EnCajaEstacionamiento{indice}"
        ind = -1
        for k in range (len(vectorEstado[i].oVehiculo)):
            if vectorEstado[i].oVehiculo[k].estado == "EnColaCajaEstacionamiento":
                ind = k
                break
        if ind != -1:
            vectorEstado[i].oVehiculo[ind].estado = estadoVehiculo
        else:
            print('problemitaaaaaaaaaaaa')
    else:
        # seteamos el servidor en libre
        setattr(vectorEstado[i], f"CajaEstacionamiento{indice}", 'Libre')

    # Calcular la cantidad y la intencion --> pasan de ser un auto a ser un grupo de personas con auto
    vectorEstado[i].RND_cant = float("{:.2f}".format(random.random()))
    vectorEstado[i].cant = int(1 + (vectorEstado[i].RND_cant * (3 - 1)))
    vectorEstado[i].RND_inte = float("{:.2f}".format(random.random()))
    # si la intencion es para comprar
    horallegadaColaEntrada = vectorEstado[i].reloj  # ----------------------->guardamos el dato
    if vectorEstado[i].RND_intencion < 0.60:
        vectorEstado[i].inte = 'ParaComprar'
        # en el caso que uno de los 6 servidores este libre
        cajas = [vectorEstado[j].CajaEntradas1, vectorEstado[j].CajaEntradas2, vectorEstado[j].CajaEntradas3,
                 vectorEstado[j].CajaEntradas4, vectorEstado[j].CajaEntradas5, vectorEstado[j].CajaEntradas6]
        indiceServidores = encontrar_indice(cajas, 'Libre')
        if indiceServidores != -1:
            # setear el valor del RND cobro entrada , tiempo cobro entrada y hora de finalizacion del cobro entrada
            vectorEstado[i].RND_CobrEntr = float("{:.2f}".format(random.random()))
            while vectorEstado[i].RND_CobrEntr == 1:
                vectorEstado[i].RND_CobrEntr = float("{:.2f}".format(random.random()))
            vectorEstado[i].tiempo_CobroEntr = -d.mediafinCobroEntrada * log(1 - vectorEstado[i].RND_CobrEntr)
            valor = vectorEstado[i].tiempo_CobroEntr + vectorEstado[
                i].reloj + 5  # -------------------->le sumo 5 para de lo que tarda en llegar a la fila
            setattr(vectorEstado[i], f"horaFin_CobroEntr{indiceServidores + 1}", valor)
            # setear el valor del servidor a ocupado
            setattr(vectorEstado[i], f"CajaEntradas{indiceServidores + 1}", 'Ocupado')
            estado = f"EnCajaEntrada{indiceServidores + 1}"
        # en el caso que el servidor esa ocupado
        else:
            # elige la cola mas chica y se pone ahi y cambia su propio estado
            x = [vectorEstado[j].ColaEntrada1, vectorEstado[j].ColaEntrada2, vectorEstado[j].ColaEntrada3]
            menor = min(variable for variable in x)
            indiceColas = encontrar_indice(x, menor)
            valor = getattr(vectorEstado[i], f"ColaEntrada{indiceColas + 1}") + 1
            setattr(vectorEstado[i], f"ColaEntrada{indiceColas + 1}", valor)
            estado = f"EnColaCajaEntrada{indiceColas + 1}"

    # si la intencion es ya comprada --> se dirige al control de entrada
    else:
        vectorEstado[i].int = 'YaComprada'
        # en el caso que el servidor esta libre
        cajas = [vectorEstado[j].CajaControlEntradas1, vectorEstado[j].CajaControlEntradas2]
        indiceControl = encontrar_indice(cajas, 'Libre')
        if indiceControl != -1:
            # setear el valor de hora fin control entrada
            valor = d.finControlEntradas + vectorEstado[i].reloj
            setattr(vectorEstado[i], f"horaFin_ControlEntr{indiceControl + 1}", valor)
            # setear el valor del servidor a ocupado
            setattr(vectorEstado[i], f"CajaControlEntradas{indiceControl + 1}", 'Ocupado')
            estado = f"EnControlEntrada{indiceControl + 1}"
            horallegadaColaEntrada = 0
            grupoSinAuto1 = grupoConAuto(estado, horallegada, horallegadaColaEntrada, vectorEstado[i].Cantidad)
            vectorEstado[i].listaColaControlEntrada.append(grupoSinAuto1)
        # en el caso que el servidor esa ocupado
        else:
            x = [vectorEstado[j].ColaControlEntradas1, vectorEstado[j].ColaControlEntradas2]
            menor = min(variable for variable in x)
            indice2 = encontrar_indice(x, menor)
            valor = getattr(vectorEstado[i], f"ColaControlEntradas{indice2 + 1}") + 1
            setattr(vectorEstado[i], f"ColaControlEntradas{indice2 + 1}", valor)
            estado = f"EnColaControlEntradas{indice2+1}"
            horallegadaColaEntrada = 0
            grupoSinAuto1 = grupoConAuto(estado, horallegada, horallegadaColaEntrada, vectorEstado[i].Cantidad)
            vectorEstado[i].listaColaControlEntrada.append(grupoSinAuto1)
    # agregar objeto
    # para mostrarlo en la tabla, pregunto si hay lugares libres para guardar en la tabla

    # agregamos un objeto tipo grupo con auto
    # buscamos el vehiculo con menor tiempo de llegada:
    #x = vectorEstado[i].oVehiculo
    #lista = [variable.estado for variable in x]
    #indice2 = encontrar_obj_evento(x, f'EnCajaEstacionamiento{indice}')
    #vectorEstado[i].oVehiculo[indice2].horallegada

    #agregamos el nuevo objeto a la lista
    grupoConAuto1 = grupoConAuto(estado, horallegada, horallegadaColaEntrada, vectorEstado[i].cant)
    vectorEstado[i].oGrupoConAuto.append(grupoConAuto1)

    #del vectorEstado[i].oVehiculo[indice2]
    return vectorEstado
    # -------------- jere
    # aca deberiamos anular o setear en 0 todo lo que no queremos que se muestre
    # seteamos todo lo que hay que arrastrar hacia abajo

def encontrar_obj_evento(lista, nombre):
    sublista = []
    for i in lista: #estado / horallegada / etcc
        sublista.append(i.estado)
    for i in sublista:
        try:
            indice = sublista.index(nombre)
            return indice
        except ValueError:
            return -1

def encontrar_indice_objeto(lista, valor):
    minilista = []
    for i in lista:
        # objetos to lista:
        minilista.append(i.horallegada)
    for i in minilista:
        try:
            # vectorEstado[i].oGrupoConAuto[num].horallegada
            indice = minilista.index(valor)
            return indice
        except ValueError:
            return -1  # Si el valor no se encuentra en la lista, se devuelve -1

def encontrar_indice_objeto_deteccion(vectorEstado, menor, i):
    for k in range(len(vectorEstado[i].oPersona)):
        if vectorEstado[i].oPersona[k].estado == 'EnColaDeteccion' and vectorEstado[i].oPersona[k].horallegada == menor:
            return k
    return -1
    

def HoraFinControlEntradas(vectorEstado, i, indice):
    # si la intencion es para comprar
    j = 0
    estadoGrupo = ""
    # fila anterior
    if i == 0:
        j = 1
    # TODO verificar: trabajo con una copia del vector anterior, ver cual es el anterior
    # vectorEstado[i] = deepcopy(vectorEstado[j])

    # preguntar cual es la hora fin de que control entrada 1 2, como es fijo nos fijamos la hora
    # y preguntar a que obj (grupo) corresponde al control de ahora
    """
    mnor, iControl = menorTiempoControl(vectorEstado, i)
    for num in range(len(vectorEstado[i].oGrupoSinAuto)):
        if vectorEstado[i].oGrupoSinAuto[num].estado == f'EnControlEntrada{iControl}':
            del (vectorEstado[i].oGrupoSinAuto[num])
            break
    for num in range(len(vectorEstado[i].oGrupoConAuto)):
        if vectorEstado[i].oGrupoConAuto[num].estado == f'EnControlEntrada{iControl}':
            del (vectorEstado[i].oGrupoConAuto[num])
            break
    # -------------- jere
    """

    # pisamos el dato
    setattr(vectorEstado[i], f"horaFin_ControlEntr{indice}", 0)

    # verificamos que la cola no este vacia
    if getattr(vectorEstado[i], f"ColaControlEntradas{indice}") > 0:  # la cola no esta vacia --> generamos un nuevo fin
        # setear el valor de la hora de finalizacion del cobro entrada
        valor = d.finControlEntradas + vectorEstado[i].reloj  # --> reloj + 0.25
        setattr(vectorEstado[i], f"horaFin_ControlEntr{indice}", valor)
        # setear el valor del servidor a ocupado
        setattr(vectorEstado[i], f"CajaControlEntradas{indice}", 'Ocupado')
        estadoGrupo = f"EnControlEntrada{indice}"
        valor = getattr(vectorEstado[i], f"ColaControlEntradas{indice}") - 1
        setattr(vectorEstado[i], f"ColaControlEntradas{indice}", valor)
        band = False
        flag = True
        for h in range(len(vectorEstado[i].listaColaControlEntrada)):
            if vectorEstado[i].listaColaControlEntrada[h].estado == f"EnColaControlEntradas{indice}":
                horallegada = vectorEstado[i].listaColaControlEntrada[h].horallegada
                vectorEstado[i].listaColaControlEntrada[h].estado = estadoGrupo
                band = True
                break
        if band:
            for k in range(len(vectorEstado[i].oGrupoConAuto)):
                if vectorEstado[i].oGrupoConAuto[k].horallegada == horallegada:
                    vectorEstado[i].oGrupoConAuto[k].estado = estadoGrupo
                    flag = False
                    break
            if flag:
                for k in range(len(vectorEstado[i].oGrupoSinAuto)):
                    if vectorEstado[i].oGrupoSinAuto[k].horallegada == horallegada:
                        vectorEstado[i].oGrupoSinAuto[k].estado = estadoGrupo
                        flag = False
                        break
    else:  # la cola esta vacia --> ponemos al servidor en estado libre
        setattr(vectorEstado[i], f"CajaControlEntradas{indice}", 'Libre')

    # mandamos al las PERSONAS al detector de comidas y bebidas --> transformar grupos a personas
    # buscamos al grupo que este en estado Control Entrada y con el Menor Tiempo

    #funcion nueva con la fila de objetos mixtos ---> borra objetos que estan en control entrada
    flag1 = True
    flag2 = False
    horallegada = 0
    CantPersonas = 0
    for k in range(len(vectorEstado[i].listaColaControlEntrada)):
        if vectorEstado[i].listaColaControlEntrada[k].estado == f'EnControlEntrada{indice}': # encontramos el obj que se encuentra finalizado
            CantPersonas = vectorEstado[i].listaColaControlEntrada[k].cantidad
            horallegada = vectorEstado[i].listaColaControlEntrada[k].horallegada
            del vectorEstado[i].listaColaControlEntrada[k]
            flag2 = True
            break
            #ahora buscamos el objeto en las listas (con y/o sin auto) y lo borramos
    if flag2:
        for k in range(len(vectorEstado[i].oGrupoConAuto)):
            if vectorEstado[i].oGrupoConAuto[k].horallegada == horallegada:
                del vectorEstado[i].oGrupoConAuto[k]
                flag1 = False
                break
    if flag1 and flag2:
        for k in range(len(vectorEstado[i].oGrupoSinAuto)):
            if vectorEstado[i].oGrupoSinAuto[k].horallegada == horallegada:
                del vectorEstado[i].oGrupoSinAuto[k]
                break
        """        
    x = vectorEstado[i].oGrupoConAuto
    indice1 = -1
    indice2 = -1
    horallegada = 0
    CantPersonas = 0
    x = vectorEstado[i].oGrupoConAuto
    if len(x) != 0:
        try:
            menor1 = min(variable.horallegada for variable in x if variable.estado == f'EnControlEntrada{indice}')
        except ValueError:
            menor1 = -1
        indice1 = encontrar_indice_objeto(x, menor1)
    # puede ser que sea un grupo con auto o sin auto --> verificamos con los dos
    k = vectorEstado[i].oGrupoSinAuto
    if len(k) != 0:
        try:
            menor2 = min(variable.horallegada for variable in k if variable.estado == f'EnControlEntrada{indice}')
        except ValueError:
            menor2 = -1
        indice2 = encontrar_indice_objeto(k, menor2)
    if indice1 != -1:
        if indice2 != -1:
            valor = min(vectorEstado[i].oGrupoConAuto[indice1].horallegada,
                        vectorEstado[i].oGrupoSinAuto[indice2].horallegada)
            if valor == menor1:
                indiceCorrecto = indice1
                CantPersonas = vectorEstado[i].oGrupoConAuto[indiceCorrecto].cantidad
                horallegada = vectorEstado[i].oGrupoConAuto[indiceCorrecto].horallegada
                del vectorEstado[i].oGrupoConAuto[indiceCorrecto]
                ind = 0
                for k in range(len(vectorEstado[i].oGrupoConAuto)):
                    if vectorEstado[i].oGrupoConAuto[k].estado == f"EnColaControlEntrada{indice}":
                        ind1 = k
                        break
                for h in range(len(vectorEstado[i].oGrupoSinAuto)):
                    if vectorEstado[i].oGrupoSinAuto[h].estado == f"EnColaControlEntrada{indice}":
                        ind2 = h
                        break
                menor = min(vectorEstado[i].oGrupoConAuto[ind].horallegada)
                setattr(vectorEstado[i], vectorEstado[i].oGrupoConAuto[ind].estado, estadoGrupo)
            else:
                indiceCorrecto = indice2
                CantPersonas = vectorEstado[i].oGrupoSinAuto[indiceCorrecto].cantidad
                horallegada = vectorEstado[i].oGrupoSinAuto[indiceCorrecto].horallegada
                del vectorEstado[i].oGrupoSinAuto[indiceCorrecto]
                ind = -1
                for k in range(len(vectorEstado[i].oGrupoSinAuto)):
                    if vectorEstado[i].oGrupoSinAuto[k].estado == f"EnColaControlEntrada{indice}":
                        ind = k
                        break
                if ind != -1:
                    setattr(vectorEstado[i], vectorEstado[i].oGrupoSinAuto[ind].estado, estadoGrupo)
        else:
            CantPersonas = vectorEstado[i].oGrupoConAuto[indice1].cantidad
            horallegada = vectorEstado[i].oGrupoConAuto[indice1].horallegada
    else:
        if indice2 != -1:
            CantPersonas = vectorEstado[i].oGrupoSinAuto[indice2].cantidad
            horallegada = vectorEstado[i].oGrupoSinAuto[indice2].horallegada
        else:
            t = 0
    """

    # mandamos la personas a los DETECTORES
    # verificamos que alguno de los detectores este libre
    detectores = [vectorEstado[j].Detector1, vectorEstado[j].Detector2, vectorEstado[j].Detector3, vectorEstado[j].Detector4]
    indice3 = encontrar_indice(detectores, 'Libre')
    CantServLibres = detectores.count('Libre')
    # si hay alguno libre
    restante = 0
    if indice3 != -1:
        if CantServLibres <= CantPersonas:
            atributo = CantServLibres
            # las demas personas que estaban en el grupo van a la cola
            restante = CantPersonas - CantServLibres
            vectorEstado[i].ColaDetector += restante
            # print (atributo)
        else:
            atributo = CantPersonas

            # print(atributo)

        # cantidad de personas que van a los servidores, seteando los servidores a ocupado y creando personas en Deteccion
        for num in range(atributo):
            # print (num)
            indice4 = encontrar_indice(detectores, 'Libre')
            # setear el valor de hora fin control entrada
            valor = d.finDeteccion + vectorEstado[i].reloj
            setattr(vectorEstado[i], f"HoraFin_Detec{indice4 + 1}", valor)
            # setear el valor del servidor a ocupado
            detectores[indice4] = 'Ocupado'
            setattr(vectorEstado[i], f"Detector{indice4 + 1}", 'Ocupado')
            estadoPersona = f"EnDeteccion{indice4 + 1}"  # estado de la persona

            # generamos personas
            persona1 = persona(estadoPersona, horallegada)
            vectorEstado[i].oPersona.append(persona1)
        # creamos las personas restantes y las mandamos a la cola
        if restante != 0:
            #vectorEstado[i].ColaDetector += restante
            estadoPersona = 'EnColaDeteccion'
            for num in range(restante):
                persona1 = persona(estadoPersona, horallegada)
                vectorEstado[i].oPersona.append(persona1)
            # TODO ACUMULADORES Y ESTADISTICAS

    # en el caso que el servidor esa ocupado
    else:
        # mandamos a la cola la totalidad de las personas
        vectorEstado[i].ColaDetector += CantPersonas
        estadoPersona = "EnColaDeteccion"  # estado de la persona
        for num in range(CantPersonas):
            # generamos personas
            persona1 = persona(estadoPersona, horallegada)
            vectorEstado[i].oPersona.append(persona1)
            # TODO ACUMULADORES Y ESTADISTICAS
    return vectorEstado


def HoraFinCobroEntradas(vectorEstado, i, indice):
    # fila anterior
    j = 0
    if i == 0:
        j = 1
    indiceCorrecto = 0
    # pisamos el dato
    setattr(vectorEstado[i], f"horaFin_CobroEntr{indice}", 0)

    # preguntar si hay cola para poner a trabar el servidor con "indice"
    # para cada servidor (1,2) preguntar a la cola 1 - (3,4) cola 2 - (5,6) cola 3
    # al q corresponda (con el indice) definirle un nuevo horaFin y descontarle 1 a la cola :)

    # verificamos que la cola no este vacia

    # ----------- esto es para saber a que cola/servidor corresponde --------
    if indice < 2:  # si el indice es 0 o 1, corresponde a cola 1
        indiceCorrecto = 1
    elif indice < 4 and indice < 1:  # si el indice es 2 o 3, corresponde a cola 2
        indiceCorrecto = 2
    else:  # si el indice es 4 o 5, corresponde a cola 3
        indiceCorrecto = 3

    # buscamos el objeto para saber si es grupo con auto o grupo sin auto --> en caso de ser con auto le sumamos +5 al valor de hora fin cobro
    indice1 = -1
    adicionar = 0
    x = vectorEstado[i].oGrupoConAuto
    if len(x) != 0:
        try:
            menor1 = min(
                variable.horallegada for variable in x if variable.estado == f'EnColaCajaEntrada{indiceCorrecto}')
        except ValueError:
            menor1 = -1
        indice1 = encontrar_indice_objeto(x, menor1)
    if indice1 != -1:
        adicionar = 5
        busqueda = vectorEstado[i].oGrupoConAuto
    else:
        adicionar = 0
        busqueda = vectorEstado[i].oGrupoSinAuto

    if getattr(vectorEstado[i], f"ColaEntrada{indiceCorrecto}") > 0:  # la cola no esta vacia --> generamos un nuevo fin
        # setear el valor de la hora de finalizacion del cobro entrada
        vectorEstado[i].RND_CobrEntr = float("{:.2f}".format(random.random()))
        while vectorEstado[i].RND_CobrEntr == 1:
            vectorEstado[i].RND_CobrEntr = float("{:.2f}".format(random.random()))
        vectorEstado[i].tiempo_CobroEntr = -d.mediafinCobroEntrada * log(1 - vectorEstado[j].RND_CobrEntr)
        valor = vectorEstado[i].tiempo_CobroEntr + vectorEstado[i].reloj + adicionar
        setattr(vectorEstado[i], f"horaFin_CobroEntr{indice}", valor)
        # setear el valor del servidor a ocupado
        setattr(vectorEstado[i], f"CajaEntrada{indiceCorrecto}", 'Ocupado')
        estadoGrupo = f"EnCajaEntrada{indice}"
        valor = getattr(vectorEstado[i], f"ColaEntrada{indiceCorrecto}") - 1
        setattr(vectorEstado[i], f"ColaEntrada{indiceCorrecto}", valor)
        # setea el estado del objeto
        indice1 = -1
        x = busqueda
        if len(x) != 0:
            try:
                menor1 = min(
                    variable.horallegada for variable in x if variable.estado == f'EnColaCajaEntrada{indiceCorrecto}')
            except ValueError:
                menor1 = -1
            indice1 = encontrar_indice_objeto(x, menor1)
        if indice1 != -1:
            x[indice1].estado = estadoGrupo
        else:
            t = 0
    else:  # la cola esta vacia --> ponemos al servidor en estado libre
        setattr(vectorEstado[i], f"CajaEntradas{indice}", 'Libre')

    # ----------------------------------------------------------------------------------------

    # mandamos a Control de entrada al grupo
    # en el caso que uno de los 2 servidores este libre
    cajas = [vectorEstado[j].CajaControlEntradas1, vectorEstado[j].CajaControlEntradas2]
    indiceServidores = encontrar_indice(cajas, 'Libre')
    if indiceServidores != -1:
        # setear el valor del RND cobro entrada , tiempo cobro entrada y hora de finalizacion del cobro entrada
        valor = d.finControlEntradas + vectorEstado[i].reloj
        setattr(vectorEstado[i], f"horaFin_ControlEntr{indiceServidores + 1}", valor)
        # setear el valor del servidor a ocupado
        setattr(vectorEstado[i], f"CajaControlEntradas{indiceServidores + 1}", 'Ocupado')
        estado = f"EnControlEntrada{indiceServidores + 1}"
    # en el caso que el servidor esa ocupado
    else:
        # elige la cola mas chica y se pone ahi y cambia su propio estado
        x = [vectorEstado[j].ColaControlEntradas1, vectorEstado[j].ColaControlEntradas2]
        menor = min(variable for variable in x)
        indiceColas = encontrar_indice(x, menor)
        valor = getattr(vectorEstado[i], f"ColaControlEntradas{indiceColas + 1}") + 1
        setattr(vectorEstado[i], f"ColaControlEntradas{indiceColas + 1}", valor)
        estado = f"EnColaControlEntradas{indiceColas + 1}"

    # buscamos el objeto para cambiarle el estado
    indice1 = -1
    indice2 = -1
    tiemp = 0
    # x = [vectorEstado[i].oGrupoConAuto[num].horallegada for num in vectorEstado[i].oGrupoConAuto]
    x = vectorEstado[i].oGrupoConAuto
    if len(x) != 0:
        try:
            menor1 = min(variable.horallegada for variable in x if variable.estado == f'EnCajaEntrada{indice}')
        except ValueError:
            menor1 = -1
        indice1 = encontrar_indice_objeto(x, menor1)
    # puede ser que sea un grupo con auto o sin auto --> verificamos con los dos
    k = vectorEstado[i].oGrupoSinAuto
    if len(k) != 0:
        try:
            menor2 = min(variable.horallegada for variable in k if variable.estado == f'EnCajaEntrada{indice}')
        except ValueError:
            menor2 = -1
        indice2 = encontrar_indice_objeto(k, menor2)
    if indice1 != -1:
        if indice2 != -1:
            valor = min(vectorEstado[i].oGrupoConAuto[indice1].cantidad,
                        vectorEstado[i].oGrupoSinAuto[indice2].cantidad)
            if valor == menor1:
                indiceCorrecto = indice1
                vectorEstado[i].oGrupoConAuto[indiceCorrecto].estado = estado
                tiemp = vectorEstado[i].oGrupoConAuto[indiceCorrecto].hora_llegColaEntrada
                vectorEstado[i].listaColaControlEntrada.append(vectorEstado[i].oGrupoConAuto[indiceCorrecto])
            else:
                indiceCorrecto = indice2
                vectorEstado[i].oGrupoSinAuto[indice2].estado = estado
                tiemp = 0
                vectorEstado[i].listaColaControlEntrada.append(vectorEstado[i].oGrupoSinAuto[indiceCorrecto])
        else:
            vectorEstado[i].oGrupoConAuto[indice1].estado = estado
            tiemp = vectorEstado[i].oGrupoConAuto[indice1].hora_llegColaEntrada
            vectorEstado[i].listaColaControlEntrada.append(vectorEstado[i].oGrupoConAuto[indice1])
    else:
        if indice2 != -1:
            vectorEstado[i].oGrupoSinAuto[indice2].estado = estado
            tiemp = 0
            vectorEstado[i].listaColaControlEntrada.append(vectorEstado[i].oGrupoSinAuto[indice2])
        else:
            t = 0

    # -------------------------Acumuladores-----------------
    # calculamos el tiempo de permanencia en cola para todos los objetos (con auto y sin auto)
    if tiemp != 0:
        vectorEstado[i].tiempoHastaComprarEntrada += vectorEstado[i].reloj - tiemp #--> tiemp es el tiempo de llegada del obj que termina de comprar
        vectorEstado[i].clienteEntradaColaXTiempo += 1 #---> Contador de la cantidad de gente que compro la entrada
    # -------------------------Estadisticas---------------------
    if vectorEstado[i].clienteEntradaColaXTiempo > 0:
        vectorEstado[i].tiempoPromedioEntrada = vectorEstado[i].tiempoHastaComprarEntrada / vectorEstado[i].clienteEntradaColaXTiempo
    # cantidad de personas en la cola por el tiempo que estubieron / reloj

    colaTotal = vectorEstado[j].ColaEntrada1 + vectorEstado[j].ColaEntrada2 + vectorEstado[j].ColaEntrada3
    vectorEstado[i].cantidadPromedioCola = (colaTotal*(vectorEstado[i].reloj - vectorEstado[j].reloj)) + vectorEstado[j].cantidadPromedioCola
    return vectorEstado




def HoraFinDeteccion(vectorEstado, i, indice):
    # metricas
    acumuladorPersonas = 0

    # pisamos el dato
    setattr(vectorEstado[i], f"HoraFin_Detec{indice}", 0)

    # fila anterior (no se usa)
    # j = 0
    # if i == 0:
    #     j = 1
    # --------------------------Acumuladores----------------------------------------
    # calculamos el menor para las estadisticas antes que el jere lo borre
    indiceMenor = None
    for k in range(len(vectorEstado[i].oPersona)):
        if vectorEstado[i].oPersona[k].estado == f"EnDeteccion{indice}":
            indiceMenor = k
            break
    # acumulamos la cantidad de tiempo que tardo cada persona desde que llego
    try:
        
        # menor = min(variable.horallegada for variable in vectorEstado[i].oPersona if variable.estado == f"EnDeteccion{indice}")
        # ind = encontrar_indice_objeto(vectorEstado[i].oPersona, menor)
        # detectores = [vectorEstado[i].Detector1, vectorEstado[i].Detector2, vectorEstado[i].Detector3, vectorEstado[i].Detector4]
        # if vectorEstado[i].Detector1 == 'Ocupado' and vectorEstado[i].Detector2 == 'Ocupado' and vectorEstado[i].Detector3 == 'Ocupado' and vectorEstado[i].Detector4 == 'Ocupado' and vectorEstado[i].ColaDetector != 0:
        #     #print('hay 4 ocupados señor justiciaaaaaa')
        #     pass
        vectorEstado[i].tiempoPermanencia += vectorEstado[i].reloj - vectorEstado[i].oPersona[indiceMenor].horallegada
        del vectorEstado[i].oPersona[indiceMenor]
    except:
        # pdb.post_mortem()
        print("no se borro el encontrado :(")
    # -----------------------------------------------------------------------------------
    # preguntar a todos 4 cual es la menor hora fin -> tenemos el manoseador de ahora
    # y preguntar a todos los obj cual es atendido por el de ahora
    # -------------- jere

    #setattr(vectorEstado[i], f"Detector{indice}", "Libre")

    # #eliminamos los datos que estan repetidos
    # # consultamos si hay mas datos en la misma fila que terminen al mismo tiempo --> puede pasar gente en simultaneo
    # for k in range(1, 5):
    #     if getattr(vectorEstado[i], f"HoraFin_Detec{k}") == vectorEstado[i].reloj:
    #         # pisamos el dato
    #         setattr(vectorEstado[i], f"HoraFin_Detec{k}", 0)
    #         #eliminamos el objeto
    #         for h in range(len(vectorEstado[i].oPersona)):
    #             if vectorEstado[i].oPersona[h].estado == f"EnDeteccion{k}":
    #                 indiceMenor = h
    #                 setattr(vectorEstado[i], f"HoraFin_Detec{k}", 0)
    #                 setattr(vectorEstado[i], f"Detector{k}", "Libre")
    #                 del vectorEstado[i].oPersona[indiceMenor]
    #                 break
    # #consultamos si hay personas en la cola
    # if vectorEstado[i].ColaDetector > 0:  # la cola no esta vacia --> generamos un nuevo fin
    #     #generamos un vector con los servidores libres
    #     detectores = [vectorEstado[j].Detector1, vectorEstado[j].Detector2, vectorEstado[j].Detector3, vectorEstado[j].Detector4]
    #     indice3 = encontrar_indice(detectores, 'Libre')
    #     CantServLibres = detectores.count('Libre')
        

    #---------------------------------------------------------------------------------------- espacio para ivan
    # consultamos la cola --> es cola unica
    
    if vectorEstado[i].ColaDetector > 0:  # la cola no esta vacia --> generamos un nuevo fin
        # setear el valor de la hora de finalizacion del cobro entrada
        valor = d.finDeteccion + vectorEstado[i].reloj
        setattr(vectorEstado[i], f"HoraFin_Detec{indice}", valor)
        # setear el valor del servidor a ocupado
        setattr(vectorEstado[i], f"Detector{indice}", 'Ocupado')
        estadoPersona = f"EnDeteccion{indice}"
        menor = min(variable.horallegada for variable in vectorEstado[i].oPersona if variable.estado == "EnColaDeteccion")
        ind = encontrar_indice_objeto_deteccion(vectorEstado, menor, i)
        vectorEstado[i].oPersona[ind].estado = estadoPersona
        # sacamos a una persona de la cola de deteccion
        vectorEstado[i].ColaDetector -= 1
        #borramos la persona

    else:  # la cola esta vacia --> ponemos al servidor en estado libre
        setattr(vectorEstado[i], f"Detector{indice}", 'Libre')
    acumuladorPersonas += 1

    # consultamos si hay mas datos en la misma fila que terminen al mismo tiempo --> puede pasar gente en simultaneo
    """for k in range(1, 5):
        if getattr(vectorEstado[i], f"HoraFin_Detec{k}") == vectorEstado[i].reloj:
            # pisamos el dato
            setattr(vectorEstado[i], f"HoraFin_Detec{k}", 0)
            #eliminamos el objeto
            for h in range(len(vectorEstado[i].oPersona)):
                if vectorEstado[i].oPersona[h].estado == f"EnDeteccion{k}":
                    indiceMenor = h
                    del vectorEstado[i].oPersona[indiceMenor]
                    break

            if vectorEstado[i].ColaDetector > 0:  # la cola no esta vacia --> generamos un nuevo fin
                # setear el valor de la hora de finalizacion del cobro entrada
                valor = d.finDeteccion + vectorEstado[i].reloj
                setattr(vectorEstado[i], f"HoraFin_Detec{k}", valor)
                # setear el valor del servidor a ocupado
                setattr(vectorEstado[i], f"Detector{k}", 'Ocupado')
                estadoPersona = f"EnDeteccion{k}"
                mnor = min(variable.horallegada for variable in vectorEstado[i].oPersona if variable.estado == "EnColaDeteccion")
                ind = encontrar_indice_objeto(vectorEstado[i].oPersona, mnor)
                vectorEstado[i].oPersona[ind].estado = estadoPersona
                # sacamos a una persona de la cola de deteccion
                vectorEstado[i].ColaDetector -= 1
                
                #cambiamos los datos de los objetos
                valor = d.finDeteccion + vectorEstado[i].reloj
                setattr(vectorEstado[i], f"HoraFin_Detec{k}", valor)
                # setear el valor del servidor a ocupado
                setattr(vectorEstado[i], f"Detector{k}", 'Ocupado')
                estadoPersona = f"EnDeteccion{k}"
                mnor = min(variable.horallegada for variable in vectorEstado[i].oPersona if variable.estado == "EnColaDeteccion")
                ind = encontrar_indice_objeto(vectorEstado[i].oPersona, mnor)
                vectorEstado[i].oPersona[ind].estado = estadoPersona

            else:  # la cola esta vacia --> ponemos al servidor en estado libre
                setattr(vectorEstado[i], f"Detector{k}", 'Libre')
            acumuladorPersonas += 1
            #borramos la persona que termino la deteccion"""
            

    # GENERAR METRICAS FINALES (tener en cuenta que pueden pasar varias personas en simultaneo)
    # -----------------Acumuladores----------------------------------
    # acumulamos en el contador de personas que entraron
    vectorEstado[i].personasPasadas += acumuladorPersonas
    # ----------------------Estadisticas-------------------------------------
    if vectorEstado[i].personasPasadas > 0:
        vectorEstado[i].tiempoPromedioPermanencia = vectorEstado[i].tiempoPermanencia / vectorEstado[i].personasPasadas

    return vectorEstado


def FuncionPrincipal(n, ver, mediallv, mediallgrupoSinAuto, mediaFinCobroEstacionamiento, mediafinCobroEntrada,
                 finControlEntradas, finDeteccion):
    global d
    d = datos(mediallv, mediallgrupoSinAuto, mediaFinCobroEstacionamiento, mediafinCobroEntrada, finControlEntradas,
              finDeteccion)
    j = 0
    numero = n
    vecEstado = [
        vectDatos(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, [], [], [], [], []),
        vectDatos(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, [], [], [], [], [])]
    nroEvento = []
    event = []
    reloj = []
    RND_llegVehiculo = []
    tiempo_llegVehiculo = []
    horaLL_llegVehiculo = []
    RND_llgrupo = []
    Tiempo_llgrupo = []
    HoraLL_llgrupo = []
    RND_cantidad = []
    Cantidad = []
    RND_intencion = []
    intencion = []
    RND_fCobroEstacionamiento = []
    tiempo_fCobroEstacionamiento = []
    horaFin_fCobroEstacionamiento1 = []
    horaFin_fCobroEstacionamiento2 = []
    horaFin_fCobroEstacionamiento3 = []
    horaFin_fCobroEstacionamiento4 = []
    horaFin_fCobroEstacionamiento5 = []
    RND_cant = []
    cant = []
    RND_inte = []
    inte = []
    horaFin_LlegadaCobroEntr = []
    horaFin_ControlEntr1 = []
    horaFin_ControlEntr2 = []
    RND_CobrEntr = []
    tiempo_CobroEntr = []
    horaFin_CobroEntr1 = []
    horaFin_CobroEntr2 = []
    horaFin_CobroEntr3 = []
    horaFin_CobroEntr4 = []
    horaFin_CobroEntr5 = []
    horaFin_CobroEntr6 = []
    HoraFin_Detec1 = []
    HoraFin_Detec2 = []
    HoraFin_Detec3 = []
    HoraFin_Detec4 = []
    ColaEstacionamiento = []
    ColaEntrada1 = []
    ColaEntrada2 = []
    ColaEntrada3 = []
    ColaDetector = []
    ColaControlEntradas1 = []
    ColaControlEntradas2 = []
    CajaEstacionamiento1 = []
    CajaEstacionamiento2 = []
    CajaEstacionamiento3 = []
    CajaEstacionamiento4 = []
    CajaEstacionamiento5 = []
    CajaEntradas1 = []
    CajaEntradas2 = []
    CajaEntradas3 = []
    CajaEntradas4 = []
    CajaEntradas5 = []
    CajaEntradas6 = []
    CajaDetector1 = []
    CajaDetector2 = []
    CajaDetector3 = []
    CajaDetector4 = []
    CajaControlEntradas1 = []
    CajaControlEntradas2 = []
    maxColaAutos = []
    tiempoHastaComprarEntrada = []
    clienteEntradaColaXTiempo = []
    tiempoPermanencia = []
    personasPasadas = []
    tiempoPromedioEntrada = []
    cantidadPromedioCola = []
    tiempoPromedioPermanencia = []
    oGrupoConAuto = []
    oGrupoSinAuto = []
    oPersona = []
    oVehiculo = []
    for i in range(numero):
        # primera fila
        if i == 0:
            # seteamos el reloj
            vecEstado[0].evento = 'inicio'
            vecEstado[0].reloj = 0
            # llegada de auto
            vecEstado[0].RND_llegVehiculo = float("{:.2f}".format(random.random()))
            while vecEstado[i].RND_llegVehiculo == 1:
                vecEstado[i].RND_llegVehiculo = float("{:.2f}".format(random.random()))
            vecEstado[0].tiempo_llegVehiculo = -d.mediallv * log(1 - vecEstado[0].RND_llegVehiculo)
            vecEstado[0].horaLL_llegVehiculo = vecEstado[0].tiempo_llegVehiculo + vecEstado[0].reloj
            # llegada grupo
            vecEstado[0].RND_llgrupo = float("{:.2f}".format(random.random()))
            while vecEstado[i].RND_llgrupo == 1:
                vecEstado[i].RND_llgrupo = float("{:.2f}".format(random.random()))
            vecEstado[0].Tiempo_llgrupo = -d.mediallgrupoSinAuto * log(1 - vecEstado[0].RND_llgrupo)
            vecEstado[0].HoraLL_llgrupo = vecEstado[0].Tiempo_llgrupo + vecEstado[0].reloj
            # todos los servidores Libres
            vecEstado[0].CajaEstacionamiento1 = "Libre"
            vecEstado[0].CajaEstacionamiento2 = "Libre"
            vecEstado[0].CajaEstacionamiento3 = "Libre"
            vecEstado[0].CajaEstacionamiento4 = "Libre"
            vecEstado[0].CajaEstacionamiento5 = "Libre"
            vecEstado[0].CajaEntradas1 = "Libre"
            vecEstado[0].CajaEntradas2 = "Libre"
            vecEstado[0].CajaEntradas3 = "Libre"
            vecEstado[0].CajaEntradas4 = "Libre"
            vecEstado[0].CajaEntradas5 = "Libre"
            vecEstado[0].CajaEntradas6 = "Libre"
            vecEstado[0].CajaControlEntradas1 = "Libre"
            vecEstado[0].CajaControlEntradas2 = "Libre"
            vecEstado[0].Detector1 = "Libre"
            vecEstado[0].Detector2 = "Libre"
            vecEstado[0].Detector3 = "Libre"
            vecEstado[0].Detector4 = "Libre"
            vecEstado[0].oPersona = []
            vecEstado[0].oGrupoSinAuto = []
            vecEstado[0].oGrupoConAuto = []
            vecEstado[0].oVehiculo = []
            # print('evento:',vecEstado[0].evento,'| reloj:',vecEstado[0].reloj)

        # logica para la fila = 1
        elif (i % 2 != 0):
            j = 1
            vecEstado[1] = deepcopy(vecEstado[0])
            # se setea el tiempo menor de la finalizacion de los eventos
            menorTiempo, evento = menorTiempoEventos(vecEstado, 1) #ESTE ERA EL ERROR? cambie 0 por 1 (no hace nada el cambio)
            vecEstado[1].reloj = menorTiempo
            tipoEven = tipoEvento(vecEstado, 0, vecEstado[1].reloj)
            vecEstado[1].evento = tipoEven
            # llegada de vehiculo --> genera una nueva llegada, agrega a la cola y agrega objetos
            if evento == 0:
                vecEstado = EventoLLegadaVehiculo(vecEstado,
                                                  1)  # TODO: definir que posicion del vector ocupa si [0] o [1]
                # print('evento:',vecEstado[1].evento,'| reloj:',vecEstado[1].reloj, '| obj:', vecEstado[1].oVehiculo[0].estado, vecEstado[1].oVehiculo[0].horallegada)

            # llegada de un nuevo grupo --> genera una nueva llegada
            elif evento == 1:
                vecEstado = EventoLLegadaGrupo(vecEstado, 1)
            elif evento == 2:
                vecEstado = HoraFinCobroEstacionamiento(vecEstado, 1, 1)
            elif evento == 3:
                vecEstado = HoraFinCobroEstacionamiento(vecEstado, 1, 2)
            elif evento == 4:
                vecEstado = HoraFinCobroEstacionamiento(vecEstado, 1, 3)
            elif evento == 5:
                vecEstado = HoraFinCobroEstacionamiento(vecEstado, 1, 4)
            elif evento == 6:
                vecEstado = HoraFinCobroEstacionamiento(vecEstado, 1, 5)
            elif evento == 7:
                pass  # de tarea borrar
            elif evento == 8:
                vecEstado = HoraFinControlEntradas(vecEstado, 1, 1)
            elif evento == 9:
                vecEstado = HoraFinControlEntradas(vecEstado, 1, 2)
            elif evento == 10:
                vecEstado = HoraFinCobroEntradas(vecEstado, 1, 1)
            elif evento == 11:
                vecEstado = HoraFinCobroEntradas(vecEstado, 1, 2)
            elif evento == 12:
                vecEstado = HoraFinCobroEntradas(vecEstado, 1, 3)
            elif evento == 13:
                vecEstado = HoraFinCobroEntradas(vecEstado, 1, 4)
            elif evento == 14:
                vecEstado = HoraFinCobroEntradas(vecEstado, 1, 5)
            elif evento == 15:
                vecEstado = HoraFinCobroEntradas(vecEstado, 1, 6)
            elif evento == 16:
                vecEstado = HoraFinDeteccion(vecEstado, 1, 1) # ESTE ERA EL ERROR? estaba 0 1, 02, 03, 04
            elif evento == 17:
                vecEstado = HoraFinDeteccion(vecEstado, 1, 2)
            elif evento == 18:
                vecEstado = HoraFinDeteccion(vecEstado, 1, 3)
            elif evento == 19:
                vecEstado = HoraFinDeteccion(vecEstado, 1, 4)
            # para i = 0
        elif (i % 2 == 0):
            j = 0
            vecEstado[0] = deepcopy(vecEstado[1])
            # se setea el tiempo menor de la finalizacion de los eventos
            menorTiempo, evento = menorTiempoEventos(vecEstado, 0)
            vecEstado[0].reloj = menorTiempo
            tipoEven = tipoEvento(vecEstado, 0, vecEstado[0].reloj)
            vecEstado[0].evento = tipoEven
            # llegada de vehiculo --> genera una nueva llegada, agrega a la cola y agrega objetos
            if evento == 0:
                vecEstado = EventoLLegadaVehiculo(vecEstado, 0)  # TODO: definir que posicion del vector ocupa si [0] o [1]
                # print('evento:',vecEstado[0].evento,'| reloj:',vecEstado[0].reloj, '| obj:', vecEstado[0].oVehiculo[0].estado, vecEstado[0].oVehiculo[0].horallegada)
            # llegada de un nuevo grupo --> genera una nueva llegada
            elif evento == 1:
                vecEstado = EventoLLegadaGrupo(vecEstado, 0)
            elif evento == 2:
                vecEstado = HoraFinCobroEstacionamiento(vecEstado, 0, 1)
            elif evento == 3:
                vecEstado = HoraFinCobroEstacionamiento(vecEstado, 0, 2)
            elif evento == 4:
                vecEstado = HoraFinCobroEstacionamiento(vecEstado, 0, 3)
            elif evento == 5:
                vecEstado = HoraFinCobroEstacionamiento(vecEstado, 0, 4)
            elif evento == 6:
                vecEstado = HoraFinCobroEstacionamiento(vecEstado, 0, 5)
            elif evento == 7:
                pass  # de tarea borrar
            elif evento == 8:
                vecEstado = HoraFinControlEntradas(vecEstado, 0, 1)
            elif evento == 9:
                vecEstado = HoraFinControlEntradas(vecEstado, 0, 2)
            elif evento == 10:
                vecEstado = HoraFinCobroEntradas(vecEstado, 0, 1)
            elif evento == 11:
                vecEstado = HoraFinCobroEntradas(vecEstado, 0, 2)
            elif evento == 12:
                vecEstado = HoraFinCobroEntradas(vecEstado, 0, 3)
            elif evento == 13:
                vecEstado = HoraFinCobroEntradas(vecEstado, 0, 4)
            elif evento == 14:
                vecEstado = HoraFinCobroEntradas(vecEstado, 0, 5)
            elif evento == 15:
                vecEstado = HoraFinCobroEntradas(vecEstado, 0, 6)
            elif evento == 16:
                vecEstado = HoraFinDeteccion(vecEstado, 0, 1)
            elif evento == 17:
                vecEstado = HoraFinDeteccion(vecEstado, 0, 2)
            elif evento == 18:
                vecEstado = HoraFinDeteccion(vecEstado, 0, 3)
            elif evento == 19:
                vecEstado = HoraFinDeteccion(vecEstado, 0, 4)

        if vecEstado != None and i >= ver-1 and i <= ver-1 + 500:
            gca = ""
            gsa = ""
            p = ""
            v = ""
            for k in range(len(vecEstado[j].oGrupoConAuto)):
                gca = str(gca)+str(vecEstado[j].oGrupoConAuto[k].estado)+", "+str(float("{:.3f}".format(vecEstado[j].oGrupoConAuto[k].horallegada)))+", "+str(vecEstado[j].oGrupoConAuto[k].hora_llegColaEntrada)+", "+ str(vecEstado[j].oGrupoConAuto[k].cantidad)+", "
            for k in range(len(vecEstado[j].oGrupoSinAuto)):
                gsa = str(gsa)+str(vecEstado[j].oGrupoSinAuto[k].estado)+", "+str(float("{:.3f}".format(vecEstado[j].oGrupoSinAuto[k].horallegada)))+", "+str(vecEstado[j].oGrupoSinAuto[k].cantidad)+", "
            for k in range(len(vecEstado[j].oPersona)):
                p = str(p)+str(vecEstado[j].oPersona[k].estado)+", "+str(float("{:.3f}".format(vecEstado[j].oPersona[k].horallegada)))+", "
            for k in range(len(vecEstado[j].oVehiculo)):
                v = str(v)+str(vecEstado[j].oVehiculo[k].estado)+", "+str(float("{:.3f}".format(vecEstado[j].oVehiculo[k].horallegada)))+", "
            # Agregar valores a los vectores usando append()
            nroEvento.append(i+1)
            event.append(vecEstado[j].evento)
            reloj.append(vecEstado[j].reloj)
            RND_llegVehiculo.append(vecEstado[j].RND_llegVehiculo)
            tiempo_llegVehiculo.append(vecEstado[j].tiempo_llegVehiculo)
            horaLL_llegVehiculo.append(vecEstado[j].horaLL_llegVehiculo)
            RND_llgrupo.append(vecEstado[j].RND_llgrupo)
            Tiempo_llgrupo.append(vecEstado[j].Tiempo_llgrupo)
            HoraLL_llgrupo.append(vecEstado[j].HoraLL_llgrupo)
            RND_cantidad.append(vecEstado[j].RND_cantidad)
            Cantidad.append(vecEstado[j].Cantidad)
            RND_intencion.append(vecEstado[j].RND_intencion)
            intencion.append(vecEstado[j].intencion)
            RND_fCobroEstacionamiento.append(vecEstado[j].RND_fCobroEstacionamiento)
            tiempo_fCobroEstacionamiento.append(vecEstado[j].tiempo_fCobroEstacionamiento)
            horaFin_fCobroEstacionamiento1.append(vecEstado[j].horaFin_fCobroEstacionamiento1)
            horaFin_fCobroEstacionamiento2.append(vecEstado[j].horaFin_fCobroEstacionamiento2)
            horaFin_fCobroEstacionamiento3.append(vecEstado[j].horaFin_fCobroEstacionamiento3)
            horaFin_fCobroEstacionamiento4.append(vecEstado[j].horaFin_fCobroEstacionamiento4)
            horaFin_fCobroEstacionamiento5.append(vecEstado[j].horaFin_fCobroEstacionamiento5)
            RND_cant.append(vecEstado[j].RND_cant)
            cant.append(vecEstado[j].cant)
            RND_inte.append(vecEstado[j].RND_inte)
            inte.append(vecEstado[j].inte)
            horaFin_LlegadaCobroEntr.append(vecEstado[j].horaFin_LlegadaCobroEntr)
            horaFin_ControlEntr1.append(vecEstado[j].horaFin_ControlEntr1)
            horaFin_ControlEntr2.append(vecEstado[j].horaFin_ControlEntr2)
            RND_CobrEntr.append(vecEstado[j].RND_CobrEntr)
            tiempo_CobroEntr.append(vecEstado[j].tiempo_CobroEntr)
            horaFin_CobroEntr1.append(vecEstado[j].horaFin_CobroEntr1)
            horaFin_CobroEntr2.append(vecEstado[j].horaFin_CobroEntr2)
            horaFin_CobroEntr3.append(vecEstado[j].horaFin_CobroEntr3)
            horaFin_CobroEntr4.append(vecEstado[j].horaFin_CobroEntr4)
            horaFin_CobroEntr5.append(vecEstado[j].horaFin_CobroEntr5)
            horaFin_CobroEntr6.append(vecEstado[j].horaFin_CobroEntr6)
            HoraFin_Detec1.append(vecEstado[j].HoraFin_Detec1)
            HoraFin_Detec2.append(vecEstado[j].HoraFin_Detec2)
            HoraFin_Detec3.append(vecEstado[j].HoraFin_Detec3)
            HoraFin_Detec4.append(vecEstado[j].HoraFin_Detec4)
            ColaEstacionamiento.append(vecEstado[j].ColaEstacionamiento)
            ColaEntrada1.append(vecEstado[j].ColaEntrada1)
            ColaEntrada2.append(vecEstado[j].ColaEntrada2)
            ColaEntrada3.append(vecEstado[j].ColaEntrada3)
            ColaDetector.append(vecEstado[j].ColaDetector)
            ColaControlEntradas1.append(vecEstado[j].ColaControlEntradas1)
            ColaControlEntradas2.append(vecEstado[j].ColaControlEntradas2)
            CajaEstacionamiento1.append(vecEstado[j].CajaEstacionamiento1)
            CajaEstacionamiento2.append(vecEstado[j].CajaEstacionamiento2)
            CajaEstacionamiento3.append(vecEstado[j].CajaEstacionamiento3)
            CajaEstacionamiento4.append(vecEstado[j].CajaEstacionamiento4)
            CajaEstacionamiento5.append(vecEstado[j].CajaEstacionamiento5)
            CajaEntradas1.append(vecEstado[j].CajaEntradas1)
            CajaEntradas2.append(vecEstado[j].CajaEntradas2)
            CajaEntradas3.append(vecEstado[j].CajaEntradas3)
            CajaEntradas4.append(vecEstado[j].CajaEntradas4)
            CajaEntradas5.append(vecEstado[j].CajaEntradas5)
            CajaEntradas6.append(vecEstado[j].CajaEntradas6)
            CajaDetector1.append(vecEstado[j].Detector1)
            CajaDetector2.append(vecEstado[j].Detector2)
            CajaDetector3.append(vecEstado[j].Detector3)
            CajaDetector4.append(vecEstado[j].Detector4)
            CajaControlEntradas1.append(vecEstado[j].CajaControlEntradas1)
            CajaControlEntradas2.append(vecEstado[j].CajaControlEntradas2)
            maxColaAutos.append(vecEstado[j].maxColaAutos)
            tiempoHastaComprarEntrada.append(vecEstado[j].tiempoHastaComprarEntrada)
            clienteEntradaColaXTiempo.append(vecEstado[j].clienteEntradaColaXTiempo)
            tiempoPermanencia.append(vecEstado[j].tiempoPermanencia)
            personasPasadas.append(vecEstado[j].personasPasadas)
            tiempoPromedioEntrada.append(vecEstado[j].tiempoPromedioEntrada)
            cantidadPromedioCola.append(vecEstado[j].cantidadPromedioCola)
            tiempoPromedioPermanencia.append(vecEstado[j].tiempoPromedioPermanencia)
            oGrupoConAuto.append(gca)
            oGrupoSinAuto.append(gsa)
            oPersona.append(p)
            oVehiculo.append(v)
        if i == n - 1 and i > ver - 1 + 500:
            gca = ""
            gsa = ""
            p = ""
            v = ""
            for k in range(len(vecEstado[j].oGrupoConAuto)):
                gca = str(gca) + str(vecEstado[j].oGrupoConAuto[k].estado) + ", "
                str(vecEstado[j].oGrupoConAuto[k].horallegada) + ", " + str(
                    vecEstado[j].oGrupoConAuto[k].hora_llegColaEntrada) + ", "
                str(vecEstado[j].oGrupoConAuto[k].cantidad) + ", "
            for k in range(len(vecEstado[j].oGrupoSinAuto)):
                gsa = str(gsa) + str(vecEstado[j].oGrupoSinAuto[k].estado) + ", " + str(
                    vecEstado[j].oGrupoSinAuto[k].horallegada) + ", "
                str(vecEstado[j].oGrupoSinAuto[k].cantidad) + ", "
            for k in range(len(vecEstado[j].oPersona)):
                p = str(p) + str(vecEstado[j].oPersona[k].estado) + ", " + str(
                    vecEstado[j].oPersona[k].horallegada) + ", "
            for k in range(len(vecEstado[j].oVehiculo)):
                v = str(v) + str(vecEstado[j].oVehiculo[k].estado) + ", " + str(
                    vecEstado[j].oVehiculo[k].horallegada) + ", "
            # Agregar valores a los vectores usando append()
            nroEvento.append(i+1)
            event.append(vecEstado[j].evento)
            reloj.append(vecEstado[j].reloj)
            RND_llegVehiculo.append(vecEstado[j].RND_llegVehiculo)
            tiempo_llegVehiculo.append(vecEstado[j].tiempo_llegVehiculo)
            horaLL_llegVehiculo.append(vecEstado[j].horaLL_llegVehiculo)
            RND_llgrupo.append(vecEstado[j].RND_llgrupo)
            Tiempo_llgrupo.append(vecEstado[j].Tiempo_llgrupo)
            HoraLL_llgrupo.append(vecEstado[j].HoraLL_llgrupo)
            RND_cantidad.append(vecEstado[j].RND_cantidad)
            Cantidad.append(vecEstado[j].Cantidad)
            RND_intencion.append(vecEstado[j].RND_intencion)
            intencion.append(vecEstado[j].intencion)
            RND_fCobroEstacionamiento.append(vecEstado[j].RND_fCobroEstacionamiento)
            tiempo_fCobroEstacionamiento.append(vecEstado[j].tiempo_fCobroEstacionamiento)
            horaFin_fCobroEstacionamiento1.append(vecEstado[j].horaFin_fCobroEstacionamiento1)
            horaFin_fCobroEstacionamiento2.append(vecEstado[j].horaFin_fCobroEstacionamiento2)
            horaFin_fCobroEstacionamiento3.append(vecEstado[j].horaFin_fCobroEstacionamiento3)
            horaFin_fCobroEstacionamiento4.append(vecEstado[j].horaFin_fCobroEstacionamiento4)
            horaFin_fCobroEstacionamiento5.append(vecEstado[j].horaFin_fCobroEstacionamiento5)
            RND_cant.append(vecEstado[j].RND_cant)
            cant.append(vecEstado[j].cant)
            RND_inte.append(vecEstado[j].RND_inte)
            inte.append(vecEstado[j].inte)
            horaFin_LlegadaCobroEntr.append(vecEstado[j].horaFin_LlegadaCobroEntr)
            horaFin_ControlEntr1.append(vecEstado[j].horaFin_ControlEntr1)
            horaFin_ControlEntr2.append(vecEstado[j].horaFin_ControlEntr2)
            RND_CobrEntr.append(vecEstado[j].RND_CobrEntr)
            tiempo_CobroEntr.append(vecEstado[j].tiempo_CobroEntr)
            horaFin_CobroEntr1.append(vecEstado[j].horaFin_CobroEntr1)
            horaFin_CobroEntr2.append(vecEstado[j].horaFin_CobroEntr2)
            horaFin_CobroEntr3.append(vecEstado[j].horaFin_CobroEntr3)
            horaFin_CobroEntr4.append(vecEstado[j].horaFin_CobroEntr4)
            horaFin_CobroEntr5.append(vecEstado[j].horaFin_CobroEntr5)
            horaFin_CobroEntr6.append(vecEstado[j].horaFin_CobroEntr6)
            HoraFin_Detec1.append(vecEstado[j].HoraFin_Detec1)
            HoraFin_Detec2.append(vecEstado[j].HoraFin_Detec2)
            HoraFin_Detec3.append(vecEstado[j].HoraFin_Detec3)
            HoraFin_Detec4.append(vecEstado[j].HoraFin_Detec4)
            ColaEstacionamiento.append(vecEstado[j].ColaEstacionamiento)
            ColaEntrada1.append(vecEstado[j].ColaEntrada1)
            ColaEntrada2.append(vecEstado[j].ColaEntrada2)
            ColaEntrada3.append(vecEstado[j].ColaEntrada3)
            ColaDetector.append(vecEstado[j].ColaDetector)
            ColaControlEntradas1.append(vecEstado[j].ColaControlEntradas1)
            ColaControlEntradas2.append(vecEstado[j].ColaControlEntradas2)
            CajaEstacionamiento1.append(vecEstado[j].CajaEstacionamiento1)
            CajaEstacionamiento2.append(vecEstado[j].CajaEstacionamiento2)
            CajaEstacionamiento3.append(vecEstado[j].CajaEstacionamiento3)
            CajaEstacionamiento4.append(vecEstado[j].CajaEstacionamiento4)
            CajaEstacionamiento5.append(vecEstado[j].CajaEstacionamiento5)
            CajaEntradas1.append(vecEstado[j].CajaEntradas1)
            CajaEntradas2.append(vecEstado[j].CajaEntradas2)
            CajaEntradas3.append(vecEstado[j].CajaEntradas3)
            CajaEntradas4.append(vecEstado[j].CajaEntradas4)
            CajaEntradas5.append(vecEstado[j].CajaEntradas5)
            CajaEntradas6.append(vecEstado[j].CajaEntradas6)
            CajaDetector1.append(vecEstado[j].Detector1)
            CajaDetector2.append(vecEstado[j].Detector2)
            CajaDetector3.append(vecEstado[j].Detector3)
            CajaDetector4.append(vecEstado[j].Detector4)
            CajaControlEntradas1.append(vecEstado[j].CajaControlEntradas1)
            CajaControlEntradas2.append(vecEstado[j].CajaControlEntradas2)
            maxColaAutos.append(vecEstado[j].maxColaAutos)
            tiempoHastaComprarEntrada.append(vecEstado[j].tiempoHastaComprarEntrada)
            clienteEntradaColaXTiempo.append(vecEstado[j].clienteEntradaColaXTiempo)
            tiempoPermanencia.append(vecEstado[j].tiempoPermanencia)
            personasPasadas.append(vecEstado[j].personasPasadas)
            tiempoPromedioEntrada.append(vecEstado[j].tiempoPromedioEntrada)
            cantidadPromedioCola.append(vecEstado[j].cantidadPromedioCola)
            tiempoPromedioPermanencia.append(vecEstado[j].tiempoPromedioPermanencia)
            oGrupoConAuto.append(gca)
            oGrupoSinAuto.append(gsa)
            oPersona.append(p)
            oVehiculo.append(v)

    # Crear un diccionario con los vectores
    data = {
        'nroEvento': nroEvento,
        'evento': event,
        'reloj': reloj,
        'RND_llegVehiculo': RND_llegVehiculo,
        'tiempo_llegVehiculo': tiempo_llegVehiculo,
        'horaLL_llegVehiculo': horaLL_llegVehiculo,
        'RND_llgrupo': RND_llgrupo,
        'Tiempo_llgrupo': Tiempo_llgrupo,
        'HoraLL_llgrupo': HoraLL_llgrupo,
        'RND_cantidad': RND_cantidad,
        'Cantidad': Cantidad,
        'RND_intencion': RND_intencion,
        'intencion': intencion,
        'RND_fCobroEstacionamiento': RND_fCobroEstacionamiento,
        'tiempo_fCobroEstacionamiento': tiempo_fCobroEstacionamiento,
        'horaFin_fCobroEstacionamiento1': horaFin_fCobroEstacionamiento1,
        'horaFin_fCobroEstacionamiento2': horaFin_fCobroEstacionamiento2,
        'horaFin_fCobroEstacionamiento3': horaFin_fCobroEstacionamiento3,
        'horaFin_fCobroEstacionamiento4': horaFin_fCobroEstacionamiento4,
        'horaFin_fCobroEstacionamiento5': horaFin_fCobroEstacionamiento5,
        'RND_cant': RND_cant,
        'cant': cant,
        'RND_inte': RND_inte,
        'inte': inte,
        'horaFin_LlegadaCobroEntr': horaFin_LlegadaCobroEntr,
        'horaFin_ControlEntr1': horaFin_ControlEntr1,
        'horaFin_ControlEntr2': horaFin_ControlEntr2,
        'RND_CobrEntr': RND_CobrEntr,
        'tiempo_CobroEntr': tiempo_CobroEntr,
        'horaFin_CobroEntr1': horaFin_CobroEntr1,
        'horaFin_CobroEntr2': horaFin_CobroEntr2,
        'horaFin_CobroEntr3': horaFin_CobroEntr3,
        'horaFin_CobroEntr4': horaFin_CobroEntr4,
        'horaFin_CobroEntr5': horaFin_CobroEntr5,
        'horaFin_CobroEntr6': horaFin_CobroEntr6,
        'HoraFin_Detec1': HoraFin_Detec1,
        'HoraFin_Detec2': HoraFin_Detec2,
        'HoraFin_Detec3': HoraFin_Detec3,
        'HoraFin_Detec4': HoraFin_Detec4,
        'ColaEstacionamiento': ColaEstacionamiento,
        'ColaEntrada1': ColaEntrada1,
        'ColaEntrada2': ColaEntrada2,
        'ColaEntrada3': ColaEntrada3,
        'ColaDetector': ColaDetector,
        'ColaControlEntradas1': ColaControlEntradas1,
        'ColaControlEntradas2': ColaControlEntradas2,
        'CajaEstacionamiento1': CajaEstacionamiento1,
        'CajaEstacionamiento2': CajaEstacionamiento2,
        'CajaEstacionamiento3': CajaEstacionamiento3,
        'CajaEstacionamiento4': CajaEstacionamiento4,
        'CajaEstacionamiento5': CajaEstacionamiento5,
        'CajaEntradas1': CajaEntradas1,
        'CajaEntradas2': CajaEntradas2,
        'CajaEntradas3': CajaEntradas3,
        'CajaEntradas4': CajaEntradas4,
        'CajaEntradas5': CajaEntradas5,
        'CajaEntradas6': CajaEntradas6,
        'CajaDetector1': CajaDetector1,
        'CajaDetector2': CajaDetector2,
        'CajaDetector3': CajaDetector3,
        'CajaDetector4': CajaDetector4,
        'CajaControlEntradas1': CajaControlEntradas1,
        'CajaControlEntradas2': CajaControlEntradas2,
        'maxColaAutos': maxColaAutos,
        'tiempoHastaComprarEntrada': tiempoHastaComprarEntrada,
        'clienteConEntradaComprada': clienteEntradaColaXTiempo,
        'tiempoPermanencia': tiempoPermanencia,
        'personasPasadas': personasPasadas,
        'tiempoPromedioEntrada': tiempoPromedioEntrada,
        'clientesColaXTiempo': cantidadPromedioCola,
        'tiempoPromedioPermanencia': tiempoPromedioPermanencia,
        'oGrupoConAuto': oGrupoConAuto,
        'oGrupoSinAuto': oGrupoSinAuto,
        'oPersona': oPersona,
        'oVehiculo': oVehiculo
    }

    # Crear un DataFrame a partir del diccionario
    df = pd.DataFrame(data)

    # Crear un nuevo archivo de Excel
    # excel_file = 'archivo_excel.xlsx'
    # writer = pd.ExcelWriter(excel_file, engine='openpyxl')
    workbook = Workbook()

    # Guardar el DataFrame en una hoja de Excel
    # df.to_excel(writer, sheet_name='Hoja1', index=False)
    hoja_activa = workbook.active

    # Utilizar la función dataframe_to_rows para convertir el DataFrame en filas
    filas = dataframe_to_rows(df, index=False, header=True)

    for fila in filas:
        hoja_activa.append(fila)
    # Obtener la hoja de Excel
    # workbook = writer.book
    # worksheet = workbook['Hoja1']

    # Ajustar automáticamente el ancho de las columnas
    for column in hoja_activa.columns:
        max_length = 0
        column = [cell for cell in column]
        for cell in column:
            try:
                if len(str(cell.value)) > max_length:
                    max_length = len(cell.value)
            except:
                pass
        adjusted_width = (max_length + 2) * 1.2
        hoja_activa.column_dimensions[column[0].column_letter].width = adjusted_width

    # Guardar los cambios en el archivo de Excel
    excel_file = 'archivo_excel.xlsx'
    workbook.save(excel_file)

    return vecEstado[j]
class colasApp:
    def __init__(self, master):
        self.master = master
        master.title("Simulador")
        customtkinter.set_appearance_mode("Light")
        customtkinter.set_default_color_theme("green")
        # Creamos los contenedores para los parametros
        self.cantidad_frame = customtkinter.CTkFrame(master=master)
        self.cantidad_frame.grid(row=0, column=0, padx=10, pady=10, sticky="nw")
        self.cantidad_lbl = customtkinter.CTkLabel(master=self.cantidad_frame, text="Cantidad de ""\nsimulaciones")
        self.cantidad_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="s")
        self.cantidad_numeros_var = customtkinter.StringVar()
        self.cantidad_numeros_var.set("500")
        self.cantidad_numeros_entry = customtkinter.CTkEntry(self.cantidad_frame, textvariable=self.cantidad_numeros_var)
        self.cantidad_numeros_entry.grid(row=1, column=0, padx=5, pady=5, )

        self.ver_desde_frame = customtkinter.CTkFrame(master=master)
        self.ver_desde_frame.grid(row=0, column=1, padx=10, pady=10, sticky="nw")
        self.ver_desde_lbl = customtkinter.CTkLabel(master=self.ver_desde_frame, text="Ver desde")
        self.ver_desde_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="s")
        self.ver_desde_var = customtkinter.StringVar()
        self.ver_desde_var.set("0")
        self.ver_desde_entry = customtkinter.CTkEntry(self.ver_desde_frame, textvariable=self.ver_desde_var)
        self.ver_desde_entry.grid(row=1, column=0, padx=5, pady=5, )

        self.tiempoACaja_frame = customtkinter.CTkFrame(master=master)
        self.tiempoACaja_frame.grid(row=1, column=0, padx=10, pady=10, sticky="nw")
        self.tiempoACaja_lbl = customtkinter.CTkLabel(master=self.tiempoACaja_frame, text="Tiempo Atención\nCobro Entrada")
        self.tiempoACaja_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="s")
        self.tiempoACaja_var = customtkinter.StringVar()
        self.tiempoACaja_var.set("1.53")
        self.tiempoACaja_var.set("0.53")
        self.tiempoACaja_entry = customtkinter.CTkEntry(self.tiempoACaja_frame, textvariable=self.tiempoACaja_var)
        self.tiempoACaja_entry.grid(row=1, column=0, padx=5, pady=5)

        self.tiempoVehiculo_frame = customtkinter.CTkFrame(master=master)
        self.tiempoVehiculo_frame.grid(row=1, column=1, padx=10, pady=10, sticky="nw")
        self.tiempoVehiculo_lbl = customtkinter.CTkLabel(master=self.tiempoVehiculo_frame, text="Tiempo Llegada\nVehiculo")
        self.tiempoVehiculo_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="s")
        self.tiempoVehiculo_var = customtkinter.StringVar()
        self.tiempoVehiculo_var.set("0.025")
        self.tiempoVehiculo_var.set("1.025")
        self.tiempoVehiculo_entry = customtkinter.CTkEntry(self.tiempoVehiculo_frame, textvariable=self.tiempoVehiculo_var)
        self.tiempoVehiculo_entry.grid(row=1, column=0, padx=5, pady=5)

        self.tiempoGrupo_frame = customtkinter.CTkFrame(master=master)
        self.tiempoGrupo_frame.grid(row=1, column=2, padx=10, pady=10, sticky="nw")
        self.tiempoGrupo_lbl = customtkinter.CTkLabel(master=self.tiempoGrupo_frame,text="Tiempo Llegada\nGrupo")
        self.tiempoGrupo_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="s")
        self.tiempoGrupo_var = customtkinter.StringVar()
        self.tiempoGrupo_var.set("0.029")
        self.tiempoGrupo_var.set("1.029")
        self.tiempoGrupo_entry = customtkinter.CTkEntry(self.tiempoGrupo_frame, textvariable=self.tiempoGrupo_var)
        self.tiempoGrupo_entry.grid(row=1, column=0, padx=5, pady=5)

        self.tiempoEstacionamiento_frame = customtkinter.CTkFrame(master=master)
        self.tiempoEstacionamiento_frame.grid(row=2, column=0, padx=10, pady=10, sticky="nw")
        self.tiempoEstacionamiento_lbl = customtkinter.CTkLabel(master=self.tiempoEstacionamiento_frame, text="Tiempo Atencion\nCobro Estacionamiento")
        self.tiempoEstacionamiento_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="s")
        self.tiempoEstacionamiento_var = customtkinter.StringVar()
        self.tiempoEstacionamiento_var.set("0.48")
        self.tiempoEstacionamiento_entry = customtkinter.CTkEntry(self.tiempoEstacionamiento_frame, textvariable=self.tiempoEstacionamiento_var)
        self.tiempoEstacionamiento_entry.grid(row=1, column=0, padx=5, pady=5)

        self.tiempoControl_frame = customtkinter.CTkFrame(master=master)
        self.tiempoControl_frame.grid(row=2, column=1, padx=10, pady=10, sticky="nw")
        self.tiempoControl_lbl = customtkinter.CTkLabel(master=self.tiempoControl_frame, text="Tiempo Atencion\nControl Entradas")
        self.tiempoControl_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="s")
        self.tiempoControl_var = customtkinter.StringVar()
        self.tiempoControl_var.set("1")
        self.tiempoControl_entry = customtkinter.CTkEntry(self.tiempoControl_frame, textvariable=self.tiempoControl_var)
        self.tiempoControl_entry.grid(row=1, column=0, padx=5, pady=5)

        self.tiempoDeteccion_frame = customtkinter.CTkFrame(master=master)
        self.tiempoDeteccion_frame.grid(row=2, column=2, padx=10, pady=10, sticky="nw")
        self.tiempoDeteccion_lbl = customtkinter.CTkLabel(master=self.tiempoDeteccion_frame, text="Tiempo Atencion\nDeteccion Comida")
        self.tiempoDeteccion_lbl.grid(row=0, column=0, padx=10, pady=0, sticky="s")
        self.tiempoDeteccion_var = customtkinter.StringVar()
        self.tiempoDeteccion_var.set("0.083")
        self.tiempoDeteccion_entry = customtkinter.CTkEntry(self.tiempoDeteccion_frame, textvariable=self.tiempoDeteccion_var)
        self.tiempoDeteccion_entry.grid(row=1, column=0, padx=5, pady=5)

        self.conclu_frame = customtkinter.CTkFrame(master=master)
        self.conclu_frame.grid(row=3, column=0, columnspan=3, padx=10, pady=10, sticky="news")

        self.conclu_metrics = customtkinter.CTkLabel(master=self.conclu_frame, text="Métricas")
        self.conclu_metrics.grid(row=3, column=0, padx=10, pady=0, sticky="swe")

        self.conclu_lbl1 = customtkinter.CTkLabel(master=self.conclu_frame, text="")
        self.conclu_lbl1.grid(row=4, column=0, padx=10, pady=0, sticky="sw")
        self.conclu_lbl2 = customtkinter.CTkLabel(master=self.conclu_frame, text="")
        self.conclu_lbl2.grid(row=5, column=0, padx=10, pady=0, sticky="sw")
        self.conclu_lbl3 = customtkinter.CTkLabel(master=self.conclu_frame, text="")
        self.conclu_lbl3.grid(row=6, column=0, padx=10, pady=0, sticky="sw")
        self.conclu_lbl4 = customtkinter.CTkLabel(master=self.conclu_frame, text="")
        self.conclu_lbl4.grid(row=7, column=0, padx=10, pady=0, sticky="sw")

        self.generar_button = customtkinter.CTkButton(self.master, text="Generar simulaciones",
                                                      font=('Calibri', 16, 'bold'), command=self.principal)
        self.generar_button.grid(row=8, column=1, padx=10, pady=10)


    def definirConclusion(self,vecEstado):
        #ampliamiento del almacen
        prom = vecEstado.cantidadPromedioCola/vecEstado.reloj
        tex1 = "La máxima cola de autos es de: "+str(vecEstado.maxColaAutos)
        tex2 = "El tiempo promedio para conseguir la entrada sera de: "+str(vecEstado.tiempoPromedioEntrada)+" minutos."
        tex3 = "Cantidad promedio de clientes en cola para pagar entrada: "+str(prom)
        tex4 = "Tiempo promedio hasta entrar al parque: "+str(vecEstado.tiempoPromedioPermanencia)+" minutos."

        self.conclu_lbl1.configure(text=tex1) #
        self.conclu_lbl2.configure(text=tex2) #
        self.conclu_lbl3.configure(text=tex3) #
        self.conclu_lbl4.configure(text=tex4)

    def principal(self):
        vector = FuncionPrincipal(int(self.cantidad_numeros_var.get()), int(self.ver_desde_var.get()),
                                  float(self.tiempoVehiculo_var.get()), float(self.tiempoGrupo_var.get()),
                                  float(self.tiempoEstacionamiento_var.get()), float(self.tiempoACaja_var.get()),
                                  float(self.tiempoControl_var.get()), float(self.tiempoDeteccion_var.get()))
        self.definirConclusion(vector)

# Ejecutar el bucle principal de la ventana
vent = customtkinter.CTk()
app = colasApp(vent)
vent.mainloop()