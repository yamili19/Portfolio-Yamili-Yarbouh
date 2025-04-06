using Microsoft.VisualBasic;
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
    public partial class reportarProblemaInformatica : Form
    {
        Informática informatica = new Informática();
        public reportarProblemaInformatica()
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
            informatica.consultarNombre(txtNombre, dataIConsultar);
        }

        private void btnBuscar_Click(object sender, EventArgs e)
        {
            informatica.consultarNroInventario(txtCodigo, dataIConsultar);
        }

        private void reportarProblemaInformatica_Load(object sender, EventArgs e)
        {
            informatica.mostrar(dataIConsultar);
        }

        private void btnReportar_Click(object sender, EventArgs e)
        {
            int codigo = int.Parse(dataIConsultar.CurrentRow.Cells["Codigo"].Value.ToString());
            string problema = dataIConsultar.CurrentRow.Cells["Problema"].Value.ToString();
            if (problema == "")
            {
                MessageBox.Show("Ingrese un problema reportar");
            }
            else
            {
                informatica.reportarProblema(codigo, problema);
                dataIConsultar.Refresh();
            }
        }
    }
}
