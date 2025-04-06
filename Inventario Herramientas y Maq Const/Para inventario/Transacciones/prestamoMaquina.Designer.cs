namespace Para_inventario.Transacciones
{
    partial class prestamoMaquina
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
            this.btnMostrarPrestamos = new System.Windows.Forms.Button();
            this.btnRegistrarPrestamos = new System.Windows.Forms.Button();
            this.btnVolver = new System.Windows.Forms.Button();
            this.lblUser = new System.Windows.Forms.Label();
            this.btnBuscar = new System.Windows.Forms.Button();
            this.txtCodigo = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.dataMaquina = new System.Windows.Forms.DataGridView();
            this.label3 = new System.Windows.Forms.Label();
            this.txtNombre = new System.Windows.Forms.TextBox();
            this.Nombre = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.Codigo = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.Problema = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.nro = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.fecha = new System.Windows.Forms.DataGridViewTextBoxColumn();
            ((System.ComponentModel.ISupportInitialize)(this.dataMaquina)).BeginInit();
            this.SuspendLayout();
            // 
            // btnMostrarPrestamos
            // 
            this.btnMostrarPrestamos.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.btnMostrarPrestamos.FlatAppearance.BorderColor = System.Drawing.SystemColors.ActiveBorder;
            this.btnMostrarPrestamos.FlatAppearance.MouseDownBackColor = System.Drawing.Color.Blue;
            this.btnMostrarPrestamos.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Blue;
            this.btnMostrarPrestamos.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnMostrarPrestamos.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnMostrarPrestamos.Location = new System.Drawing.Point(168, 444);
            this.btnMostrarPrestamos.Name = "btnMostrarPrestamos";
            this.btnMostrarPrestamos.Size = new System.Drawing.Size(167, 43);
            this.btnMostrarPrestamos.TabIndex = 47;
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
            this.btnRegistrarPrestamos.Location = new System.Drawing.Point(442, 444);
            this.btnRegistrarPrestamos.Name = "btnRegistrarPrestamos";
            this.btnRegistrarPrestamos.Size = new System.Drawing.Size(175, 43);
            this.btnRegistrarPrestamos.TabIndex = 46;
            this.btnRegistrarPrestamos.Text = "Registrar Prestamos";
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
            this.btnVolver.Location = new System.Drawing.Point(341, 444);
            this.btnVolver.Name = "btnVolver";
            this.btnVolver.Size = new System.Drawing.Size(95, 43);
            this.btnVolver.TabIndex = 45;
            this.btnVolver.Text = "Volver";
            this.btnVolver.UseVisualStyleBackColor = false;
            this.btnVolver.Click += new System.EventHandler(this.btnVolver_Click);
            // 
            // lblUser
            // 
            this.lblUser.AutoSize = true;
            this.lblUser.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblUser.Location = new System.Drawing.Point(442, 9);
            this.lblUser.Name = "lblUser";
            this.lblUser.Size = new System.Drawing.Size(57, 20);
            this.lblUser.TabIndex = 57;
            this.lblUser.Text = "asdasd";
            // 
            // btnBuscar
            // 
            this.btnBuscar.Location = new System.Drawing.Point(235, 36);
            this.btnBuscar.Name = "btnBuscar";
            this.btnBuscar.Size = new System.Drawing.Size(75, 23);
            this.btnBuscar.TabIndex = 82;
            this.btnBuscar.Text = "Buscar";
            this.btnBuscar.UseVisualStyleBackColor = true;
            this.btnBuscar.Click += new System.EventHandler(this.btnBuscar_Click);
            // 
            // txtCodigo
            // 
            this.txtCodigo.Location = new System.Drawing.Point(129, 36);
            this.txtCodigo.Name = "txtCodigo";
            this.txtCodigo.Size = new System.Drawing.Size(100, 25);
            this.txtCodigo.TabIndex = 81;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.label1.Location = new System.Drawing.Point(50, 36);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(73, 21);
            this.label1.TabIndex = 80;
            this.label1.Text = "Codigo: ";
            // 
            // dataMaquina
            // 
            this.dataMaquina.AllowUserToAddRows = false;
            this.dataMaquina.AllowUserToDeleteRows = false;
            this.dataMaquina.AllowUserToOrderColumns = true;
            this.dataMaquina.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataMaquina.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.Nombre,
            this.Codigo,
            this.Problema,
            this.nro,
            this.fecha});
            this.dataMaquina.Location = new System.Drawing.Point(73, 82);
            this.dataMaquina.Name = "dataMaquina";
            this.dataMaquina.ReadOnly = true;
            this.dataMaquina.RowTemplate.Height = 25;
            this.dataMaquina.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.dataMaquina.Size = new System.Drawing.Size(544, 356);
            this.dataMaquina.TabIndex = 79;
            this.dataMaquina.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataMaquina_CellClick);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.label3.Location = new System.Drawing.Point(320, 39);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(90, 20);
            this.label3.TabIndex = 78;
            this.label3.Text = "Solicitante: ";
            // 
            // txtNombre
            // 
            this.txtNombre.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtNombre.Location = new System.Drawing.Point(416, 36);
            this.txtNombre.Name = "txtNombre";
            this.txtNombre.Size = new System.Drawing.Size(201, 25);
            this.txtNombre.TabIndex = 77;
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
            // prestamoMaquina
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Blue;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(704, 510);
            this.Controls.Add(this.btnBuscar);
            this.Controls.Add(this.txtCodigo);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.dataMaquina);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.txtNombre);
            this.Controls.Add(this.lblUser);
            this.Controls.Add(this.btnMostrarPrestamos);
            this.Controls.Add(this.btnRegistrarPrestamos);
            this.Controls.Add(this.btnVolver);
            this.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "prestamoMaquina";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "prestamoMaquina";
            this.Load += new System.EventHandler(this.prestamoMaquina_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataMaquina)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private Button btnMostrarPrestamos;
        private Button btnRegistrarPrestamos;
        private Button btnVolver;
        private Label lblUser;
        private Button btnBuscar;
        private TextBox txtCodigo;
        private Label label1;
        private DataGridView dataMaquina;
        private Label label3;
        private TextBox txtNombre;
        private DataGridViewTextBoxColumn Nombre;
        private DataGridViewTextBoxColumn Codigo;
        private DataGridViewTextBoxColumn Problema;
        private DataGridViewTextBoxColumn nro;
        private DataGridViewTextBoxColumn fecha;
    }
}