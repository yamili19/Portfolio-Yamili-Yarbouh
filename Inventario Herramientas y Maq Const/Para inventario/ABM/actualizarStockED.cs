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
    public partial class actualizarStockED : Form
    {
        ElementoDibujo ele = new ElementoDibujo();
        public actualizarStockED()
        {
            InitializeComponent();
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();
            ventana.Show();
            this.Close();
        }

        private void dataED_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            btnActualizar.Enabled = true;
        }

        private void dataED_DataError(object sender, DataGridViewDataErrorEventArgs e)
        {
            MessageBox.Show("Ingrese un numero entero mayor a 0");
        }

        private void actualizarStockED_Load(object sender, EventArgs e)
        {
            ele.mostrarStock(dataED);
        }

        private void txtNombre_TextChanged(object sender, EventArgs e)
        {
            ele.consultarNombre(txtNombre, dataED);
        }

        private void btnActualizar_Click(object sender, EventArgs e)
        {
            if (dataED.CurrentRow.Cells["cantidadIngresada"].Value.ToString() == "" ||
                dataED.CurrentRow.Cells["cantidadIngresada"].Value.ToString() == 0.ToString())
            {
                MessageBox.Show("Debe ingresar una cantidad ingresada del elemento de dibujo seleccionado");
            }
            else
            {
                ele.nro = int.Parse(dataED.CurrentRow.Cells["nro"].Value.ToString());
                ele.actualizarStock(ele, int.Parse(dataED.CurrentRow.Cells["cantidadIngresada"].Value.ToString()));
                ele.mostrarStock(dataED);
            }
            btnActualizar.Enabled = false;
        }
    }
}
