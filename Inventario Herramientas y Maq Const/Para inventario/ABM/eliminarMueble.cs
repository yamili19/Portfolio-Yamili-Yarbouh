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
    public partial class eliminarMueble : Form
    {
        Mueble mueble = new Mueble();
        public eliminarMueble()
        {
            InitializeComponent();
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();
            ventana.Show();
            this.Close();
        }

        private void dataMuebleEliminar_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            btnEliminar.Enabled = true;
        }

        private void eliminarMueble_Load(object sender, EventArgs e)
        {
            btnEliminar.Enabled = false;
            mueble.mostrar(dataMuebleEliminar);
        }

        private void btnEliminar_Click(object sender, EventArgs e)
        {
            mueble.eliminar(dataMuebleEliminar);
            dataMuebleEliminar.Rows.Remove(dataMuebleEliminar.CurrentRow);
            dataMuebleEliminar.Refresh();   
        }
    }
}
