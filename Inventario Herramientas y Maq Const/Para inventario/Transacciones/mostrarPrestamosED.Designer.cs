namespace Para_inventario.Transacciones
{
    partial class mostrarPrestamosED
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle1 = new System.Windows.Forms.DataGridViewCellStyle();
            this.btnRegistrarDev = new System.Windows.Forms.Button();
            this.btnVolver = new System.Windows.Forms.Button();
            this.toolStrip1 = new System.Windows.Forms.ToolStrip();
            this.toolStripLabel2 = new System.Windows.Forms.ToolStripLabel();
            this.txtEncargado = new System.Windows.Forms.ToolStripTextBox();
            this.btnBuscar = new System.Windows.Forms.ToolStripButton();
            this.dataPrestamos = new System.Windows.Forms.DataGridView();
            this.nro = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.nombre = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.codigo = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.fechaPrestamo = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.fechaDevolucion = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.solicitante = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.responsable = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.toolStrip1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dataPrestamos)).BeginInit();
            this.SuspendLayout();
            // 
            // btnRegistrarDev
            // 
            this.btnRegistrarDev.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.btnRegistrarDev.Enabled = false;
            this.btnRegistrarDev.FlatAppearance.BorderColor = System.Drawing.SystemColors.ActiveBorder;
            this.btnRegistrarDev.FlatAppearance.MouseDownBackColor = System.Drawing.Color.Blue;
            this.btnRegistrarDev.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Blue;
            this.btnRegistrarDev.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnRegistrarDev.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnRegistrarDev.Location = new System.Drawing.Point(675, 441);
            this.btnRegistrarDev.Name = "btnRegistrarDev";
            this.btnRegistrarDev.Size = new System.Drawing.Size(184, 43);
            this.btnRegistrarDev.TabIndex = 36;
            this.btnRegistrarDev.Text = "Registrar Devolución";
            this.btnRegistrarDev.UseVisualStyleBackColor = false;
            this.btnRegistrarDev.Click += new System.EventHandler(this.btnRegistrarDev_Click);
            // 
            // btnVolver
            // 
            this.btnVolver.BackColor = System.Drawing.Color.Red;
            this.btnVolver.FlatAppearance.BorderColor = System.Drawing.SystemColors.ActiveBorder;
            this.btnVolver.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.btnVolver.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.btnVolver.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnVolver.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnVolver.Location = new System.Drawing.Point(563, 441);
            this.btnVolver.Name = "btnVolver";
            this.btnVolver.Size = new System.Drawing.Size(95, 43);
            this.btnVolver.TabIndex = 35;
            this.btnVolver.Text = "Volver";
            this.btnVolver.UseVisualStyleBackColor = false;
            this.btnVolver.Click += new System.EventHandler(this.btnVolver_Click);
            // 
            // toolStrip1
            // 
            this.toolStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.toolStripLabel2,
            this.txtEncargado,
            this.btnBuscar});
            this.toolStrip1.Location = new System.Drawing.Point(0, 0);
            this.toolStrip1.Name = "toolStrip1";
            this.toolStrip1.Size = new System.Drawing.Size(896, 27);
            this.toolStrip1.TabIndex = 49;
            this.toolStrip1.Text = "toolStrip1";
            // 
            // toolStripLabel2
            // 
            this.toolStripLabel2.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.toolStripLabel2.Name = "toolStripLabel2";
            this.toolStripLabel2.Size = new System.Drawing.Size(90, 24);
            this.toolStripLabel2.Text = "Solicitante: ";
            // 
            // txtEncargado
            // 
            this.txtEncargado.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtEncargado.Name = "txtEncargado";
            this.txtEncargado.Size = new System.Drawing.Size(100, 27);
            // 
            // btnBuscar
            // 
            this.btnBuscar.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.btnBuscar.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.btnBuscar.Image = global::Para_inventario.Properties.Resources.pngtree_search_icon_creative_design_template_png_image_1998500;
            this.btnBuscar.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.btnBuscar.Name = "btnBuscar";
            this.btnBuscar.Size = new System.Drawing.Size(23, 24);
            this.btnBuscar.Text = "toolStripButton1";
            this.btnBuscar.Click += new System.EventHandler(this.btnBuscar_Click);
            // 
            // dataPrestamos
            // 
            this.dataPrestamos.AllowUserToAddRows = false;
            this.dataPrestamos.AllowUserToDeleteRows = false;
            this.dataPrestamos.AllowUserToOrderColumns = true;
            this.dataPrestamos.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataPrestamos.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.nro,
            this.nombre,
            this.codigo,
            this.fechaPrestamo,
            this.fechaDevolucion,
            this.solicitante,
            this.responsable});
            this.dataPrestamos.Location = new System.Drawing.Point(64, 61);
            this.dataPrestamos.Name = "dataPrestamos";
            this.dataPrestamos.ReadOnly = true;
            this.dataPrestamos.RowTemplate.Height = 25;
            this.dataPrestamos.Size = new System.Drawing.Size(795, 365);
            this.dataPrestamos.TabIndex = 51;
            this.dataPrestamos.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataPrestamos_CellClick);
            // 
            // nro
            // 
            this.nro.DataPropertyName = "nro";
            this.nro.HeaderText = "nro";
            this.nro.Name = "nro";
            this.nro.ReadOnly = true;
            this.nro.Visible = false;
            // 
            // nombre
            // 
            this.nombre.DataPropertyName = "nombre";
            this.nombre.HeaderText = "Nombre";
            this.nombre.Name = "nombre";
            this.nombre.ReadOnly = true;
            // 
            // codigo
            // 
            this.codigo.DataPropertyName = "codigo";
            this.codigo.HeaderText = "Codigo";
            this.codigo.Name = "codigo";
            this.codigo.ReadOnly = true;
            // 
            // fechaPrestamo
            // 
            this.fechaPrestamo.DataPropertyName = "fechaPrestamo";
            dataGridViewCellStyle1.Format = "G";
            dataGridViewCellStyle1.NullValue = null;
            this.fechaPrestamo.DefaultCellStyle = dataGridViewCellStyle1;
            this.fechaPrestamo.HeaderText = "Fecha Prestamo";
            this.fechaPrestamo.MaxInputLength = 32768;
            this.fechaPrestamo.Name = "fechaPrestamo";
            this.fechaPrestamo.ReadOnly = true;
            this.fechaPrestamo.Width = 150;
            // 
            // fechaDevolucion
            // 
            this.fechaDevolucion.DataPropertyName = "fechaDevolucion";
            this.fechaDevolucion.HeaderText = "Fecha Devolucion";
            this.fechaDevolucion.Name = "fechaDevolucion";
            this.fechaDevolucion.ReadOnly = true;
            this.fechaDevolucion.Width = 150;
            // 
            // solicitante
            // 
            this.solicitante.DataPropertyName = "encargado";
            this.solicitante.HeaderText = "Solicitante";
            this.solicitante.Name = "solicitante";
            this.solicitante.ReadOnly = true;
            // 
            // responsable
            // 
            this.responsable.DataPropertyName = "nombreUsuario";
            this.responsable.HeaderText = "Responsable";
            this.responsable.Name = "responsable";
            this.responsable.ReadOnly = true;
            this.responsable.Width = 150;
            // 
            // mostrarPrestamosED
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Blue;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(896, 510);
            this.Controls.Add(this.dataPrestamos);
            this.Controls.Add(this.toolStrip1);
            this.Controls.Add(this.btnRegistrarDev);
            this.Controls.Add(this.btnVolver);
            this.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "mostrarPrestamosED";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "mostrarPrestamosED";
            this.Load += new System.EventHandler(this.mostrarPrestamosED_Load);
            this.toolStrip1.ResumeLayout(false);
            this.toolStrip1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dataPrestamos)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private Button btnRegistrarDev;
        private Button btnVolver;
        private ToolStrip toolStrip1;
        private ToolStripLabel toolStripLabel2;
        private ToolStripTextBox txtEncargado;
        private ToolStripButton btnBuscar;
        private DataGridView dataPrestamos;
        private DataGridViewTextBoxColumn nro;
        private DataGridViewTextBoxColumn nombre;
        private DataGridViewTextBoxColumn codigo;
        private DataGridViewTextBoxColumn fechaPrestamo;
        private DataGridViewTextBoxColumn fechaDevolucion;
        private DataGridViewTextBoxColumn solicitante;
        private DataGridViewTextBoxColumn responsable;
    }
}