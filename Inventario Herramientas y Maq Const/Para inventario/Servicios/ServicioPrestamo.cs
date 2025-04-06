using Para_inventario.Clases;
using Para_inventario.Transacciones;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Para_inventario.Servicios
{
    class ServicioPrestamo
    {
        private string cadenaBD = System.Configuration.ConfigurationManager.AppSettings["cadenaBD"];

        public void registrarPrestamoED(DataGridView prestamos, int cantidad, Prestamo prestamo)
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cn.Open();
            cmd.Transaction = cn.BeginTransaction();
            try
            {
                List<string> lista = new List<string>();
                for (int i = 0; i < cantidad; i++)
                {
                    cmd.CommandText = "INSERT INTO PrestamosElementosDibujo (nroInventario, codigo, fechaPrestamo, encargado, RealizadoPor) " +
                        "VALUES (@n, @c, @f, @e, @u)";
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@n", int.Parse(prestamos.SelectedRows[i].Cells["nro"].Value.ToString()));
                    cmd.Parameters.AddWithValue("@c", int.Parse(prestamos.SelectedRows[i].Cells["Codigo"].Value.ToString()));
                    cmd.Parameters.AddWithValue("@f", Convert.ToDateTime(prestamos.SelectedRows[i].Cells["fecha"].Value.ToString()));
                    cmd.Parameters.AddWithValue("@e", prestamo.encargado);
                    cmd.Parameters.AddWithValue("@u", ValoresPublicos.nroUsuario);
                    cmd.ExecuteNonQuery();
                    cmd.CommandText = "UPDATE ElementoDibujo set fuePrestado = 1 where codigo = @c and estado = 1";
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@c", int.Parse(prestamos.SelectedRows[i].Cells["Codigo"].Value.ToString()));
                    cmd.ExecuteNonQuery();
                    cmd.CommandText = "UPDATE ElementosDibujo set cantidadDisponible = cantidadDisponible - 1 WHERE nro = @n";
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@n", int.Parse(prestamos.SelectedRows[i].Cells["nro"].Value.ToString()));
                    cmd.ExecuteNonQuery();
                    lista.Add(prestamos.SelectedRows[i].Cells["Codigo"].Value.ToString());
                }
                cmd.Transaction.Commit();
                TextBox text = new TextBox();
                text.Text = "";
                for (int i = 0; i < lista.Count; i++)
                {
                    text.Text = text.Text + lista[i].ToString() + ", ";
                }
                MessageBox.Show("Préstamos registrados exitosamente para los elementos de dibujo con codigos: "
                    + text.Text + " y fecha de préstamo: " + prestamo.fechaPrestamo.ToString());
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

        public void registrarPrestamoHerramienta(DataGridView prestamos, int cantidad, Prestamo prestamo)
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cn.Open();
            cmd.Transaction = cn.BeginTransaction();
            try
            {
                List<string> lista = new List<string>();
                for (int i = 0; i < cantidad; i++)
                {
                    cmd.CommandText = "INSERT INTO PrestamosHerramientas (nroInventario, codigo, fechaPrestamo, encargado, RealizadoPor) " +
                        "VALUES (@n, @c, @f, @e, @u)";
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@n", int.Parse(prestamos.SelectedRows[i].Cells["nro"].Value.ToString()));
                    cmd.Parameters.AddWithValue("@c", int.Parse(prestamos.SelectedRows[i].Cells["Codigo"].Value.ToString()));
                    cmd.Parameters.AddWithValue("@f", Convert.ToDateTime(prestamos.SelectedRows[i].Cells["fecha"].Value.ToString()));
                    cmd.Parameters.AddWithValue("@e", prestamo.encargado);
                    cmd.Parameters.AddWithValue("@u", ValoresPublicos.nroUsuario);
                    cmd.ExecuteNonQuery();
                    cmd.CommandText = "UPDATE Herramienta set fuePrestado = 1 where codigo = @c and estado = 1";
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@c", int.Parse(prestamos.SelectedRows[i].Cells["Codigo"].Value.ToString()));
                    cmd.ExecuteNonQuery();
                    cmd.CommandText = "UPDATE HerramientasManuales set cantidad = cantidad - 1 WHERE nro = @n";
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@n", int.Parse(prestamos.SelectedRows[i].Cells["nro"].Value.ToString()));
                    cmd.ExecuteNonQuery();
                    lista.Add(prestamos.SelectedRows[i].Cells["Codigo"].Value.ToString());
                }
                cmd.Transaction.Commit();
                TextBox text = new TextBox();
                text.Text = "";
                for (int i = 0; i < lista.Count; i++)
                {
                    text.Text = text.Text + lista[i].ToString() + ", ";
                }
                MessageBox.Show("Préstamos registrados exitosamente para las herramientas con codigos: "
                    + text.Text + " y fecha de préstamo: " + prestamo.fechaPrestamo.ToString());
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

        public void registrarPrestamoInformatica(DataGridView prestamos, int cantidad, Prestamo prestamo)
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cn.Open();
            cmd.Transaction = cn.BeginTransaction();
            try
            {
                List<string> lista = new List<string>();
                for (int i = 0; i < cantidad; i++)
                {
                    cmd.CommandText = "INSERT INTO prestamosInformatica (nroInventario, codigo, fechaPrestamo, encargado, RealizadoPor) " +
                        "VALUES (@n, @c, @f, @e, @u)";
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@n", int.Parse(prestamos.SelectedRows[i].Cells["nro"].Value.ToString()));
                    cmd.Parameters.AddWithValue("@c", int.Parse(prestamos.SelectedRows[i].Cells["Codigo"].Value.ToString()));
                    cmd.Parameters.AddWithValue("@f", Convert.ToDateTime(prestamos.SelectedRows[i].Cells["fecha"].Value.ToString()));
                    cmd.Parameters.AddWithValue("@e", prestamo.encargado);
                    cmd.Parameters.AddWithValue("@u", ValoresPublicos.nroUsuario);
                    cmd.ExecuteNonQuery();
                    cmd.CommandText = "UPDATE InformaticaIndividual set fuePrestado = 1 where codigo = @c and estado = 1";
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@c", int.Parse(prestamos.SelectedRows[i].Cells["Codigo"].Value.ToString()));
                    cmd.ExecuteNonQuery();
                    cmd.CommandText = "UPDATE Informatica set cantidad = cantidad - 1 WHERE nro = @n";
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@n", int.Parse(prestamos.SelectedRows[i].Cells["nro"].Value.ToString()));
                    cmd.ExecuteNonQuery();
                    lista.Add(prestamos.SelectedRows[i].Cells["Codigo"].Value.ToString());
                }
                cmd.Transaction.Commit();
                TextBox text = new TextBox();
                text.Text = "";
                for (int i = 0; i < lista.Count; i++)
                {
                    text.Text = text.Text + lista[i].ToString() + ", ";
                }
                MessageBox.Show("Préstamos registrados exitosamente para los elementos de informatica con codigos: "
                    + text.Text + " y fecha de préstamo: " + prestamo.fechaPrestamo.ToString());
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

        public void registrarPrestamoMaquina(DataGridView prestamos, int cantidad, Prestamo prestamo)
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cn.Open();
            cmd.Transaction = cn.BeginTransaction();
            try
            {
                List<string> lista = new List<string>();
                for (int i = 0; i < cantidad; i++)
                {
                    cmd.CommandText = "INSERT INTO PrestamosMaquinas (nroInventario, codigo, fechaPrestamo, encargado, RealizadoPor) " +
                        "VALUES (@n, @c, @f, @e, @u)";
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@n", int.Parse(prestamos.SelectedRows[i].Cells["nro"].Value.ToString()));
                    cmd.Parameters.AddWithValue("@c", int.Parse(prestamos.SelectedRows[i].Cells["Codigo"].Value.ToString()));
                    cmd.Parameters.AddWithValue("@f", Convert.ToDateTime(prestamos.SelectedRows[i].Cells["fecha"].Value.ToString()));
                    cmd.Parameters.AddWithValue("@e", prestamo.encargado);
                    cmd.Parameters.AddWithValue("@u", ValoresPublicos.nroUsuario);
                    cmd.ExecuteNonQuery();
                    cmd.CommandText = "UPDATE Maquina set fuePrestado = 1 where codigo = @c and estado = 1";
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@c", int.Parse(prestamos.SelectedRows[i].Cells["Codigo"].Value.ToString()));
                    cmd.ExecuteNonQuery();
                    cmd.CommandText = "UPDATE Maquinas set cantidad = cantidad - 1 WHERE nro = @n";
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@n", int.Parse(prestamos.SelectedRows[i].Cells["nro"].Value.ToString()));
                    cmd.ExecuteNonQuery();
                    lista.Add(prestamos.SelectedRows[i].Cells["Codigo"].Value.ToString());
                }
                cmd.Transaction.Commit();
                TextBox text = new TextBox();
                text.Text = "";
                for (int i = 0; i < lista.Count; i++)
                {
                    text.Text = text.Text + lista[i].ToString() + ", ";
                }
                MessageBox.Show("Préstamos registrados exitosamente para las máquinas con codigos: "
                    + text.Text + " y fecha de préstamo: " + prestamo.fechaPrestamo.ToString());
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

        public void registrarDevHerramienta(Prestamo prestamo)
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cn.Open();
            cmd.Transaction = cn.BeginTransaction();
            try
            {
                cmd.CommandText = "UPDATE PrestamosHerramientas set fechaDevolucion = GETDATE() where nroInventario = @n and codigo = @c and " +
                    "fechaPrestamo = @f";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@n", prestamo.nroInventario);
                cmd.Parameters.AddWithValue("@c", prestamo.codigo);
                cmd.Parameters.AddWithValue("@f", prestamo.fechaPrestamo);
                cmd.ExecuteNonQuery();
                cmd.CommandText = "UPDATE HerramientasManuales set cantidad = cantidad + 1 where nro = @n";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@n", prestamo.nroInventario);
                cmd.ExecuteNonQuery();
                cmd.CommandText = "UPDATE Herramienta set fuePrestado = 0 where codigo = @c and estado = 1";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@c", prestamo.codigo);
                cmd.ExecuteNonQuery();
                cmd.Transaction.Commit();
                MessageBox.Show("Prestamo devuelto exitosamente");
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

        public void registrarDevED(Prestamo prestamo)
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cn.Open();
            cmd.Transaction = cn.BeginTransaction();
            try
            {
                cmd.CommandText = "UPDATE PrestamosElementosDibujo set fechaDevolucion = GETDATE() where nroInventario = @n and codigo = @c and " +
                    "fechaPrestamo = @f";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@n", prestamo.nroInventario);
                cmd.Parameters.AddWithValue("@c", prestamo.codigo);
                cmd.Parameters.AddWithValue("@f", prestamo.fechaPrestamo);
                cmd.ExecuteNonQuery();
                cmd.CommandText = "UPDATE ElementosDibujo set cantidadDisponible = cantidadDisponible + 1 where nro = @n";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@n", prestamo.nroInventario);
                cmd.ExecuteNonQuery();
                cmd.CommandText = "UPDATE ElementoDibujo set fuePrestado = 0 where codigo = @c and estado = 1";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@c", prestamo.codigo);
                cmd.ExecuteNonQuery();
                cmd.Transaction.Commit();
                MessageBox.Show("Prestamo devuelto exitosamente");
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

        public void registrarDevInformatica(Prestamo prestamo)
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cn.Open();
            cmd.Transaction = cn.BeginTransaction();
            try
            {
                cmd.CommandText = "UPDATE prestamosInformatica set fechaDevolucion = GETDATE() where nroInventario = @n and codigo = @c and " +
                    "fechaPrestamo = @f";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@n", prestamo.nroInventario);
                cmd.Parameters.AddWithValue("@c", prestamo.codigo);
                cmd.Parameters.AddWithValue("@f", prestamo.fechaPrestamo);
                cmd.ExecuteNonQuery();
                cmd.CommandText = "UPDATE Informatica set cantidad = cantidad + 1 where nro = @n";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@n", prestamo.nroInventario);
                cmd.ExecuteNonQuery();
                cmd.CommandText = "UPDATE InformaticaIndividual set fuePrestado = 0 where codigo = @c and estado = 1";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@c", prestamo.codigo);
                cmd.ExecuteNonQuery();
                cmd.Transaction.Commit();
                MessageBox.Show("Prestamo devuelto exitosamente");
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

        public void registrarDevMaquina(Prestamo prestamo)
        {
            SqlConnection cn = new SqlConnection(cadenaBD);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cn.Open();
            cmd.Transaction = cn.BeginTransaction();
            try
            {
                cmd.CommandText = "UPDATE PrestamosMaquinas set fechaDevolucion = GETDATE() where nroInventario = @n and codigo = @c and " +
                    "fechaPrestamo = @f";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@n", prestamo.nroInventario);
                cmd.Parameters.AddWithValue("@c", prestamo.codigo);
                cmd.Parameters.AddWithValue("@f", prestamo.fechaPrestamo);
                cmd.ExecuteNonQuery();
                cmd.CommandText = "UPDATE Maquinas set cantidad = cantidad + 1 where nro = @n";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@n", prestamo.nroInventario);
                cmd.ExecuteNonQuery();
                cmd.CommandText = "UPDATE Maquina set fuePrestado = 0 where codigo = @c and estado = 1";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@c", prestamo.codigo);
                cmd.ExecuteNonQuery();
                cmd.Transaction.Commit();
                MessageBox.Show("Prestamo devuelto exitosamente");
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

        public DataTable mostrarPrestamoHerramienta()
        {
            DataTable dt = new DataTable();
            SqlConnection cn = new SqlConnection(cadenaBD);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cmd.CommandText = "mostrarPrestamosHerramientas";
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter ad = new SqlDataAdapter(cmd);
            cn.Open();
            ad.Fill(dt);
            cn.Close();
            return dt;
        }

        public DataTable mostrarPrestamoED()
        {
            DataTable dt = new DataTable();
            SqlConnection cn = new SqlConnection(cadenaBD);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cmd.CommandText = "mostrarPrestamosED";
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter ad = new SqlDataAdapter(cmd);
            cn.Open();
            ad.Fill(dt);
            cn.Close();
            return dt;
        }

        public DataTable mostrarPrestamoInformatica()
        {
            DataTable dt = new DataTable();
            SqlConnection cn = new SqlConnection(cadenaBD);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cmd.CommandText = "mostrarPrestamosInformatica";
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter ad = new SqlDataAdapter(cmd);
            cn.Open();
            ad.Fill(dt);
            cn.Close();
            return dt;
        }

        public DataTable mostrarPrestamosMaquinas()
        {
            DataTable dt = new DataTable();
            SqlConnection cn = new SqlConnection(cadenaBD);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cn;
            cmd.CommandText = "mostrarPrestamosMaquinas";
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter ad = new SqlDataAdapter(cmd);
            cn.Open();
            ad.Fill(dt);
            cn.Close();
            return dt;
        }
    }
}
