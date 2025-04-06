using Para_inventario.Servicios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Para_inventario.Clases
{
    class Informática
    {
        public int nro { get; set; }
        public string nombre { get; set; }
        public string marca { get; set; }
        public string lugar { get; set; }
        public int cantidad { get; set; }

        public Informática() { }

        public Informática(int nro, string nombre, string marca, string lugar, int cantidad)
        {
            this.nro = nro;
            this.nombre = nombre;
            this.marca = marca;
            this.lugar = lugar;
            this.cantidad = cantidad;
        }

        public void agregar(Informática informatica)
        {
            ServicioInformatica servicio = new ServicioInformatica();
            servicio.agregar(informatica);
        }

        public void mostrar(DataGridView dataInformatica)
        {
            ServicioInformatica servicio = new ServicioInformatica();
            dataInformatica.DataSource = servicio.mostrar();
        }

        public void eliminar(DataGridView dataInformatica)
        {
            int nro = int.Parse(dataInformatica.CurrentRow.Cells["nro"].Value.ToString());
            DialogResult resultado = MessageBox.Show("¿Desea eliminar el elemento de informática con codigo "
                + dataInformatica.CurrentRow.Cells["Codigo"].Value.ToString() + "?", "Información", MessageBoxButtons.YesNo);
            if (resultado == DialogResult.Yes) 
            {
                this.nro = nro;
                ServicioInformatica ser = new ServicioInformatica();
                ser.eliminar(this, int.Parse(dataInformatica.CurrentRow.Cells["Codigo"].Value.ToString()));
                dataInformatica.Rows.Remove(dataInformatica.CurrentRow);
                dataInformatica.Refresh();
                MessageBox.Show("Elemento de informática eliminado exitósamente");
            }
        }

        public void reportarProblema(int codigo, string problema)
        {
            ServicioInformatica servicio = new ServicioInformatica();
            servicio.reportarProblema(codigo, problema);
        }

        public void mostrarStock(DataGridView prestamos)
        {
            ServicioInformatica servicio = new ServicioInformatica();
            prestamos.DataSource = servicio.mostrarStock();
        }

        public void actualizarStock(Informática informatica, int cantidad)
        {
            ServicioInformatica ser = new ServicioInformatica();
            ser.actualizarStock(informatica, cantidad);
        }

        public void consultarNroInventario(TextBox numero, DataGridView dataInformatica)
        {
            BindingSource bs = new BindingSource(); 
            bs.DataSource = dataInformatica.DataSource;
            bool bandera = false;
            if (numero.Text != null)
            {
                bandera = true; 
            }
            if (bandera)
            {
                try
                {
                    if (bs.DataSource != null)
                    {
                        bs.Filter = "Codigo = '" + int.Parse(numero.Text) + "'";
                        dataInformatica.DataSource = bs.DataSource;
                        if (dataInformatica.RowCount == 0)
                        {
                            MessageBox.Show("No se encontró ningún elemento de informática con el codigo ingresado");
                        }
                    }
                }
                catch (Exception) 
                {
                    bandera = false;
                    dataInformatica.Refresh();
                }
                finally
                {
                    bandera = false;
                }
            }
        }

        public void consultarNombre(TextBox nombre, DataGridView dataInformatica) 
        {
            BindingSource bs = new BindingSource();
            bs.DataSource = dataInformatica.DataSource;
            bool bandera = false;
            if (nombre.Text != null) 
            {
                bandera = true;
            }
            if (bandera)
            {
                try
                {
                    if (bs.DataSource != null)
                    {
                        bs.Filter = "Nombre like '%"+nombre.Text+"%'";
                        dataInformatica.DataSource = bs.DataSource;
                        if (dataInformatica.RowCount == 0)
                        {
                            MessageBox.Show("No se encontró ningún elemento de informática con el nombre ingresado");
                        }
                    }
                }
                catch (Exception)
                {
                    bandera = false;
                    dataInformatica.Refresh();
                }
                finally
                {
                    bandera = false;
                }
            }
        }
    }
}
