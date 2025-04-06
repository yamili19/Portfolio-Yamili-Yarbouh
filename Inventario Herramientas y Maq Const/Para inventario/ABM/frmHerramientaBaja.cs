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
    public partial class frmHerramientaBaja : Form
    {
        Herramienta herramienta = new Herramienta();
        public frmHerramientaBaja()
        {
            InitializeComponent();
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal venta= new frmPrincipal();
            venta.Show();
            this.Close();
        }

        private void frmHerramientaBaja_Load(object sender, EventArgs e)
        {
            herramienta.mostrarHerramienta(dataHConsultar);
        }

        private void btnBuscar_Click(object sender, EventArgs e)
        {
            herramienta.buscarNroInventario(txtCodigo, dataHConsultar);
        }

        private void dataHConsultar_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            btnEliminar.Enabled = true;
        }

        private void btnEliminar_Click(object sender, EventArgs e)
        {
            int codigo = int.Parse(dataHConsultar.CurrentRow.Cells["Codigo"].Value.ToString());
            herramienta.eliminar(dataHConsultar, codigo);
        }
    }
}
