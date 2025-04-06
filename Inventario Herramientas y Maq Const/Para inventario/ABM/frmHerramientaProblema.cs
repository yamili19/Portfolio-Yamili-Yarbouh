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
using System.Xml.Linq;

namespace Para_inventario.Interfaces
{
    public partial class frmHerramientaProblema : Form
    {
        Herramienta herramienta = new Herramienta();
        public frmHerramientaProblema()
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
            herramienta.buscarNombreHerramienta(txtNombre.Text, dataHConsultar);
        }

        private void frmHerramientaProblema_Load(object sender, EventArgs e)
        {
            herramienta.mostrarHerramienta(dataHConsultar);
        }

        private void btnBuscar_Click(object sender, EventArgs e)
        {
            herramienta.buscarNroInventario(txtCodigo, dataHConsultar);
        }

        private void btnActualizar_Click(object sender, EventArgs e)
        {
            string problema = dataHConsultar.CurrentRow.Cells["Problema"].Value.ToString();
            int codigo = int.Parse(dataHConsultar.CurrentRow.Cells["Codigo"].Value.ToString());
            if (problema == "")
            {
                MessageBox.Show("Debe ingresar un problema a reportar");
            }
            else
            {
                herramienta.reportarProblema(codigo, problema);
                dataHConsultar.Refresh();
            }
        }
    }
}
