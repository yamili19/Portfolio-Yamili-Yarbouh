using Para_inventario.Clases;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Para_inventario.Interfaces
{
    public partial class actualizarMueble : Form
    {
        Mueble mueble = new Mueble();
        public actualizarMueble()
        {
            InitializeComponent();
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();
            ventana.Show();
            this.Close();
        }

        private void actualizarMueble_Load(object sender, EventArgs e)
        {
            btnActualizar.Enabled = false;
            mueble.mostrar(dataMuebleActualizar);
        }

        private void dataMuebleActualizar_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            btnActualizar.Enabled = true;
        }

        private void btnActualizar_Click(object sender, EventArgs e)
        {
            if (int.Parse(dataMuebleActualizar.CurrentRow.Cells["cantidad"].Value.ToString()) > 0)
            {
                mueble.actualizar(dataMuebleActualizar);
            }
            else
            {
                MessageBox.Show("Ingrese un numero entero mayor a 0 en la columna cantidad");
            }
            btnActualizar.Enabled = false;
            dataMuebleActualizar.Refresh();
        }

        private void dataMuebleActualizar_DataError(object sender, DataGridViewDataErrorEventArgs e)
        {
            MessageBox.Show("ingrese un numero entero mayor a 0 en la columna cantidad");
        }
    }
}
