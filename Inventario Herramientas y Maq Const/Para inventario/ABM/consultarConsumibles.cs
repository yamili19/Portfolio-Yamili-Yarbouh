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
    public partial class consultarConsumibles : Form
    {
        Consumible consumible = new Consumible();
        public consultarConsumibles()
        {
            InitializeComponent();
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();
            ventana.Show();
            this.Close();
        }

        private void consultarConsumibles_Load(object sender, EventArgs e)
        {
            consumible.mostrar(dataConsumiblesConsultar);
        }

        private void txtNombre_TextChanged(object sender, EventArgs e)
        {
            consumible.consultarNombre(txtNombre, dataConsumiblesConsultar);
        }
    }
}
