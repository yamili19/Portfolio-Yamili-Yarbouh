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
    public partial class agregarInformatica : Form
    {
        public agregarInformatica()
        {
            InitializeComponent();
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();
            ventana.Show(); 
            this.Close();    
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
                        checkCantidad.Checked= true;
                        checkCantidad.Enabled= true;
                        btnAgregar.Enabled= true;
                        checkCantidad.FlatStyle = FlatStyle.Flat;
                        checkCantidad.ForeColor = checkCantidad.Checked ? Color.Green: Color.Red;
                        checkCantidad.Text = "";
                    }
                    else
                    {
                        checkCantidad.Checked= false;
                        checkCantidad.Enabled= true;
                        btnAgregar.Enabled= false;  
                        checkCantidad.FlatStyle = FlatStyle.Flat;
                        checkCantidad.ForeColor = checkCantidad.Checked? Color.Red: Color.Red;
                        checkCantidad.Text = "Debe ingresar una cantidad mayor que 0";                    }
                }
                catch (Exception) 
                {
                    btnAgregar.Enabled = false;
                    bandera= false;
                }
                finally
                {
                    bandera = false;
                }
            }
        }

        private void agregarInformatica_Load(object sender, EventArgs e)
        {
            btnAgregar.Enabled = false;
            checkCantidad.Enabled = false;
        }

        private void limpiarCampos()
        {
            btnAgregar.Enabled = false;
            checkCantidad.Checked = false;
            txtLugar.Text = "";
            txtMarca.Text = "";
            txtNombre.Text = "";
            maskCantidad.Text = null;
        }

        private void btnAgregar_Click(object sender, EventArgs e)
        {
            try
            {
                if (txtNombre.Text == "" || txtMarca.Text == ""  || txtLugar.Text == "")
                {
                    MessageBox.Show("Falta completar algunos datos");
                }
                else
                {
                    Informática informatica = new Informática();
                    informatica.nombre = txtNombre.Text;
                    informatica.marca = txtMarca.Text;
                    informatica.lugar = txtLugar.Text;
                    informatica.cantidad = int.Parse(maskCantidad.Text);
                    informatica.agregar(informatica);
                    MessageBox.Show("Elemento de informática agregado exitósamente");
                    limpiarCampos();
                }
            }
            catch(Exception) 
            {
                MessageBox.Show("Error al agregar elemento de informática");
            }
        }
    }
}
