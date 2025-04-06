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
    public partial class actualizarSockMaquina : Form
    {
        Maquina maquina = new Maquina();
        public actualizarSockMaquina()
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
            maquina.consultarNombre(txtNombre, dataMa);
        }

        private void actualizarSockMaquina_Load(object sender, EventArgs e)
        {
            maquina.mostrarStock(dataMa);
        }

        private void dataMa_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            btnActualizar.Enabled = true;
        }

        private void btnActualizar_Click(object sender, EventArgs e)
        {
            if (dataMa.CurrentRow.Cells["cantidadIngresada"].Value.ToString() == 0.ToString() ||
                dataMa.CurrentRow.Cells["cantidadIngresada"].Value.ToString() == "")
            {
                MessageBox.Show("Ingrese la cantidad ingresada de la maquina seleccionada");
            }
            else
            {
                maquina.nro = int.Parse(dataMa.CurrentRow.Cells["nro"].Value.ToString());
                maquina.actualizarStock(maquina, int.Parse(dataMa.CurrentRow.Cells["cantidadIngresada"].Value.ToString()));
                maquina.mostrarStock(dataMa);
                btnActualizar.Enabled = false;
            }
        }

        private void dataMa_DataError(object sender, DataGridViewDataErrorEventArgs e)
        {
            MessageBox.Show("Ingrese un numero entero mayor a 0");
        }
    }
}
