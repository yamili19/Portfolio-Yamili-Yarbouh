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
    public partial class eliminarMaquina : Form
    {
        Maquina maquina = new Maquina();
        public eliminarMaquina()
        {
            InitializeComponent();
        }

        private void btnBuscar_Click(object sender, EventArgs e)
        {
            maquina.consultarNroInventario(txtCodigo, dataMaquinaConsultar);
        }

        private void eliminarMaquina_Load(object sender, EventArgs e)
        {
            maquina.mostrar(dataMaquinaConsultar);
            btnEliminar.Enabled = false;
        }

        private void dataMaquinaConsultar_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            btnEliminar.Enabled = true; 
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();
            ventana.Show();
            this.Close();
        }

        private void btnEliminar_Click(object sender, EventArgs e)
        {
            maquina.eliminar(dataMaquinaConsultar);
        }
    }
}
