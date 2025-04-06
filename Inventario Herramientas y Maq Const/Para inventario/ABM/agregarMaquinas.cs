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
    public partial class agregarMaquinas : Form
    {  
        public agregarMaquinas()
        {
            InitializeComponent();
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();
            ventana.Show(); 
            this.Close();
        }

        private void agregarMaquinas_Load(object sender, EventArgs e)
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
            while (bandera)
            {
                try
                {
                    if (int.Parse(maskCantidad.Text) > 0)
                    {
                        btnAgregar.Enabled = true;
                        checkCantidad.Enabled = true;
                        checkCantidad.Checked = true;
                        checkCantidad.Text = "";
                        checkCantidad.FlatStyle = FlatStyle.Flat;
                        checkCantidad.ForeColor = checkCantidad.Checked ? Color.Green : Color.Red;
                    }
                    else
                    {
                        btnAgregar.Enabled = false;
                        checkCantidad.Enabled = true;
                        checkCantidad.Checked = false;
                        checkCantidad.Text = "Debe ingresar una cantidad mayor que 0";
                        checkCantidad.FlatStyle = FlatStyle.Flat;
                        checkCantidad.ForeColor = checkCantidad.Checked ? Color.Red : Color.Red;
                    }
                }
                catch (Exception)
                {
                    btnAgregar.Enabled = false;
                    bandera = false;
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
                if (txtLugar.Text == "" || txtMarca.Text == "" || txtNombre.Text == "")
                {
                    MessageBox.Show("Falta completar algunos datos");
                }
                else
                {
                    Maquina maquina = new Maquina();
                    maquina.lugar = txtLugar.Text;
                    maquina.cantidad = int.Parse(maskCantidad.Text);
                    maquina.marca = txtMarca.Text;
                    maquina.nombre = txtNombre.Text;
                    maquina.agregar(maquina);
                    MessageBox.Show("Maquina con el nombre " + maquina.nombre + " y marca " + maquina.marca + " agregada exitósamente");
                    limpiarCampos();
                }
            }
            catch(Exception) 
            {
                MessageBox.Show("Error al agregar máquina");
            }
        }
    }
}
