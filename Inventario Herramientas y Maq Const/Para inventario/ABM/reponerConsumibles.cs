using Para_inventario.Clases;
using Para_inventario.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Para_inventario.ABM
{
    public partial class reponerConsumibles : Form
    {
        bool bandera = false;
        Consumible consumible = new Consumible();
        public reponerConsumibles()
        {
            InitializeComponent();
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();
            ventana.Show();
            this.Close();
        }

        private void reponerConsumibles_Load(object sender, EventArgs e)
        {
            consumible.mostrarNombreConsumible(comboConsumible);
        }

        private void btnReponer_Click(object sender, EventArgs e)
        {
            if (comboConsumible.SelectedIndex == -1)
            {
                MessageBox.Show("Primero seleccione un consumible");
            }
            else
            {
                consumible.nro = Convert.ToInt32(comboConsumible.SelectedValue);
                consumible.cantidadComprada = double.Parse(maskCantidad.Text);
                consumible.reponerConsumible(consumible);
            }
        }

        private void maskedCantidad_TextChanged(object sender, EventArgs e)
        {
            bool bandera = false;
            if (maskCantidad.Text != null)
            {
                bandera = true;
            }
            if (bandera)
            {
                try
                {
                    if (double.Parse(maskCantidad.Text) > 0)
                    {
                        checkCantidad.Text = "";
                        btnReponer.Enabled = true;
                        checkCantidad.Checked = true;
                        checkCantidad.Enabled = true;
                        checkCantidad.FlatStyle = FlatStyle.Flat;
                        checkCantidad.ForeColor = checkCantidad.Checked ? Color.Green : Color.Red;
                    }
                    else
                    {
                        btnReponer.Enabled = false; 
                        checkCantidad.Checked = false;
                        checkCantidad.Text = "Debe ingresar una cantidad mayor que 0";
                        checkCantidad.Enabled = true;
                        checkCantidad.FlatStyle = FlatStyle.Flat;
                        checkCantidad.ForeColor = checkCantidad.Enabled ? Color.Red : Color.Red;
                    }
                }
                catch (Exception)
                {
                    bandera = false;
                    btnReponer.Enabled = false;
                    checkCantidad.Checked = false;
                }
                finally
                {
                    bandera = false;
                }
            }
        }

        private void limpiarCampos()
        {
            comboConsumible.SelectedIndex = -1;
            maskCantidad.Text = null;
            checkCantidad.Text = "";
            checkCantidad.Checked = false;
            btnReponer.Enabled = false;
        }
    }
}
