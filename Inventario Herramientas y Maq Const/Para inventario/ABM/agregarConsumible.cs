using Para_inventario.Clases;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics.Contracts;
using System.Drawing;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Para_inventario.Interfaces
{
    public partial class agregarConsumible : Form
    {
        Consumible consumible = new Consumible();
        public agregarConsumible()
        {
            InitializeComponent();
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();
            ventana.Show();
            this.Close();
        }

        private void maskCantidadComprada_TextChanged(object sender, EventArgs e)
        {
            bool bandera = false;
            if (maskCantidadComprada.Text != null)
            {
                bandera= true;
            }
            if (bandera)
            {
                try
                {
                    if (double.Parse(maskCantidadComprada.Text) > 0)
                    {
                        checkCantidad.Text = "";
                        btnAgregar.Enabled = true;
                        checkCantidad.Checked= true;    
                        checkCantidad.Enabled = true;
                        checkCantidad.FlatStyle = FlatStyle.Flat;
                        checkCantidad.ForeColor = checkCantidad.Checked? Color.Green : Color.Red;   
                    }
                    else
                    {
                        btnAgregar.Enabled = false;
                        checkCantidad.Checked = false;
                        checkCantidad.Text = "Debe ingresar una cantidad mayor que 0";
                        checkCantidad.Enabled = true;
                        checkCantidad.FlatStyle= FlatStyle.Flat;
                        checkCantidad.ForeColor = checkCantidad.Enabled? Color.Red : Color.Red;
                    }
                }
                catch (Exception) 
                {
                    bandera = false;
                    btnAgregar.Enabled = false;
                    checkCantidad.Checked = false;
                }
                finally
                {
                    bandera = false;
                }
            }
        }

        private void agregarConsumible_Load(object sender, EventArgs e)
        {
            btnAgregar.Enabled = false;
            checkCantidad.Enabled= false;
        }

        private void limpiarCampos()
        {
            btnAgregar.Enabled = false;
            checkCantidad.Checked = false;  
            txtNombre.Text = "";
            maskCantidadComprada.Text = null;
            txtUnidad.Text = "";
        }

        private void btnAgregar_Click(object sender, EventArgs e)
        {
            try
            {
                if (int.TryParse(maskCantidadComprada.Text, out int result))
                {
                    if (txtNombre.Text == "")
                    {
                        MessageBox.Show("Falta completar algunos datos");
                    }
                    else
                    {
                        Consumible consumible = new Consumible();
                        consumible.nombre = txtNombre.Text;
                        consumible.cantidadDisponible = double.Parse(maskCantidadComprada.Text);
                        consumible.cantidadComprada = double.Parse(maskCantidadComprada.Text);
                        consumible.unidad = "unidades";
                        consumible.agregar(consumible);
                        MessageBox.Show("Consumible agregado exitósamente");
                        limpiarCampos();
                    }
                }
                else
                {
                    if (txtUnidad.Text == "" || txtNombre.Text == "")
                    {
                        MessageBox.Show("Falta completar algunos datos");
                    }
                    else
                    {
                        Consumible consumible = new Consumible();
                        consumible.nombre = txtNombre.Text;
                        consumible.cantidadComprada = double.Parse(maskCantidadComprada.Text);
                        consumible.cantidadDisponible = double.Parse(maskCantidadComprada.Text);
                        consumible.unidad = txtUnidad.Text;
                        consumible.agregar(consumible);
                        MessageBox.Show("Consumuble agregado exitósamente");
                        limpiarCampos();
                    }
                }
            }
            catch (Exception)
            {
                MessageBox.Show("Error al agregar consumible");
            }
        }
    }
}
