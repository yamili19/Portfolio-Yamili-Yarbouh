using Para_inventario.Clases;
using Para_inventario.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Para_inventario.Transacciones
{
    public partial class prestamoED : Form
    {
        ElementoDibujo ed = new ElementoDibujo();
        Prestamo prestamo = new Prestamo();
        public prestamoED()
        {
            InitializeComponent();
        }

        private void btnRegistrarPrestamos_Click(object sender, EventArgs e)
        {
            int cant = dataEDConsultar.SelectedRows.Count;
            if (txtNombre.Text == "")
            {
                MessageBox.Show("Primero ingrese un solicitante del préstamo");
            }
            else
            {
                prestamo.encargado = txtNombre.Text;
                prestamo.registrarPrestamoED(dataEDConsultar, cant, prestamo);
                ed.mostrarED(dataEDConsultar);
                btnRegistrarPrestamos.Enabled = false;  
            }
        }

        private void prestamoED_Load(object sender, EventArgs e)
        {
            lblUser.Text = "Usuario: " + ValoresPublicos.nombreUsuario;
            ed.mostrarED(dataEDConsultar);
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();
            ventana.Show();
            this.Close();
        }


        private void btnMostrarPrestamos_Click(object sender, EventArgs e)
        {
            mostrarPrestamosED ventana = new mostrarPrestamosED();
            ventana.Show();
            this.Close();
        }

        private void dataEDConsultar_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            btnRegistrarPrestamos.Enabled = true;   
        }

        private void btnBuscar_Click(object sender, EventArgs e)
        {
            ed.consultarNroInventario(txtCodigo, dataEDConsultar);
        }
    }
}
