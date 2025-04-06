using Para_inventario.Clases;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Para_inventario.Interfaces
{
    public partial class consultarInformatica : Form
    {
        Informática informatica = new Informática();
        public consultarInformatica()
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
            informatica.consultarNombre(txtNombre, dataIConsultr);
        }

        private void btnBuscar_Click(object sender, EventArgs e)
        {
            informatica.consultarNroInventario(txtCodigo, dataIConsultr);
        }

        private void consultarInformatica_Load(object sender, EventArgs e)
        {
            informatica.mostrar(dataIConsultr);
        }
    }
}
