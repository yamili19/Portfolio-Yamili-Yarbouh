using Para_inventario.Servicios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Para_inventario.Clases
{
    class ElementoDibujo
    {
        public int nro { get; set; }
        public string nombre { get; set; }
        public int cantidadDisponible { get; set; }
        public int cantidadComprada { get; set; }

        public ElementoDibujo() { }

        public ElementoDibujo(int nro, string nombre, int cantidadDisponible, int cantidadComprada)
        {
            this.nro = nro;
            this.nombre = nombre;
            this.cantidadDisponible = cantidadDisponible;
            this.cantidadComprada = cantidadComprada;
        }

        public void agregar(ElementoDibujo elementoDibujo)
        {
            ServicioElementoDibujo e = new ServicioElementoDibujo();
            e.agregar(elementoDibujo);  
        }

        public void eliminar(DataGridView elemento, int codigo)
        {
            int nro = int.Parse(elemento.CurrentRow.Cells["nro"].Value.ToString());
            DialogResult dialogo = MessageBox.Show("¿Desea eliminar el elemento de dibujo con codigo "
                +codigo+"?", "Información", MessageBoxButtons.YesNo);
            if (dialogo == DialogResult.Yes) 
            {
                this.nro = nro;
                ServicioElementoDibujo ser = new ServicioElementoDibujo();
                ser.eliminar(this, codigo);
                MessageBox.Show("Elemento de dibujo eliminado exitósamente");
                elemento.Rows.Remove(elemento.CurrentRow);
                elemento.Refresh();
            }
        }

        public void consultarNroInventario(TextBox numero, DataGridView elemento)
        {
            BindingSource bs = new BindingSource();
            bs.DataSource = elemento.DataSource;
            bool bandera = false;
            if (numero.Text != null)
            {
                bandera = true;
            }
            while (bandera)
            {
                try
                {
                    if (bs.DataSource != null)
                    {
                        int nro = int.Parse(numero.Text);
                        bs.Filter = "Codigo = '" + nro + "'";
                        elemento.DataSource = bs.DataSource;
                        if (elemento.RowCount == 0)
                        {
                            MessageBox.Show("No se encontró ningún elemento de dibujo con el codigo ingresado");
                        }
                    }
                }
                catch (Exception)
                {
                    bandera = false;
                    elemento.Refresh();  
                }
                finally
                {
                    bandera = false;
                }
            }
        }

        public void consultarNombre(TextBox nombre, DataGridView elemento) 
        {
            BindingSource bs = new BindingSource();
            bs.DataSource = elemento.DataSource;    
            bool bandera = false;   
            if (nombre.Text != null) 
            {
                bandera = true;
            }
            while (bandera)
            {
                try
                {
                    if (bs.DataSource != null)
                    {
                        bs.Filter = "Nombre like '%"+nombre.Text+"%'";
                        elemento.DataSource = bs.DataSource;    
                        if (elemento.RowCount == 0)
                        {
                            MessageBox.Show("No se encontró ningún elemento de dibujo con el nombre ingresado");
                        }
                    }
                }
                catch
                {
                    bandera = false;
                    elemento.Refresh();
                }
                finally
                {
                    bandera = false;
                }
            }
        }

        public void mostrarED(DataGridView data)
        {
            ServicioElementoDibujo ser = new ServicioElementoDibujo();
            data.DataSource = ser.mostrarED();
        }

        public void reportarProblema(int codigo, string problema)
        {
            ServicioElementoDibujo ser = new ServicioElementoDibujo();
            ser.reportarProblema(codigo, problema); 
        }

        public void mostrarStock(DataGridView elementos)
        {
            ServicioElementoDibujo ser = new ServicioElementoDibujo();
            elementos.DataSource = ser.mostrarStock();
        }

        public void actualizarStock(ElementoDibujo elemento, int cant)
        {
            ServicioElementoDibujo ser = new ServicioElementoDibujo();
            ser.actualizarStock(elemento, cant);
        }
    }
}
