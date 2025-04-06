namespace Para_inventario.Transacciones
{
    partial class prestamosInformatica
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
            this.lblUser = new System.Windows.Forms.Label();
            this.btnMostrarPrestamos = new System.Windows.Forms.Button();
            this.btnRegistrarPrestamos = new System.Windows.Forms.Button();
            this.btnVolver = new System.Windows.Forms.Button();
            this.btnBuscar = new System.Windows.Forms.Button();
            this.txtCodigo = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.dataInformatica = new System.Windows.Forms.DataGridView();
            this.label3 = new System.Windows.Forms.Label();
            this.txtNombre = new System.Windows.Forms.TextBox();
            this.Nombre = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.Codigo = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.Problema = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.nro = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.fecha = new System.Windows.Forms.DataGridViewTextBoxColumn();
            ((System.ComponentModel.ISupportInitialize)(this.dataInformatica)).BeginInit();
            this.SuspendLayout();
            // 
            // lblUser
            // 
            this.lblUser.AutoSize = true;
            this.lblUser.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblUser.Location = new System.Drawing.Point(434, 13);
            this.lblUser.Name = "lblUser";
            this.lblUser.Size = new System.Drawing.Size(57, 20);
            this.lblUser.TabIndex = 66;
            this.lblUser.Text = "asdasd";
            // 
            // btnMostrarPrestamos
            // 
            this.btnMostrarPrestamos.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.btnMostrarPrestamos.FlatAppearance.BorderColor = System.Drawing.SystemColors.ActiveBorder;
            this.btnMostrarPrestamos.FlatAppearance.MouseDownBackColor = System.Drawing.Color.Blue;
            this.btnMostrarPrestamos.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Blue;
            this.btnMostrarPrestamos.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnMostrarPrestamos.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnMostrarPrestamos.Location = new System.Drawing.Point(160, 444);
            this.btnMostrarPrestamos.Name = "btnMostrarPrestamos";
            this.btnMostrarPrestamos.Size = new System.Drawing.Size(167, 43);
            this.btnMostrarPrestamos.TabIndex = 70;
            this.btnMostrarPrestamos.Text = "Mostrar Prestamos";
            this.btnMostrarPrestamos.UseVisualStyleBackColor = false;
            this.btnMostrarPrestamos.Click += new System.EventHandler(this.btnMostrarPrestamos_Click);
            // 
            // btnRegistrarPrestamos
            // 
            this.btnRegistrarPrestamos.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.btnRegistrarPrestamos.Enabled = false;
            this.btnRegistrarPrestamos.FlatAppearance.BorderColor = System.Drawing.SystemColors.ActiveBorder;
            this.btnRegistrarPrestamos.FlatAppearance.MouseDownBackColor = System.Drawing.Color.Blue;
            this.btnRegistrarPrestamos.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Blue;
            this.btnRegistrarPrestamos.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnRegistrarPrestamos.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnRegistrarPrestamos.Location = new System.Drawing.Point(434, 444);
            this.btnRegistrarPrestamos.Name = "btnRegistrarPrestamos";
            this.btnRegistrarPrestamos.Size = new System.Drawing.Size(164, 43);
            this.btnRegistrarPrestamos.TabIndex = 69;
            this.btnRegistrarPrestamos.Text = "Registrar Prestamo";
            this.btnRegistrarPrestamos.UseVisualStyleBackColor = false;
            this.btnRegistrarPrestamos.Click += new System.EventHandler(this.btnRegistrarPrestamos_Click);
            // 
            // btnVolver
            // 
            this.btnVolver.BackColor = System.Drawing.Color.Red;
            this.btnVolver.FlatAppearance.BorderColor = System.Drawing.SystemColors.ActiveBorder;
            this.btnVolver.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.btnVolver.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.btnVolver.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnVolver.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnVolver.Location = new System.Drawing.Point(333, 444);
            this.btnVolver.Name = "btnVolver";
            this.btnVolver.Size = new System.Drawing.Size(95, 43);
            this.btnVolver.TabIndex = 68;
            this.btnVolver.Text = "Volver";
            this.btnVolver.UseVisualStyleBackColor = false;
            this.btnVolver.Click += new System.EventHandler(this.btnVolver_Click);
            // 
            // btnBuscar
            // 
            this.btnBuscar.Location = new System.Drawing.Point(216, 36);
            this.btnBuscar.Name = "btnBuscar";
            this.btnBuscar.Size = new System.Drawing.Size(75, 23);
            this.btnBuscar.TabIndex = 76;
            this.btnBuscar.Text = "Buscar";
            this.btnBuscar.UseVisualStyleBackColor = true;
            this.btnBuscar.Click += new System.EventHandler(this.btnBuscar_Click);
            // 
            // txtCodigo
            // 
            this.txtCodigo.Location = new System.Drawing.Point(110, 36);
            this.txtCodigo.Name = "txtCodigo";
            this.txtCodigo.Size = new System.Drawing.Size(100, 25);
            this.txtCodigo.TabIndex = 75;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.label1.Location = new System.Drawing.Point(31, 36);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(73, 21);
            this.label1.TabIndex = 74;
            this.label1.Text = "Codigo: ";
            // 
            // dataInformatica
            // 
            this.dataInformatica.AllowUserToAddRows = false;
            this.dataInformatica.AllowUserToDeleteRows = false;
            this.dataInformatica.AllowUserToOrderColumns = true;
            this.dataInformatica.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataInformatica.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.Nombre,
            this.Codigo,
            this.Problema,
            this.nro,
            this.fecha});
            this.dataInformatica.Location = new System.Drawing.Point(54, 82);
            this.dataInformatica.Name = "dataInformatica";
            this.dataInformatica.ReadOnly = true;
            this.dataInformatica.RowTemplate.Height = 25;
            this.dataInformatica.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.dataInformatica.Size = new System.Drawing.Size(544, 356);
            this.dataInformatica.TabIndex = 73;
            this.dataInformatica.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataInformatica_CellClick);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.label3.Location = new System.Drawing.Point(301, 39);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(90, 20);
            this.label3.TabIndex = 72;
            this.label3.Text = "Solicitante: ";
            // 
            // txtNombre
            // 
            this.txtNombre.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtNombre.Location = new System.Drawing.Point(397, 36);
            this.txtNombre.Name = "txtNombre";
            this.txtNombre.Size = new System.Drawing.Size(201, 25);
            this.txtNombre.TabIndex = 71;
            // 
            // Nombre
            // 
            this.Nombre.DataPropertyName = "Nombre";
            this.Nombre.HeaderText = "Nombre";
            this.Nombre.Name = "Nombre";
            this.Nombre.ReadOnly = true;
            this.Nombre.Width = 150;
            // 
            // Codigo
            // 
            this.Codigo.DataPropertyName = "Codigo";
            this.Codigo.HeaderText = "Codigo";
            this.Codigo.Name = "Codigo";
            this.Codigo.ReadOnly = true;
            // 
            // Problema
            // 
            this.Problema.DataPropertyName = "Problema";
            this.Problema.HeaderText = "Problema";
            this.Problema.Name = "Problema";
            this.Problema.ReadOnly = true;
            this.Problema.Width = 250;
            // 
            // nro
            // 
            this.nro.DataPropertyName = "nro";
            this.nro.HeaderText = "nro";
            this.nro.Name = "nro";
            this.nro.ReadOnly = true;
            this.nro.Visible = false;
            // 
            // fecha
            // 
            this.fecha.DataPropertyName = "fecha";
            this.fecha.HeaderText = "fecha";
            this.fecha.Name = "fecha";
            this.fecha.ReadOnly = true;
            this.fecha.Visible = false;
            // 
            // prestamosInformatica
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Blue;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(676, 510);
            this.Controls.Add(this.btnBuscar);
            this.Controls.Add(this.txtCodigo);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.dataInformatica);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.txtNombre);
            this.Controls.Add(this.btnMostrarPrestamos);
            this.Controls.Add(this.btnRegistrarPrestamos);
            this.Controls.Add(this.btnVolver);
            this.Controls.Add(this.lblUser);
            this.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "prestamosInformatica";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "prestamosInformatica";
            this.Load += new System.EventHandler(this.prestamosInformatica_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataInformatica)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Label lblUser;
        private Button btnMostrarPrestamos;
        private Button btnRegistrarPrestamos;
        private Button btnVolver;
        private Button btnBuscar;
        private TextBox txtCodigo;
        private Label label1;
        private DataGridView dataInformatica;
        private Label label3;
        private TextBox txtNombre;
        private DataGridViewTextBoxColumn Nombre;
        private DataGridViewTextBoxColumn Codigo;
        private DataGridViewTextBoxColumn Problema;
        private DataGridViewTextBoxColumn nro;
        private DataGridViewTextBoxColumn fecha;
    }
}