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
    public partial class Consumos : Form
    {
        Consumible consumible = new Consumible();
        public Consumos()
        {
            InitializeComponent();
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();  
            ventana.Show();
            this.Close();
        }

        private void btnAgregar_Click(object sender, EventArgs e)
        {
            bool resultado = estaConsumible(Convert.ToInt32(comboConsumible.SelectedValue));
            if (comboConsumible.SelectedIndex == -1 || maskedCantidad.Text == null || resultado || maskedCantidad.Text == 0.ToString())
            {
                MessageBox.Show("Primero seleccione un consumible e ingrese una cantidad y por favor no repita consumible");
            }
            else
            {
                consumible.verificarCantidad(dataConsumibles, Convert.ToInt32(comboConsumible.SelectedValue), double.Parse(maskedCantidad.Text),
                       dataConsumos, dtFecha.Value);
                comboConsumible.SelectedIndex = -1;
                maskedCantidad.Text = null;
                btnEliminar.Enabled = false;
            }
        }

        private void Consumos_Load(object sender, EventArgs e)
        {
            consumible.mostrarNombreConsumible(comboConsumible);
            consumible.mostrar(dataConsumibles);
            btnEliminar.Enabled = false;
        }

        private void btnRegistrarConsumos_Click(object sender, EventArgs e)
        {
            if (dataConsumos.Rows.Count == 0)
            {
                MessageBox.Show("No hay consumos para registrar");
            }
            else
            {
                consumible.aregarConsumo(dataConsumos);
                comboConsumible.SelectedIndex = -1;
                maskedCantidad.Text = null;
                dataConsumos.Rows.Clear();
                btnEliminar.Enabled = false;
                consumible.mostrar(dataConsumibles);
            }
        }

        private void btnMostrarConsumos_Click(object sender, EventArgs e)
        {
            mostrarConsumos ventana = new mostrarConsumos();
            ventana.Show();
            this.Close();
        }

        private void dataConsumos_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            btnEliminar.Enabled = true;
        }

        private void btnEliminar_Click(object sender, EventArgs e)
        {
            dataConsumos.Rows.Remove(dataConsumos.CurrentRow);
            btnEliminar.Enabled = false;
        }

        private bool estaConsumible(int consumible)
        {
            bool bandera = false;
            for (int i = 0; i < dataConsumos.Rows.Count; i++)
            {
                if (dataConsumos.CurrentRow.Cells["nro_inventario"].Value.ToString() == consumible.ToString())
                {
                    bandera = true;
                    break;
                }
            }
            return bandera;
        }
    }
}
