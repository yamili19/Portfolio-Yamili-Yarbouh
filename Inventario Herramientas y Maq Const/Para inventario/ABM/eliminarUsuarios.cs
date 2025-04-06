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
    public partial class eliminarUsuarios : Form
    {
        Usuario usuario = new Usuario();
        public eliminarUsuarios()
        {
            InitializeComponent();
        }

        private void btnVolver_Click(object sender, EventArgs e)
        {
            frmPrincipal ventana = new frmPrincipal();
            ventana.Show();
            this.Close();
        }

        private void eliminarUsuarios_Load(object sender, EventArgs e)
        {
            usuario.mostrar(dataUsuarios);
            btnEliminar.Enabled = false;
        }

        private void btnEliminar_Click(object sender, EventArgs e)
        {
            usuario.nroUsuario = int.Parse(dataUsuarios.CurrentRow.Cells["nroUsuario"].Value.ToString());
            usuario.nombreUsuario = dataUsuarios.CurrentRow.Cells["nombreUsuario"].Value.ToString();
            if (usuario.nroUsuario != 4)
            {
                DialogResult resultdo = MessageBox.Show("¿Está seguro de eliminar al usuario con nro de usaurio " + usuario.nroUsuario + " " +
                       "y nombre de usuario " + usuario.nombreUsuario + "?", "Información", MessageBoxButtons.YesNo);
                if (resultdo == DialogResult.Yes)
                {
                    usuario.eliminar(usuario);
                    dataUsuarios.Rows.Remove(dataUsuarios.CurrentRow);
                    dataUsuarios.Refresh();
                    ValoresPublicos.listaUsuarios = dataUsuarios;
                }
            }
            else
            {
                MessageBox.Show("No se puede eliminar al usuario administrador");
            }
        }

        private void dataUsuarios_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            btnEliminar.Enabled = true;
        }
    }
}
