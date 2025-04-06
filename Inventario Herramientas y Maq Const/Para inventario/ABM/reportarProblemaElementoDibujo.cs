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
    public partial class reportarProblemaElementoDibujo : Form
    {
        ElementoDibujo elemento = new ElementoDibujo();
        public reportarProblemaElementoDibujo()
        {
            InitializeComponent();
        }

        private void dataEDConsultar_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            btnReportar.Enabled = true;
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();
            ventana.Show();
            this.Close();
        }

        private void reportarProblemaElementoDibujo_Load(object sender, EventArgs e)
        {
            elemento.mostrarED(dataEDConsultar);
        }

        private void btnReportar_Click(object sender, EventArgs e)
        {
            int codigo = int.Parse(dataEDConsultar.CurrentRow.Cells["Codigo"].Value.ToString());
            string problema = dataEDConsultar.CurrentRow.Cells["Problema"].Value.ToString();
            if (problema == "")
            {
                MessageBox.Show("Debe ingresar un problema a reportar");
            }
            else
            {
                elemento.reportarProblema(codigo, problema);
            }
        }

        private void txtNombre_TextChanged(object sender, EventArgs e)
        {
            elemento.consultarNombre(txtNombre, dataEDConsultar);
        }

        private void btnBuscar_Click(object sender, EventArgs e)
        {
            elemento.consultarNroInventario(txtCodigo, dataEDConsultar);
        }
    }
}
