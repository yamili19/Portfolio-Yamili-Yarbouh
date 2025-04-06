using Para_inventario.Clases;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Para_inventario.Interfaces
{
    public partial class consultarMaquina : Form
    {
        Maquina maquina = new Maquina();
        public consultarMaquina()
        {
            InitializeComponent();
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();
            ventana.Show();
            this.Close();
        }

        private void consultarMaquina_Load(object sender, EventArgs e)
        {
            maquina.mostrar(dataMaquinaConsultar);
        }

        private void txtNombre_TextChanged(object sender, EventArgs e)
        {
            maquina.consultarNombre(txtNombre, dataMaquinaConsultar);
        }

        private void btnBuscar_Click(object sender, EventArgs e)
        {
            maquina.consultarNroInventario(txtCodigo, dataMaquinaConsultar);
        }
    }
}
