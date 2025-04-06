using Para_inventario.Clases;
using Para_inventario.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Para_inventario.ABM
{
    public partial class login : Form
    {
        Usuario usuario = new Usuario();
        public login()
        {
            InitializeComponent();
        }

        private void btnCerrar_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void login_Load(object sender, EventArgs e)
        {
            usuario.mostrar(dataUsuarios);
        }

        private void btnIniciarSesion_Click(object sender, EventArgs e)
        {
            if (txtContraseña.Text == "" || txtUsuario.Text == "")
            {
                MessageBox.Show("Por favor ingrese su nombre de usuario y contraseña para poder iniciar sesión");
            }
            else
            {
                usuario.nombreUsuario = txtUsuario.Text;
                usuario.contraseña = txtContraseña.Text;
                (bool bandera, int numero) = usuario.login(usuario, dataUsuarios);
                if (bandera)
                {
                    ValoresPublicos.nombreUsuario = txtUsuario.Text;
                    ValoresPublicos.nroUsuario = numero;
                    ValoresPublicos.listaUsuarios = dataUsuarios;
                    MessageBox.Show("Bienvenido: " + usuario.nombreUsuario);
                    frmPrincipal ventana = new frmPrincipal();
                    ventana.Show();
                    this.Hide();
                }
                else
                {
                    MessageBox.Show("El nombre de usuario o la contraseña ingresados son incorrectos");
                }
            }
        }
    }
}
