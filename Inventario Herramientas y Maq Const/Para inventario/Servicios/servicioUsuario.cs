using Para_inventario.Clases;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Para_inventario.Servicios
{
    class servicioUsuario
    {
        private string cadenaBD = System.Configuration.ConfigurationManager.AppSettings["cadenaBD"];
        
        public DataTable mostrarUsuarios()
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cmd.CommandText = "SELECT * FROM Usuario WHERE estado = 1 ORDER BY nombreUsuario";
            DataTable dt = new DataTable();
            cn.Open();  
            SqlDataAdapter ad = new SqlDataAdapter(cmd);
            ad.Fill(dt);
            cn.Close(); 
            return dt;
        }

        public void crear(Usuario usuario)
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandText = "INSERT INTO Usuario (nombreUsuario, contraseña) VALUES (@n, @c)";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@n", usuario.nombreUsuario);
                cmd.Parameters.AddWithValue("@c", usuario.contraseña);
                cn.Open();
                cmd.ExecuteNonQuery();
                MessageBox.Show("Usuario creado exitósamente");
            }
            catch(Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            finally
            {
                cn.Close();
            }
        }

        public void eliminar(Usuario usuario)
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandText = "UPDATE Usuario set estado = 0 where nroUsuario = @n";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@n", usuario.nroUsuario);
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex) 
            {
                MessageBox.Show(ex.Message);    
            }
            finally
            {
                cn.Close(); 
            }
        }
    }
}
