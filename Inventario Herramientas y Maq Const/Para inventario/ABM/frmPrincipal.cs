using Para_inventario.Transacciones;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Para_inventario.ABM;
using Para_inventario.Clases;

namespace Para_inventario.Interfaces
{
    public partial class frmPrincipal : Form
    {
        public frmPrincipal()
        {
            InitializeComponent();
        }

        private void agregarToolStripMenuItem_Click(object sender, EventArgs e)
        {
            frmHerramientas ventana = new frmHerramientas();
            ventana.Show();
            this.Close();
        }

        private void btnCerrar_Click(object sender, EventArgs e)
        {
            login ventana = new login();    
            ventana.Show();
            this.Close();
        }

        private void eliminarToolStripMenuItem_Click(object sender, EventArgs e)
        {
            frmHerramientaBaja ventana = new frmHerramientaBaja();
            ventana.Show();
            this.Close();    
        }

        private void consultarToolStripMenuItem_Click(object sender, EventArgs e)
        {
            frmHerramientasConsultar ventana = new frmHerramientasConsultar();
            ventana.Show();
            this.Close();
        }

        private void agregarToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            elementosDibujoAgregar ventana = new elementosDibujoAgregar();
            ventana.Show(); 
            this.Close();    
        }

        private void consultarToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            consultarElementosDibujo ventana = new consultarElementosDibujo();
            ventana.Show(); 
            this.Close();
        }

        private void eliminarToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            eliminarElementosDibujo ventana = new eliminarElementosDibujo();
            ventana.Show();
            this.Close();
        }

        private void agregarToolStripMenuItem2_Click(object sender, EventArgs e)
        {
            agregarConsumible ventana = new agregarConsumible();
            ventana.Show();
            this.Close();
        }

        private void consultarToolStripMenuItem2_Click(object sender, EventArgs e)
        {
            consultarConsumibles ventana = new consultarConsumibles();
            ventana.Show();
            this.Close();
        }

        private void agregarToolStripMenuItem3_Click(object sender, EventArgs e)
        {
            agregarInformatica ventana = new agregarInformatica();
            ventana.Show();
            this.Close();
        }   

        private void consultarToolStripMenuItem3_Click(object sender, EventArgs e)
        {
            consultarInformatica ventana = new consultarInformatica();
            ventana.Show();
            this.Close();
        }

        private void eliminarToolStripMenuItem2_Click(object sender, EventArgs e)
        {
            eliminarInformatica ventana = new eliminarInformatica();
            ventana.Show();
            this.Close();    
        }

        private void agregarToolStripMenuItem4_Click(object sender, EventArgs e)
        {
            agregarMaquinas ventana = new agregarMaquinas();
            ventana.Show();
            this.Close();
        }

        private void eliminarToolStripMenuItem3_Click(object sender, EventArgs e)
        {
            eliminarMaquina ventana = new eliminarMaquina();
            ventana.Show();
            this.Close();
        }

        private void actualizarToolStripMenuItem3_Click(object sender, EventArgs e)
        {
            reportarProblemaMaquina ventana = new reportarProblemaMaquina();
            ventana.Show(); 
            this.Close();
        }

        private void consultarToolStripMenuItem4_Click(object sender, EventArgs e)
        {
            consultarMaquina ventana = new consultarMaquina();
            ventana.Show();
            this.Close();    
        }

        private void agregarToolStripMenuItem5_Click(object sender, EventArgs e)
        {
            agregarMueble ventana = new agregarMueble();
            ventana.Show();
            this.Close();
        }

        private void eliminarToolStripMenuItem4_Click(object sender, EventArgs e)
        {
            eliminarMueble ventana = new eliminarMueble();
            ventana.Show();
            this.Close();
        }

        private void actualizarToolStripMenuItem4_Click(object sender, EventArgs e)
        {
            actualizarMueble ventana = new actualizarMueble();
            ventana.Show();
            this.Close();    
        }

        private void consultarToolStripMenuItem5_Click(object sender, EventArgs e)
        {
            consultarMueble ventana = new consultarMueble();
            ventana.Show();
            this.Close();
        }


        private void frmPrincipal_Load(object sender, EventArgs e)
        {
            usuarioToolStripMenuItem.Text = "Usuario: " + ValoresPublicos.nombreUsuario;
            Consumible consumible = new Consumible();
            consumible.mostrar(dataConsumiblesConsultar);
            mostrarPorcentajeStock();
            esAdmin();
        }

        private void registrarPrestamoToolStripMenuItem_Click(object sender, EventArgs e)
        {
            prestamoHerramientas ventana = new prestamoHerramientas();
            ventana.Show();
            this.Close();
        }

        private void registrarPrestamoToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            prestamoED ventana = new prestamoED();
            ventana.Show();
            this.Close();
        }

        private void registrarPrestamoToolStripMenuItem2_Click(object sender, EventArgs e)
        {
            prestamoMaquina ventana = new prestamoMaquina();
            ventana.Show();
            this.Close();
        }

        private void reponerToolStripMenuItem_Click(object sender, EventArgs e)
        {
            reponerConsumibles ventana = new reponerConsumibles();
            ventana.Show(); 
            this.Close();
        }

        private void mostrarPorcentajeStock()
        {
            List<string> list = new List<string>();
            for (int i = 0; i < dataConsumiblesConsultar.Rows.Count; i++)
            {
                string nombre = dataConsumiblesConsultar.Rows[i].Cells["nombre"].Value.ToString();
                double stock = double.Parse(dataConsumiblesConsultar.Rows[i].Cells["cantidadDisponible"].Value.ToString());
                double cantidad = double.Parse(dataConsumiblesConsultar.Rows[i].Cells["cantidadComprada"].Value.ToString());
                if (stock >= cantidad)
                {
                    list.Add("Consumible: " + nombre + " Porcentaje de Stock: " + "100%\n");
                }
                else
                {
                    double porcentaje = stock * 100 / cantidad;
                    list.Add("Consumible: " + nombre + " Porcentaje de Stock: " + porcentaje.ToString() + "%\n");
                }
            }
            Label lab = new Label();
            string textoAnterior = "";
            for (int i = 0; i < list.Count; i++)
            {
                lab.Text = textoAnterior + list[i].ToString();
                textoAnterior = lab.Text;
            }
            MessageBox.Show(lab.Text, "Información sobre el stock", MessageBoxButtons.OK, MessageBoxIcon.Exclamation);
        }

        private void registrarDevolverPréstamoToolStripMenuItem_Click(object sender, EventArgs e)
        {
            prestamosInformatica ventana = new prestamosInformatica();
            ventana.Show();
            this.Close();
        }

        private void esAdmin()
        {
            if (ValoresPublicos.nombreUsuario == "Amira Yarbouh")
            {
                crearUsuarioToolStripMenuItem.Visible = true;  
                eliminarUsuariosToolStripMenuItem.Visible = true;
            }
            else
            {
                crearUsuarioToolStripMenuItem.Visible = false;
                eliminarUsuariosToolStripMenuItem.Visible = false;
            }
        }

        private void crearUsuarioToolStripMenuItem_Click(object sender, EventArgs e)
        {
            crearUsuario ventana = new crearUsuario();
            ventana.Show();
            this.Close();
        }

        private void eliminarUsuariosToolStripMenuItem_Click_1(object sender, EventArgs e)
        {
            eliminarUsuarios ventana = new eliminarUsuarios();
            ventana.Show();
            this.Close();
        }

        private void registrarConsumosToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Consumos ventana = new Consumos();
            ventana.Show(); 
            this.Close();
        }

        private void reportarProblema_Click(object sender, EventArgs e)
        {
            reportarProblemaElementoDibujo ventana = new reportarProblemaElementoDibujo();
            ventana.Show();
            this.Close();
        }

        private void actualizarStockToolStripMenuItem_Click(object sender, EventArgs e)
        {
            actualizarStockED ventana = new actualizarStockED();
            ventana.Show();
            this.Close();   
        }

        private void reportarProblemaToolStripMenuItem_Click(object sender, EventArgs e)
        {
            frmHerramientaProblema ventana = new frmHerramientaProblema();
            ventana.Show();
            this.Close();
        }

        private void actualizarStockToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            actualizarStockHerramientas ventana = new actualizarStockHerramientas();
            ventana.Show();
            this.Close();
        }

        private void reportarProblemaToolStripMenuItem3_Click(object sender, EventArgs e)
        {
            reportarProblemaMaquina ventana = new reportarProblemaMaquina();
            ventana.Show();
            this.Close();
        }

        private void reportarProblemaToolStripMenuItem2_Click(object sender, EventArgs e)
        {
            reportarProblemaInformatica ventana = new reportarProblemaInformatica();
            ventana.Show();
            this.Close();
        }

        private void actualizarStockToolStripMenuItem3_Click(object sender, EventArgs e)
        {
            actualizarStockInformatica ventana = new actualizarStockInformatica();
            ventana.Show();
            this.Close();
        }

        private void actualizarStockToolStripMenuItem2_Click(object sender, EventArgs e)
        {
            actualizarSockMaquina ventana = new actualizarSockMaquina();
            ventana.Show();
            this.Close();
        }
    }
}
