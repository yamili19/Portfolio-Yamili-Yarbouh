using Para_inventario.Servicios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Para_inventario.Clases
{
    class Herramienta
    {
        public int nro { get; set; }
        public string nombre { get; set; }
        public string marca { get; set; }
        public string material { get; set; }
        public string lugar { get; set; }
        public int cantidad { get; set; }

        public Herramienta() { }

        public Herramienta (int nro, string nombre, string marca, string material, string lugar, int cantidad)
        {
            this.nro = nro;
            this.nombre = nombre;
            this.marca = marca;
            this.material = material;
            this.lugar = lugar;
            this.cantidad = cantidad;
        }

        public void agregar(Herramienta herramienta)
        {
            ServicioHerramienta ser = new ServicioHerramienta();
            ser.agregar(herramienta);
        }

        public void mostrarStock(DataGridView herramientas)
        {
            ServicioHerramienta ser = new ServicioHerramienta();
            herramientas.DataSource = ser.mostrarStock();
        }

        public void actualizarStock(Herramienta herramienta, int cantidad)
        {
            ServicioHerramienta ser = new ServicioHerramienta();
            ser.actualizarStock(herramienta, cantidad);
        }
        public void buscarNroInventario(TextBox numero, DataGridView herramienta)
        {
            BindingSource bs = new BindingSource();
            bs.DataSource = herramienta.DataSource;
            bool bandera = false;
            if (numero.Text != null)
            {
                bandera= true;
            }
            while (bandera == true)
            {
                try
                {
                    if (bs.DataSource != null)
                    {
                        int nro = int.Parse(numero.Text);
                        bs.Filter = "Codigo = '" + nro + "'";
                        herramienta.DataSource = bs.DataSource;
                        if (herramienta.RowCount == 0)
                        {
                            MessageBox.Show("No se encontró ninguna herramienta con el codigo ingresado");
                        }
                    }
                }
                catch (Exception)
                {
                    herramienta.Refresh();
                    bandera = false;
                }
                finally
                {
                    bandera = false;
                }
            }
        }

        public void buscarNombreHerramienta(string nombre, DataGridView herramienta)
        {
            BindingSource bindingSource= new BindingSource();
            bindingSource.DataSource = herramienta.DataSource;
            try
            {
                bindingSource.Filter = "Nombre like '%" + nombre + "%'";
                herramienta.DataSource = bindingSource.DataSource;  
                if (herramienta.RowCount == 0)
                {
                    MessageBox.Show("No se encontró ninguna herramienta con el nombre ingresado");
                }
            }
            catch (Exception)
            {
                herramienta.Refresh();
            }
        }

        public void mostrarHerramienta(DataGridView herramientas)
        {
            ServicioHerramienta ser = new ServicioHerramienta();
            herramientas.DataSource = ser.mostrarHerramienta();
        }

        public void reportarProblema(int codigo, string problema)
        {
            ServicioHerramienta ser = new ServicioHerramienta();
            ser.reportarProblema(codigo, problema);
        }

        public void eliminar(DataGridView herramientas, int codigo)
        {
            int nro = int.Parse(herramientas.CurrentRow.Cells["nro"].Value.ToString());
            DialogResult dialogo = MessageBox.Show("¿Desea eliminar le herramienta con codigo "
                        + codigo + "?", "Información", MessageBoxButtons.YesNo);
            if (dialogo == DialogResult.Yes) 
            {
                this.nro = nro;
                ServicioHerramienta ser = new ServicioHerramienta();
                ser.eliminar(this, codigo);
                herramientas.Rows.Remove(herramientas.CurrentRow);
                herramientas.Refresh();
                MessageBox.Show("Herramienta eliminada exitósamente");
            }
        }
    }
}
