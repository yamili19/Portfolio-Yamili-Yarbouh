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
    public partial class agregarMueble : Form
    {
        public agregarMueble()
        {
            InitializeComponent();
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();
            ventana.Show();
            this.Close();
        }

        private void agregarMueble_Load(object sender, EventArgs e)
        {
            btnAgregar.Enabled = false;
            checkCantidad.Enabled = false;
        }

        private void maskCantidad_TextChanged(object sender, EventArgs e)
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
                    if (int.Parse(maskCantidad.Text) > 0)
                    {
                        checkCantidad.Checked = true;
                        btnAgregar.Enabled = true;
                        checkCantidad.Enabled = true;
                        checkCantidad.Text = "";
                        checkCantidad.FlatStyle = FlatStyle.Flat;
                        checkCantidad.ForeColor = checkCantidad.Checked? Color.Green : Color.Red;
                    }
                    else
                    {
                        checkCantidad.Checked = false;
                        btnAgregar.Enabled = false;
                        checkCantidad.Enabled = true;
                        checkCantidad.Text = "Debe ingresar una cantidad mayor que 0";
                        checkCantidad.FlatStyle = FlatStyle.Flat;
                        checkCantidad.ForeColor = checkCantidad.Checked ? Color.Red : Color.Red;
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

        private void limpiarCampos()
        {
            txtAdquirido.Text = "";
            txtLugar.Text = "";
            txtMaterial.Text = "";
            txtNombre.Text = "";
            maskCantidad.Text = null;
            btnAgregar.Enabled = false;
            checkCantidad.Checked = false;
        }

        private void btnAgregar_Click(object sender, EventArgs e)
        {
            try
            {
                if (txtAdquirido.Text == "" || txtLugar.Text == "" || txtMaterial.Text == "" || txtNombre.Text == "")
                {
                    MessageBox.Show("Falta completar algunos datos");
                }
                else
                {
                    Mueble mueble = new Mueble();
                    mueble.nombre = txtNombre.Text;
                    mueble.material = txtMaterial.Text;
                    mueble.adquirido = txtAdquirido.Text;
                    mueble.lugar = txtLugar.Text;
                    mueble.cantidad = int.Parse(maskCantidad.Text);
                    mueble.agregar(mueble);
                    MessageBox.Show("Mueble con nombre " + mueble.nombre + "agregado exitósamente");
                }
            }
            catch (Exception)
            {
                MessageBox.Show("Error al agregar mueble");
            }
            limpiarCampos();
        }
    }
}
