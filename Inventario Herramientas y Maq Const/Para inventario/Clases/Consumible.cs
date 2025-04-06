using Para_inventario.Servicios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Para_inventario.Clases
{
    class Consumible
    {
        public int nro { get; set; }    
        public string nombre { get; set; }
        public double cantidadDisponible { get; set; } 
        public double cantidadComprada { get; set; }
        public string unidad { get; set; }  


        public Consumible() { } 

        public Consumible(int nro, string nombre, int cantidadDisponible, int cantidadComprada, string unidad)
        {
            this.nro = nro;
            this.nombre = nombre;
            this.cantidadDisponible = cantidadDisponible;
            this.cantidadComprada = cantidadComprada;
            this.unidad = unidad;
        }

        public void agregar(Consumible consumible)
        {
            ServicioConsumible servicio = new ServicioConsumible();
            servicio.agregar(consumible);
        }

        public void mostrar(DataGridView con)
        {
            ServicioConsumible consumible = new ServicioConsumible();
            con.DataSource = consumible.mostrar();
        }

        public void consultarNombre(TextBox nombre , DataGridView dataConsumible) 
        {
            BindingSource bs = new BindingSource();
            bs.DataSource = dataConsumible.DataSource;
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
                        bs.Filter = "nombre like '%"+nombre.Text+"%'";
                        dataConsumible.DataSource = bs.DataSource;
                        if (dataConsumible.RowCount == 0)
                        {
                            MessageBox.Show("No se encontró ningún consumible con el nombre ingresado");
                        }
                    }
                }
                catch (Exception)
                {
                    bandera = false;
                    dataConsumible.Refresh();
                }
                finally
                {
                    bandera = false;
                }
            }
        }

        public void mostrarNombreConsumible(ComboBox nombre)
        {
            ServicioConsumible servicio = new ServicioConsumible();
            nombre.DataSource = servicio.mostrarNombreConsumible();
            nombre.DisplayMember = "name";
            nombre.ValueMember = "nro";
            nombre.SelectedIndex = -1;
        }

        public void verificarCantidad(DataGridView consumibles, int nro, double cant, DataGridView consumos, DateTime fecha)
        {
            BindingSource bs = new BindingSource();
            bs.DataSource = consumibles.DataSource;
            try
            {
                bs.Filter = "nro = '" + nro + "'";
                consumibles.DataSource = bs.DataSource;
                double cantidad = double.Parse(consumibles.CurrentRow.Cells["cantidadDisponible"].Value.ToString());
                if (cant <= cantidad)
                {
                    consumos.Rows.Add(consumibles.CurrentRow.Cells["nro"].Value.ToString(), 
                        consumibles.CurrentRow.Cells["nombre"].Value.ToString(), cant.ToString(), fecha);
                }
                else
                {
                    MessageBox.Show("Ingrese una cantidad menor o igual a la cantidad disponible del consumible seleccionado que es: "
                        +cantidad.ToString(), 
                        "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        public void mostrarConsumos(DataGridView consumos)
        {
            ServicioConsumible servicio = new ServicioConsumible();
            consumos.DataSource = servicio.mostrarConsumos();
        }

        public void aregarConsumo(DataGridView consumos)
        {
            ServicioConsumible servicio = new ServicioConsumible();
            servicio.agregarConsumos(consumos);
        }

        public void reponerConsumible(Consumible consumible)
        {
            ServicioConsumible servicio = new ServicioConsumible();
            servicio.reponerConsumibleV1(consumible);
        }
    }
}
