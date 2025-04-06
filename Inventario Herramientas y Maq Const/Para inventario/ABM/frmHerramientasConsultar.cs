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
    public partial class frmHerramientasConsultar : Form
    {
        Herramienta herramienta = new Herramienta();
        public frmHerramientasConsultar()
        {
            InitializeComponent();
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();
            ventana.Show();
            this.Close();
        }

        private void frmHerramientasConsultar_Load(object sender, EventArgs e)
        {
            herramienta.mostrarHerramienta(dataHConsultar);
        }

        private void txtNombre_TextChanged(object sender, EventArgs e)
        {
            herramienta.buscarNombreHerramienta(txtNombre.Text, dataHConsultar);
        }

        private void btnBuscar_Click(object sender, EventArgs e)
        {
            herramienta.buscarNroInventario(txtCodigo, dataHConsultar);
        }
    }
}
