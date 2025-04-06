using Para_inventario.Clases;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Para_inventario.Servicios
{
    class ServicioMaquina
    {
        private string cadenaBD = System.Configuration.ConfigurationManager.AppSettings["cadenaBD"];

        public void agregar(Maquina elemento)
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cn.Open();
            cmd.Transaction = cn.BeginTransaction();
            try
            {
                cmd.CommandText = "SELECT ISNULL(MAX(nro), 0) FROM Maquinas";
                elemento.nro = (int)cmd.ExecuteScalar() + 1;
                cmd.CommandText = "INSERT INTO Maquinas (nro, nombre, marca, lugar, cantidad) " +
                    "VALUES (@nro, @nombre, @marca, @lugar, @cantidad)";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@nro", elemento.nro);
                cmd.Parameters.AddWithValue("@nombre", elemento.nombre);
                cmd.Parameters.AddWithValue("@marca", elemento.marca);
                cmd.Parameters.AddWithValue("@lugar", elemento.lugar);
                cmd.Parameters.AddWithValue("@cantidad", elemento.cantidad);
                cmd.ExecuteNonQuery();
                cmd.CommandText = "SELECT ISNULL(MAX(codigo), 3999) FROM Maquina WHERE estado = 1";
                int codigo = (int)cmd.ExecuteScalar() + 1;
                for (int i = 0; i < elemento.cantidad; i++)
                {
                    cmd.CommandText = "INSERT INTO Maquina (nroInventario, codigo) VALUES (@n, @c)";
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@n", elemento.nro);
                    cmd.Parameters.AddWithValue("@c", codigo);
                    cmd.ExecuteNonQuery();
                    codigo += 1;
                }
                cmd.Transaction.Commit();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
                cmd.Transaction.Rollback();
            }
            finally
            {
                cn.Close();
            }
        }

        public DataTable mostrar()
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            DataTable dt = new DataTable(); 
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandText = "mostrarMaquinas";
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

        public void eliminar(Maquina info, int codigo)
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cn.Open();
            cmd.Transaction = cn.BeginTransaction();
            try
            {
                cmd.CommandText = "UPDATE Maquina set estado = 0 where codigo = @c and estado = 1";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@c", codigo);
                cmd.ExecuteNonQuery();
                cmd.CommandText = "UPDATE Maquinas set cantidad = cantidad - 1 where nro = @n";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@n", info.nro);
                cmd.ExecuteNonQuery();
                cmd.Transaction.Commit();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
                cmd.Transaction.Rollback();
            }
            finally
            {
                cn.Close();
            }
        }

        public void reportarProblema(int codigo, string problema)
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cn.Open();
            cmd.Transaction = cn.BeginTransaction();
            try
            {
                cmd.CommandText = "UPDATE Maquina set problema = @p where estado = 1 and codigo = @c";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@p", problema);
                cmd.Parameters.AddWithValue("@c", codigo);
                cmd.ExecuteNonQuery();
                cmd.Transaction.Commit();
                MessageBox.Show("Problema reportado exitósamente");
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
                cmd.Transaction.Rollback();
            }
            finally
            {
                cn.Close();
            }
        }

        public DataTable mostrarStock()
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            DataTable dt = new DataTable();
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandText = "mostrarStockMaquinas";
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

        public void actualizarStock(Maquina elemento, int cant)
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cn.Open();
            cmd.Transaction = cn.BeginTransaction();
            try
            {
                cmd.CommandText = "UPDATE Maquinas SET cantidad = cantidad + @c " +
                    "WHERE nro = @n";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@c", cant);
                cmd.Parameters.AddWithValue("@n", elemento.nro);
                cmd.ExecuteNonQuery();
                cmd.CommandText = "SELECT ISNULL(MAX(codigo), 3999) from Maquina WHERE estado = 1";
                int codigo = (int)cmd.ExecuteScalar() + 1;
                for (int i = 0; i < cant; i++)
                {
                    cmd.CommandText = "INSERT INTO Maquina (nroInventario, codigo) VALUES (@n, @c)";
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@n", elemento.nro);
                    cmd.Parameters.AddWithValue("@c", codigo);
                    cmd.ExecuteNonQuery();
                    codigo += 1;
                }
                cmd.Transaction.Commit();
                MessageBox.Show("Stock actualizado exitósamente");
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
                cmd.Transaction.Rollback();
            }
            finally
            {
                cn.Close();
            }
        }
    }
}
