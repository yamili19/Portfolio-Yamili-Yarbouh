using Para_inventario.Servicios;
using System;
using System.Collections.Generic;
using System.DirectoryServices.ActiveDirectory;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Para_inventario.Clases
{
    class Prestamo
    {
        public int nroInventario { get; set; } 
        public int codigo { get; set; }  
        public DateTime fechaPrestamo { get; set; }
        public DateTime fechaDevolucion { get; set; }
        public string encargado { get; set; }
        public int usuario { get; set; }

        public Prestamo() { }
        public Prestamo(int nroInventario, DateTime fechaPrestamo, DateTime fechaDevolucion, string encargado, int usuario, int codigo)
        {
            this.nroInventario = nroInventario;
            this.fechaPrestamo = fechaPrestamo;
            this.fechaDevolucion = fechaDevolucion;
            this.encargado = encargado;
            this.usuario = usuario;
            this.codigo = codigo;
        }

        public void registrarPrestamoED(DataGridView prestamos, int cantidad, Prestamo prestamo)
        {
            ServicioPrestamo ser = new ServicioPrestamo();
            ser.registrarPrestamoED(prestamos, cantidad, prestamo);
        }

        public void registrarPrestamoHerramienta(DataGridView prestamos, int cantidad, Prestamo prestamo)
        {
            ServicioPrestamo ser = new ServicioPrestamo();
            ser.registrarPrestamoHerramienta(prestamos, cantidad, prestamo);
        }

        public void registrarPrestamoInformatica(DataGridView prestamos, int cantidad, Prestamo prestamo)
        {
            ServicioPrestamo ser = new ServicioPrestamo();
            ser.registrarPrestamoInformatica(prestamos, cantidad, prestamo);
        }

        public void registrarPrestamoMaquina(DataGridView prestamos, int cantidad, Prestamo prestamo)
        {
            ServicioPrestamo ser = new ServicioPrestamo();
            ser.registrarPrestamoMaquina(prestamos, cantidad, prestamo);
        }

        public void buscarPorEncargado(string nombre, DataGridView prestamos)
        {
            BindingSource bs = new BindingSource();
            bs.DataSource = prestamos.DataSource;
            try
            {
                bs.Filter = "encargado like '%" + nombre + "%'";
                prestamos.DataSource = bs;
                if (prestamos.RowCount == 0)
                {
                    MessageBox.Show("No se encontró el solicitante que está buscando");
                }
            }
            catch (Exception)
            {
                prestamos.Refresh();    
            }
        }


        public void mostrarPrestamoHerramienta(DataGridView prestamos)
        {
            ServicioPrestamo ser = new ServicioPrestamo();
            prestamos.DataSource = ser.mostrarPrestamoHerramienta(); 
        }

        public void mostrarPrestamosED(DataGridView prestamos)
        {
            ServicioPrestamo ser = new ServicioPrestamo();
            prestamos.DataSource = ser.mostrarPrestamoED();
        }

        public void mostrarPrestamosInformatica(DataGridView prestamos)
        {
            ServicioPrestamo ser = new ServicioPrestamo();
            prestamos.DataSource = ser.mostrarPrestamoInformatica();
        }

        public void mostrarPrestamosMaquinas(DataGridView prestamos)
        {
            ServicioPrestamo ser = new ServicioPrestamo();
            prestamos.DataSource = ser.mostrarPrestamosMaquinas();
        }
        public void registrarDevHerramienta(Prestamo prestamo)
        {
            ServicioPrestamo ser = new ServicioPrestamo();
            ser.registrarDevHerramienta(prestamo);
        }

        public void registrarDevMaquina(Prestamo prestamo)
        {
            ServicioPrestamo ser = new ServicioPrestamo();
            ser.registrarDevMaquina(prestamo);
        }

        public void registrarDevED(Prestamo prestamo)
        {
            ServicioPrestamo ser = new ServicioPrestamo();
            ser.registrarDevED(prestamo);   
        }

        public void registrarDevInformatica(Prestamo prestamo)
        {
            ServicioPrestamo ser = new ServicioPrestamo();
            ser.registrarDevInformatica(prestamo);
        }
    }
}
