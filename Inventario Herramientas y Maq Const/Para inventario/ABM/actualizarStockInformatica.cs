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
    public partial class actualizarStockInformatica : Form
    {
        Informática informatica = new Informática();
        public actualizarStockInformatica()
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
            informatica.consultarNombre(txtNombre, dataI);
        }

        private void actualizarStockInformatica_Load(object sender, EventArgs e)
        {
            informatica.mostrarStock(dataI);
        }

        private void dataI_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            btnActualizar.Enabled = true;
        }

        private void btnActualizar_Click(object sender, EventArgs e)
        {
            if (int.Parse(dataI.CurrentRow.Cells["cantidadIngresada"].Value.ToString()) == 0 ||
                dataI.CurrentRow.Cells["cantidadIngresada"].Value.ToString() == "")
            {
                MessageBox.Show("Ingrese una cantidad ingresada del elemento de informatica seleccionado");
            }
            else
            {
                informatica.nro = int.Parse(dataI.CurrentRow.Cells["nro"].Value.ToString());
                informatica.actualizarStock(informatica, int.Parse(dataI.CurrentRow.Cells["cantidadIngresada"].Value.ToString()));
                btnActualizar.Enabled = false;
                informatica.mostrarStock(dataI);
            }
        }

        private void dataI_DataError(object sender, DataGridViewDataErrorEventArgs e)
        {
            MessageBox.Show("Ingrese un numero entero mayor a 0");
        }
    }
}
