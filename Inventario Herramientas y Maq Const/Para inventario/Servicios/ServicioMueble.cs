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
    class ServicioMueble
    {
        private string cadenaBD = System.Configuration.ConfigurationManager.AppSettings["cadenaBD"];

        public void agregar(Mueble mueble)
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandText = "INSERT INTO Muebles (nombre, material, lugar, adquirido, cantidad, estado) VALUES (@n, @m, @l, @a, @c, 1)";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@n", mueble.nombre);
                cmd.Parameters.AddWithValue("@m", mueble.material);
                cmd.Parameters.AddWithValue("@l", mueble.lugar);
                cmd.Parameters.AddWithValue("@a", mueble.adquirido);
                cmd.Parameters.AddWithValue("@c", mueble.cantidad);
                cn.Open();
                cmd.ExecuteNonQuery();  
            }
            catch (Exception)
            {
                MessageBox.Show("Error al agregar mueble");
            }
            finally
            {
                cn.Close(); 
            }
        }

        public DataTable mostrar()
        {
            DataTable dt = new DataTable();
            SqlConnection cn = new SqlConnection(cadenaBD);
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandText = "mostrarMuebles";
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataAdapter ad = new SqlDataAdapter(cmd);
                cn.Open();
                ad.Fill(dt);
            }
            catch (Exception) 
            {
                MessageBox.Show("Error");
            }
            finally
            {
                cn.Close(); 
            }
            return dt;
        }

        public void eliminar(int nro)
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandText = "UPDATE Muebles SET estado = 0 WHERE nro = @n";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@n", nro);
                cn.Open();
                cmd.ExecuteNonQuery();  
            }
            catch(Exception) 
            {
                MessageBox.Show("Error al eliminar mueble");
            }
            finally
            {
                cn.Close(); 
            }
        }

        public void actualizar(Mueble mueble)
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandText = "UPDATE Muebles SET lugar = @l, cantidad = @c WHERE nro = @n";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@l", mueble.lugar);
                cmd.Parameters.AddWithValue("@c", mueble.cantidad);
                cmd.Parameters.AddWithValue("@n", mueble.nro);
                cn.Open();
                cmd.ExecuteNonQuery();  
            }
            catch (Exception)
            {
                MessageBox.Show("Error al actualizar mueble");
            }
            finally
            {
                cn.Close();
            }
        }
    }
}
