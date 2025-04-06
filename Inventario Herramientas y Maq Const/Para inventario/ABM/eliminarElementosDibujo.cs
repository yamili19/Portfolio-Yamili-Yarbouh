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
    public partial class eliminarElementosDibujo : Form
    {
        ElementoDibujo elemento = new ElementoDibujo();
        public eliminarElementosDibujo()
        {
            InitializeComponent();
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();  
            ventana.Show();
            this.Close();
        }

        private void dataEDEliminar_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            btnEliminar.Enabled = true; 
        }

        private void btnEliminar_Click(object sender, EventArgs e)
        {
            elemento.eliminar(dataEDEliminar, int.Parse(dataEDEliminar.CurrentRow.Cells["Codigo"].Value.ToString()));
            btnEliminar.Enabled = false;
        }

        private void eliminarElementosDibujo_Load_1(object sender, EventArgs e)
        {
            elemento.mostrarED(dataEDEliminar);
        }

        private void btnBuscar_Click(object sender, EventArgs e)
        {
            elemento.consultarNroInventario(txtCodigo, dataEDEliminar);
        }
    }
}
