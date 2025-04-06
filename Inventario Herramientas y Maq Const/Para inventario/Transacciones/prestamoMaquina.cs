using Para_inventario.Clases;
using Para_inventario.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Text;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Para_inventario.Transacciones
{
    public partial class prestamoMaquina : Form
    {
        Maquina m = new Maquina();
        Prestamo prestamo = new Prestamo();
        public prestamoMaquina()
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
            mostrarPrestamosMaquinas ventana = new mostrarPrestamosMaquinas();
            ventana.Show();
            this.Close();    
        }

        private void prestamoMaquina_Load(object sender, EventArgs e)
        {
            m.mostrar(dataMaquina);
        }

        private void btnRegistrarPrestamos_Click(object sender, EventArgs e)
        {
            if (txtNombre.Text == "")
            {
                MessageBox.Show("Ingrese un solicitante del prestamo");
            }
            else
            {
                int cant = dataMaquina.SelectedRows.Count;
                prestamo.fechaPrestamo = DateTime.Now;
                prestamo.encargado = txtNombre.Text;
                prestamo.registrarPrestamoMaquina(dataMaquina, cant, prestamo);
                btnRegistrarPrestamos.Enabled = false;
                m.mostrar(dataMaquina);
            }
        }

        private void btnBuscar_Click(object sender, EventArgs e)
        {
            m.consultarNroInventario(txtCodigo, dataMaquina);
        }

        private void dataMaquina_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            btnRegistrarPrestamos.Enabled = true;
        }
    }
}
