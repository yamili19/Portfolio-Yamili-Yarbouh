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
    public partial class reportarProblemaMaquina : Form
    {
        Maquina maquina = new Maquina();
        public reportarProblemaMaquina()
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
            maquina.consultarNombre(txtNombre, dataMaquina);
        }

        private void reportarProblemaMaquina_Load_1(object sender, EventArgs e)
        {
            maquina.mostrar(dataMaquina);
        }

        private void btnReportar_Click_1(object sender, EventArgs e)
        {
            string problema = dataMaquina.CurrentRow.Cells["Problema"].Value.ToString();
            if (problema == "")
            {
                MessageBox.Show("Ingrese un problema a reportar");
            }
            else
            {
                int codigo = int.Parse(dataMaquina.CurrentRow.Cells["Codigo"].Value.ToString());
                maquina.reportarProblema(codigo, problema);
            }
        }

        private void btnBuscar_Click_1(object sender, EventArgs e)
        {
            maquina.consultarNroInventario(txtCodigo, dataMaquina);
        }
    }
}
