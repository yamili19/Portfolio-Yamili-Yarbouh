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

namespace Para_inventario.ABM
{
    public partial class crearUsuario : Form
    {
        
        public crearUsuario()
        {
            InitializeComponent();
        }

        private void btnCerrar_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();
            ventana.Show();
            this.Close();
        }

        private void btnCrearUsuario_Click_1(object sender, EventArgs e)
        {
            Usuario user = new Usuario();
            user.nombreUsuario = txtUsuario.Text;
            user.contraseña = txtContraseña.Text;
            user.verificarUsuario(user, ValoresPublicos.listaUsuarios);
        }
    }
}
