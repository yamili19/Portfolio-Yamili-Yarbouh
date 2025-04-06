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
    public partial class consultarMueble : Form
    {
        Mueble mueble = new Mueble();
        public consultarMueble()
        {
            InitializeComponent();
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();
            ventana.Show();
            this.Close();
        }

        private void consultarMueble_Load(object sender, EventArgs e)
        {
            mueble.mostrar(dataMuebleConsultar);
        }

        private void txtNroInventario_TextChanged(object sender, EventArgs e)
        {
            mueble.consultarNroInventario(txtNroInventario, dataMuebleConsultar);
        }

        private void txtNombre_TextChanged(object sender, EventArgs e)
        {
            mueble.consultarNombre(txtNombre, dataMuebleConsultar);
        }
    }
}
