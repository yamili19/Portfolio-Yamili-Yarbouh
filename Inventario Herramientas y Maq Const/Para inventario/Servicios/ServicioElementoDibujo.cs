using Para_inventario.Clases;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace Para_inventario.Servicios
{
    class ServicioElementoDibujo
    {
        private string cadenaBD = System.Configuration.ConfigurationManager.AppSettings["cadenaBD"];

        public void agregar(ElementoDibujo elementoDibujo)
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cn.Open();
            cmd.Transaction = cn.BeginTransaction();
            try
            {
                cmd.CommandText = "select isnull(max(nro), 0) from ElementosDibujo";
                elementoDibujo.nro = Convert.ToInt32(cmd.ExecuteScalar()) + 1;
                cmd.CommandText = "INSERT INTO ElementosDibujo (nro ,nombre, cantidadDisponible, cantidadComprada, estado) " +
                    "VALUES (@nro, @nombre, @cantidadDisponible, @cantidadComprada, 1)";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@nombre", elementoDibujo.nombre);
                cmd.Parameters.AddWithValue("@cantidadDisponible", elementoDibujo.cantidadDisponible);
                cmd.Parameters.AddWithValue("@cantidadComprada", elementoDibujo.cantidadComprada);
                cmd.Parameters.AddWithValue("@nro", elementoDibujo.nro);
                cmd.ExecuteNonQuery();
                cmd.CommandText = "select isnull(max(codigo), 999) from ElementoDibujo where estado = 1";
                int codigo = (int)cmd.ExecuteScalar() + 1;
                for (int i = 0; i < elementoDibujo.cantidadDisponible; i++)
                {
                    cmd.CommandText = "INSERT INTO ElementoDibujo (nroInventario, codigo) VALUES (@n, @c)";
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@n", elementoDibujo.nro);
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

        public void eliminar(ElementoDibujo ele, int cod)
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cn.Open();
            cmd.Transaction = cn.BeginTransaction();
            try
            {
                cmd.CommandText = "UPDATE ElementoDibujo set estado = 0 WHERE nroInventario = @n AND codigo = @c AND estado = 1";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@n", ele.nro);
                cmd.Parameters.AddWithValue("@c", cod);
                cmd.ExecuteNonQuery();
                cmd.CommandText = "UPDATE ElementosDibujo SET cantidadDisponible = cantidadDisponible - 1 WHERE nro = @n";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@n", ele.nro);
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

        public DataTable mostrarED()
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            DataTable dataTable = new DataTable();
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandText = "mostrarED";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlDataAdapter ad = new SqlDataAdapter(cmd);
                cn.Open();
                ad.Fill(dataTable);
            }
            catch (Exception)
            {
                MessageBox.Show("Error");
            }
            finally
            {
                cn.Close();
            }
            return dataTable;
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
                cmd.CommandText = "UPDATE ElementoDibujo set problema = @p WHERE codigo = @n and estado = 1";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@p", problema);
                cmd.Parameters.AddWithValue("@n", codigo);
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
            DataTable dt = new DataTable();
            SqlConnection cn = new SqlConnection(cadenaBD);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cmd.CommandText = "mostrarStockED";
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter ad = new SqlDataAdapter(cmd);
            cn.Open();
            ad.Fill(dt);
            cn.Close();
            return dt;
        }

        public void actualizarStock(ElementoDibujo elemento, int cant)
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cn.Open();
            cmd.Transaction = cn.BeginTransaction();
            try
            {
                cmd.CommandText = "UPDATE ElementosDibujo SET cantidadDisponible = cantidadDisponible + @c, cantidadComprada = cantidadComprada + @c " +
                    "WHERE nro = @n";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@c", cant);
                cmd.Parameters.AddWithValue("@n", elemento.nro);
                cmd.ExecuteNonQuery();
                cmd.CommandText = "SELECT ISNULL(MAX(codigo), 999) from ElementoDibujo WHERE estado = 1";
                int codigo = (int)cmd.ExecuteScalar()+1;
                for (int i = 0; i < cant; i++)
                {
                    cmd.CommandText = "INSERT INTO ElementoDibujo (nroInventario, codigo) VALUES (@n, @c)";
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
