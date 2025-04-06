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
    public partial class prestamosInformatica : Form
    {
        Prestamo prestamo = new Prestamo();
        Informática informatica = new Informática();
        public prestamosInformatica()
        {
            InitializeComponent();
        }

  
        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();
            ventana.Show();
            this.Close();
        }


        private void btnMostrarPrestamos_Click(object sender, EventArgs e)
        {
            mostrarPrestamosInformatica ventana = new mostrarPrestamosInformatica();
            ventana.Show();
            this.Close();
        }

        private void dataInformatica_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            btnRegistrarPrestamos.Enabled = true;
        }

        private void btnBuscar_Click(object sender, EventArgs e)
        {
            informatica.consultarNroInventario(txtCodigo, dataInformatica);
        }

        private void prestamosInformatica_Load(object sender, EventArgs e)
        {
            informatica.mostrar(dataInformatica);
        }

        private void btnRegistrarPrestamos_Click(object sender, EventArgs e)
        {
            int cant = dataInformatica.SelectedRows.Count;
            if (txtNombre.Text == "")
            {
                MessageBox.Show("Ingrese un solicitante del prestamo");
            }
            else
            {
                prestamo.fechaPrestamo = DateTime.Now;
                prestamo.encargado = txtNombre.Text;
                prestamo.registrarPrestamoInformatica(dataInformatica, cant, prestamo);
                btnRegistrarPrestamos.Enabled = false;
                informatica.mostrar(dataInformatica);
            }
        }
    }
}
