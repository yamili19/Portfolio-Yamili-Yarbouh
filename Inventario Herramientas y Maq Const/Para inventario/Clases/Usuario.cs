using Para_inventario.Servicios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Para_inventario.Clases
{
    class Usuario
    {
        public int nroUsuario { get; set; }
        public string nombreUsuario { get; set; }
        public string contraseña { get; set; }

        public Usuario() { }

        public Usuario(int nroUsuario, string nombreUsuario, string contraseña)
        {
            this.nroUsuario = nroUsuario;
            this.nombreUsuario = nombreUsuario;
            this.contraseña = contraseña;
        }

        public void mostrar(DataGridView usuarios)
        {
            servicioUsuario servicio = new servicioUsuario();
            usuarios.DataSource = servicio.mostrarUsuarios();
        }

        public void crear(Usuario usuario)
        {
            servicioUsuario servicio = new servicioUsuario();
            servicio.crear(usuario);
        }

        public void verificarUsuario(Usuario usuario, DataGridView Usuarios)
        {
            bool bandera = false;
            for (int i = 0; i < Usuarios.Rows.Count;i++)
            {
                if (Usuarios.Rows[i].Cells["nombreUsuario"].Value.ToString() == usuario.nombreUsuario)
                {
                    bandera = true;
                    MessageBox.Show("El nombre de usuario ingresado ya existe, por favor ingrese otro");
                    break;
                }
            }
            if (bandera == false)
            {
                this.crear(usuario);
                this.mostrar(Usuarios);  
            }
        }

        public (bool,int) login(Usuario usuario, DataGridView usuarios)
        {
            bool bandera = false;
            int numero = 0;
            for (int i = 0; i < usuarios.Rows.Count; i++)
            {
                if (usuarios.Rows[i].Cells["nombreUsuario"].Value.ToString() == usuario.nombreUsuario &&
                    usuarios.Rows[i].Cells["contraseña"].Value.ToString() == usuario.contraseña)
                {
                    numero = int.Parse(usuarios.Rows[i].Cells["nroUsuario"].Value.ToString());
                    bandera = true;
                    break;
                }
            }
            return (bandera, numero);
        }

        public void eliminar(Usuario usuario) 
        {
            servicioUsuario servicio = new servicioUsuario();
            servicio.eliminar(usuario); 
        }
    }
}
