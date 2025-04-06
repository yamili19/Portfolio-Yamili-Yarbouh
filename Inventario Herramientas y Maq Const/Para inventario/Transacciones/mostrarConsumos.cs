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

namespace Para_inventario.Transacciones
{
    public partial class mostrarConsumos : Form
    {
        Consumible consumible = new Consumible();
        public mostrarConsumos()
        {
            InitializeComponent();
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            Consumos ventana = new Consumos();
            ventana.Show(); 
            this.Close();
        }

        private void mostrarConsumos_Load(object sender, EventArgs e)
        {
            consumible.mostrarConsumos(dataConsumos);
        }
    }
}
