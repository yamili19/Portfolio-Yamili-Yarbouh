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
    public partial class mostrarPrestamosMaquinas : Form
    {
        Prestamo prestamo = new Prestamo();
        public mostrarPrestamosMaquinas()
        {
            InitializeComponent();
        }


        private void btnVolver_Click(object sender, EventArgs e)
        {
            prestamoMaquina ventana = new prestamoMaquina();
            ventana.Show();
            this.Close();
        }

        private void btnRegistrarDev_Click(object sender, EventArgs e)
        {
            if (dataPrestamos.CurrentRow.Cells["fechaDevolucion"].Value.ToString() == "")
            {
                prestamo.nroInventario = int.Parse(dataPrestamos.CurrentRow.Cells["nro"].Value.ToString());
                prestamo.codigo = int.Parse(dataPrestamos.CurrentRow.Cells["codigo"].Value.ToString());
                prestamo.fechaPrestamo = Convert.ToDateTime(dataPrestamos.CurrentRow.Cells["fechaPrestamo"].Value.ToString());
                prestamo.registrarDevMaquina(prestamo);
                dataPrestamos.CurrentRow.Cells["fechaDevolucion"].Value = DateTime.Now.Date.ToString();
                btnRegistrarDev.Enabled = false;
            }
            else
            {
                MessageBox.Show("El prestamo seleccionado ya fue devuelto");
            }
        }

        private void dataPrestamos_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            btnRegistrarDev.Enabled = true;
        }

        private void mostrarPrestamosMaquinas_Load(object sender, EventArgs e)
        {
            prestamo.mostrarPrestamosMaquinas(dataPrestamos);
        }

        private void btnBuscar_Click(object sender, EventArgs e)
        {
            prestamo.buscarPorEncargado(txtEncargado.Text, dataPrestamos);
        }
    }
}
