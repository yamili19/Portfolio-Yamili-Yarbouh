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
    public partial class mostrarPrestamosED : Form
    {
        Prestamo prestamo = new Prestamo();
        public mostrarPrestamosED()
        {
            InitializeComponent();
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            prestamoED ventana = new prestamoED();
            ventana.Show();
            this.Close();
        }

        private void dataPrestamos_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            btnRegistrarDev.Enabled = true;
        }

        private void btnBuscar_Click(object sender, EventArgs e)
        {
            prestamo.buscarPorEncargado(txtEncargado.Text, dataPrestamos);
        }

        private void mostrarPrestamosED_Load(object sender, EventArgs e)
        {
            prestamo.mostrarPrestamosED(dataPrestamos);
        }

        private void btnRegistrarDev_Click(object sender, EventArgs e)
        {
            if (dataPrestamos.CurrentRow.Cells["fechaDevolucion"].Value.ToString() == "")
            {
                prestamo.nroInventario = int.Parse(dataPrestamos.CurrentRow.Cells["nro"].Value.ToString());
                prestamo.codigo = int.Parse(dataPrestamos.CurrentRow.Cells["codigo"].Value.ToString());
                prestamo.fechaPrestamo = Convert.ToDateTime(dataPrestamos.CurrentRow.Cells["fechaPrestamo"].Value.ToString());
                prestamo.registrarDevED(prestamo);
                dataPrestamos.CurrentRow.Cells["fechaDevolucion"].Value = DateTime.Now.Date.ToString();
                btnRegistrarDev.Enabled = false;
            }
            else
            {
                MessageBox.Show("Ya se registró la devolución del préstamo seleccionado");
            }
        }
    }
}
