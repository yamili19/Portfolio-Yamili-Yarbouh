using Para_inventario.Clases;
using Para_inventario.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Para_inventario.ABM
{
    public partial class actualizarStockHerramientas : Form
    {
        Herramienta herramienta = new Herramienta();
        public actualizarStockHerramientas()
        {
            InitializeComponent();
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();
            ventana.Show();
            this.Close();   
        }

        private void txtNombre_TextChanged(object sender, EventArgs e)
        {
            herramienta.buscarNombreHerramienta(txtNombre.Text, dataHerramienta);
        }

        private void btnActualizar_Click(object sender, EventArgs e)
        {
            if (dataHerramienta.CurrentRow.Cells["cantidadIngresada"].Value.ToString() == "" ||
                dataHerramienta.CurrentRow.Cells["cantidadIngresada"].Value.ToString() == 0.ToString()) 
            {
                MessageBox.Show("Debe ingresar una cantidad ingresada de la herramienta seleccionada");
            }
            else
            {
                herramienta.nro = int.Parse(dataHerramienta.CurrentRow.Cells["nro"].Value.ToString());
                herramienta.actualizarStock(herramienta, int.Parse(dataHerramienta.CurrentRow.Cells["cantidadIngresada"].Value.ToString()));
                herramienta.mostrarStock(dataHerramienta);
            }
            btnActualizar.Enabled = false;
        }

        private void actualizarStockHerramientas_Load(object sender, EventArgs e)
        {
            herramienta.mostrarStock(dataHerramienta);
        }

        private void dataHerramienta_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            btnActualizar.Enabled = true;
        }

        private void dataHerramienta_DataError(object sender, DataGridViewDataErrorEventArgs e)
        {
            MessageBox.Show("Ingrese un numero entero mayor a 0");
        }
    }
}
