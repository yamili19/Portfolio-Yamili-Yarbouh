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
    public partial class elementosDibujoAgregar : Form
    {
        public elementosDibujoAgregar()
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
            try
            {
                if (txtNombre.Text == "")
                {
                    MessageBox.Show("Falta completar algunos datos");
                }
                else
                {
                    ElementoDibujo elementoDibujo = new ElementoDibujo();
                    elementoDibujo.nombre = txtNombre.Text;
                    elementoDibujo.cantidadDisponible = int.Parse(maskCantidadComprada.Text);
                    elementoDibujo.cantidadComprada = int.Parse(maskCantidadComprada.Text);
                    elementoDibujo.agregar(elementoDibujo);
                    MessageBox.Show("Elemento de dibujo " + elementoDibujo.nombre + " " + "agregado exitosamente");
                    limpiarCampos();
                }
            }
            catch(Exception) 
            {
                MessageBox.Show("Error al agregar elemento de dibujo");
            }
        }

        private void maskedTextBox1_TextChanged(object sender, EventArgs e)
        {
            bool bandera = false;
            if (maskCantidadComprada.Text != null)
            {
                bandera = true;
            }
            while (bandera == true)
            {
                try
                {
                    if (int.Parse(maskCantidadComprada.Text) > 0)
                    {
                        btnAgregar.Enabled = true;
                        checkCantidad.Checked = true;
                        checkCantidad.Text = "";
                        checkCantidad.Enabled= true;
                        checkCantidad.FlatStyle = FlatStyle.Flat;
                        checkCantidad.ForeColor = checkCantidad.Checked ? Color.Green : Color.Red;                     }
                    else
                    {
                        checkCantidad.Checked = false;
                        checkCantidad.Text = "Debe ingresar una cantidad mayor que 0";
                        checkCantidad.Enabled= true;
                        checkCantidad.FlatStyle= FlatStyle.Flat;
                        checkCantidad.ForeColor = checkCantidad.Checked? Color.Red : Color.Red;
                    }
                }
                catch (Exception)
                { 
                    bandera = false;
                    btnAgregar.Enabled = false;
                }
                finally
                {
                    bandera = false;
                }
            }
        }

        private void elementosDibujoAgregar_Load(object sender, EventArgs e)
        {
            btnAgregar.Enabled = false;
            checkCantidad.Enabled = false;  
        }

        private void limpiarCampos()
        {
            btnAgregar.Enabled = false;
            txtNombre.Text = "";
            maskCantidadComprada.Text = null;
            checkCantidad.Checked = false;
        }
    }
}
