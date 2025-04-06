using Para_inventario.Clases;
using Para_inventario.Interfaces;
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
    public partial class prestamoHerramientas : Form
    {
        Herramienta herramientaaaa = new Herramienta();
        Prestamo prestamo = new Prestamo();
        public prestamoHerramientas()
        {
            InitializeComponent();
        }

        private void prestamoHerramientas_Load(object sender, EventArgs e)
        {
            herramientaaaa.mostrarHerramienta(dataHConsultar);
        }

        private void btnBuscar_Click(object sender, EventArgs e)
        {
            herramientaaaa.buscarNroInventario(txtCodigo, dataHConsultar);
        }

        private void dataHConsultar_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            btnRegistrarPrestamos.Enabled = true;
        }

        private void btnRegistrarPrestamos_Click(object sender, EventArgs e)
        {
            int cantidad = dataHConsultar.SelectedRows.Count;
            if (txtNombre.Text == "")
            {
                MessageBox.Show("Primero ingrese un solicitante para los préstamos");
            }
            else
            {
                prestamo.fechaPrestamo = DateTime.Now;
                prestamo.encargado = txtNombre.Text;
                prestamo.registrarPrestamoHerramienta(dataHConsultar, cantidad, prestamo);
                herramientaaaa.mostrarHerramienta(dataHConsultar);
                btnRegistrarPrestamos.Enabled = false;
            }
        }

        private void btnVolver_Click_1(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();
            ventana.Show();
            this.Close();
        }

        private void btnMostrarPrestamos_Click(object sender, EventArgs e)
        {
            mostrarPrestamoHerramienta ventana = new mostrarPrestamoHerramienta();
            ventana.Show();
            this.Close();
        }
    }
}
