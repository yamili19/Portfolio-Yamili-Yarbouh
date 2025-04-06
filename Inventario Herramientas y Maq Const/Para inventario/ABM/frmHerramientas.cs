using Para_inventario.Clases;
using Para_inventario.Interfaces;
using Para_inventario.Servicios;

namespace Para_inventario
{
    public partial class frmHerramientas : Form
    {
        bool bandera = false;
        public frmHerramientas()
        {
            InitializeComponent();
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();  
            ventana.Show();
            this.Close();
        }

        private void frmHerramientas_Load(object sender, EventArgs e)
        {
            btnAgregar.Enabled = false;
            checkCantidad.Enabled = false;
        }

        private void maskedTextBox1_TextChanged(object sender, EventArgs e)
        {
            if (maskCantidad.Text != null)
            {
                bandera = true;
            }
            if (bandera == true)
            {
                try
                {
                    if (Convert.ToInt32(maskCantidad.Text) > 0)
                    {
                        checkCantidad.Checked = true;
                        btnAgregar.Enabled = true;
                        checkCantidad.Text = "";
                        checkCantidad.Enabled = true;
                        checkCantidad.FlatStyle = FlatStyle.Flat;
                        checkCantidad.ForeColor = checkCantidad.Checked? Color.Green : Color.Red;
                    }
                    else
                    {
                        btnAgregar.Enabled = false;
                        checkCantidad.Checked = false;
                        checkCantidad.Enabled = true;
                        checkCantidad.Text = "Error, debe ingresar un numero mayor que 0";
                        checkCantidad.FlatStyle = FlatStyle.Flat;
                        checkCantidad.ForeColor = checkCantidad.Checked ? Color.Red : Color.Red;
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

        private void btnAgregar_Click(object sender, EventArgs e)
        {
            try
            {
                if (txtLugar.Text == "" || txtMarca.Text == "" || txtMaterial.Text == "" || txtNombre.Text == "")
                {
                    MessageBox.Show("Falta completar algunos datos");
                }
                else
                {
                    Herramienta herramienta = new Herramienta();
                    herramienta.cantidad = Convert.ToInt32(maskCantidad.Text);
                    herramienta.material = txtMaterial.Text;
                    herramienta.lugar = txtLugar.Text;
                    herramienta.marca = txtMarca.Text;
                    herramienta.nombre = txtNombre.Text;
                    herramienta.agregar(herramienta);
                    MessageBox.Show("Herramienta" + " " + herramienta.nombre + " " + herramienta.marca + " " + "agregada exitosamente");
                    limpiarCampos();
                }
            }
            catch (Exception)
            {
                MessageBox.Show("Error al agregar herramienta");
            }
        }

        private void limpiarCampos()
        {
            btnAgregar.Enabled = false; 
            checkCantidad.Checked = false;
            txtLugar.Text = "";
            txtMarca.Text = "";
            txtMaterial.Text = "";
            txtNombre.Text = "";
            maskCantidad.Text = null;
        }
    }
}