namespace Para_inventario.Transacciones
{
    partial class Consumos
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
            this.btnVolver = new System.Windows.Forms.Button();
            this.dataConsumos = new System.Windows.Forms.DataGridView();
            this.nro_inventario = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.nombreConsumible = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.cantidad = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.fecha = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.comboConsumible = new System.Windows.Forms.ComboBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.btnAgregar = new System.Windows.Forms.Button();
            this.btnRegistrarConsumos = new System.Windows.Forms.Button();
            this.dataConsumibles = new System.Windows.Forms.DataGridView();
            this.nro = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.nombre = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.cantidadDisponible = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.cantidadComprada = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.unidad = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.dtFecha = new System.Windows.Forms.DateTimePicker();
            this.btnMostrarConsumos = new System.Windows.Forms.Button();
            this.btnEliminar = new System.Windows.Forms.Button();
            this.maskedCantidad = new System.Windows.Forms.MaskedTextBox();
            ((System.ComponentModel.ISupportInitialize)(this.dataConsumos)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataConsumibles)).BeginInit();
            this.SuspendLayout();
            // 
            // btnVolver
            // 
            this.btnVolver.BackColor = System.Drawing.Color.Red;
            this.btnVolver.FlatAppearance.BorderColor = System.Drawing.SystemColors.ActiveBorder;
            this.btnVolver.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.btnVolver.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.btnVolver.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnVolver.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnVolver.Location = new System.Drawing.Point(259, 468);
            this.btnVolver.Name = "btnVolver";
            this.btnVolver.Size = new System.Drawing.Size(95, 43);
            this.btnVolver.TabIndex = 17;
            this.btnVolver.Text = "Volver";
            this.btnVolver.UseVisualStyleBackColor = false;
            this.btnVolver.Click += new System.EventHandler(this.btnVolver_Click);
            // 
            // dataConsumos
            // 
            this.dataConsumos.AllowUserToAddRows = false;
            this.dataConsumos.AllowUserToDeleteRows = false;
            this.dataConsumos.AllowUserToOrderColumns = true;
            this.dataConsumos.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataConsumos.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.nro_inventario,
            this.nombreConsumible,
            this.cantidad,
            this.fecha});
            this.dataConsumos.Location = new System.Drawing.Point(42, 113);
            this.dataConsumos.Name = "dataConsumos";
            this.dataConsumos.ReadOnly = true;
            this.dataConsumos.RowTemplate.Height = 25;
            this.dataConsumos.Size = new System.Drawing.Size(493, 348);
            this.dataConsumos.TabIndex = 18;
            this.dataConsumos.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataConsumos_CellClick);
            // 
            // nro_inventario
            // 
            this.nro_inventario.DataPropertyName = "nro_inventario";
            this.nro_inventario.HeaderText = "Nro Inventario";
            this.nro_inventario.Name = "nro_inventario";
            this.nro_inventario.ReadOnly = true;
            this.nro_inventario.Visible = false;
            // 
            // nombreConsumible
            // 
            this.nombreConsumible.DataPropertyName = "nombreConsumible";
            this.nombreConsumible.HeaderText = "Nombre Consumible";
            this.nombreConsumible.Name = "nombreConsumible";
            this.nombreConsumible.ReadOnly = true;
            this.nombreConsumible.Width = 200;
            // 
            // cantidad
            // 
            this.cantidad.DataPropertyName = "cantidad";
            this.cantidad.HeaderText = "Cantidad";
            this.cantidad.Name = "cantidad";
            this.cantidad.ReadOnly = true;
            // 
            // fecha
            // 
            this.fecha.DataPropertyName = "fecha";
            this.fecha.HeaderText = "Fecha Consumo";
            this.fecha.Name = "fecha";
            this.fecha.ReadOnly = true;
            this.fecha.Width = 150;
            // 
            // comboConsumible
            // 
            this.comboConsumible.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.comboConsumible.FormattingEnabled = true;
            this.comboConsumible.Location = new System.Drawing.Point(215, 22);
            this.comboConsumible.Name = "comboConsumible";
            this.comboConsumible.Size = new System.Drawing.Size(240, 25);
            this.comboConsumible.TabIndex = 19;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Segoe UI Symbol", 11F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.label1.Location = new System.Drawing.Point(42, 20);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(167, 20);
            this.label1.TabIndex = 20;
            this.label1.Text = "Nombre Consumible:";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Segoe UI Symbol", 11F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.label2.Location = new System.Drawing.Point(123, 63);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(86, 20);
            this.label2.TabIndex = 22;
            this.label2.Text = "Cantidad: ";
            // 
            // btnAgregar
            // 
            this.btnAgregar.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.btnAgregar.FlatAppearance.BorderColor = System.Drawing.SystemColors.ActiveBorder;
            this.btnAgregar.FlatAppearance.MouseDownBackColor = System.Drawing.Color.Blue;
            this.btnAgregar.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Blue;
            this.btnAgregar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnAgregar.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnAgregar.Location = new System.Drawing.Point(266, 61);
            this.btnAgregar.Name = "btnAgregar";
            this.btnAgregar.Size = new System.Drawing.Size(70, 28);
            this.btnAgregar.TabIndex = 23;
            this.btnAgregar.Text = "Agregar";
            this.btnAgregar.UseVisualStyleBackColor = false;
            this.btnAgregar.Click += new System.EventHandler(this.btnAgregar_Click);
            // 
            // btnRegistrarConsumos
            // 
            this.btnRegistrarConsumos.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.btnRegistrarConsumos.FlatAppearance.BorderColor = System.Drawing.SystemColors.ActiveBorder;
            this.btnRegistrarConsumos.FlatAppearance.MouseDownBackColor = System.Drawing.Color.Blue;
            this.btnRegistrarConsumos.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Blue;
            this.btnRegistrarConsumos.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnRegistrarConsumos.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnRegistrarConsumos.Location = new System.Drawing.Point(360, 468);
            this.btnRegistrarConsumos.Name = "btnRegistrarConsumos";
            this.btnRegistrarConsumos.Size = new System.Drawing.Size(175, 43);
            this.btnRegistrarConsumos.TabIndex = 24;
            this.btnRegistrarConsumos.Text = "Registrar Consumos";
            this.btnRegistrarConsumos.UseVisualStyleBackColor = false;
            this.btnRegistrarConsumos.Click += new System.EventHandler(this.btnRegistrarConsumos_Click);
            // 
            // dataConsumibles
            // 
            this.dataConsumibles.AllowUserToAddRows = false;
            this.dataConsumibles.AllowUserToDeleteRows = false;
            this.dataConsumibles.AllowUserToOrderColumns = true;
            this.dataConsumibles.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataConsumibles.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.nro,
            this.nombre,
            this.cantidadDisponible,
            this.cantidadComprada,
            this.unidad});
            this.dataConsumibles.Location = new System.Drawing.Point(42, 362);
            this.dataConsumibles.Name = "dataConsumibles";
            this.dataConsumibles.RowTemplate.Height = 25;
            this.dataConsumibles.Size = new System.Drawing.Size(115, 100);
            this.dataConsumibles.TabIndex = 26;
            this.dataConsumibles.Visible = false;
            // 
            // nro
            // 
            this.nro.DataPropertyName = "nro";
            this.nro.HeaderText = "Nro Inventario";
            this.nro.Name = "nro";
            this.nro.ReadOnly = true;
            // 
            // nombre
            // 
            this.nombre.DataPropertyName = "nombre";
            this.nombre.HeaderText = "Nombre";
            this.nombre.Name = "nombre";
            this.nombre.ReadOnly = true;
            // 
            // cantidadDisponible
            // 
            this.cantidadDisponible.DataPropertyName = "cantidadDisponible";
            this.cantidadDisponible.HeaderText = "Cantidad Disponible";
            this.cantidadDisponible.Name = "cantidadDisponible";
            this.cantidadDisponible.ReadOnly = true;
            // 
            // cantidadComprada
            // 
            this.cantidadComprada.DataPropertyName = "cantidadComprada";
            this.cantidadComprada.HeaderText = "Cantidad Comprada";
            this.cantidadComprada.Name = "cantidadComprada";
            // 
            // unidad
            // 
            this.unidad.DataPropertyName = "unidad";
            this.unidad.HeaderText = "Unidad";
            this.unidad.Name = "unidad";
            // 
            // dtFecha
            // 
            this.dtFecha.Location = new System.Drawing.Point(461, 22);
            this.dtFecha.Name = "dtFecha";
            this.dtFecha.Size = new System.Drawing.Size(200, 25);
            this.dtFecha.TabIndex = 28;
            this.dtFecha.Visible = false;
            // 
            // btnMostrarConsumos
            // 
            this.btnMostrarConsumos.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.btnMostrarConsumos.FlatAppearance.BorderColor = System.Drawing.SystemColors.ActiveBorder;
            this.btnMostrarConsumos.FlatAppearance.MouseDownBackColor = System.Drawing.Color.Blue;
            this.btnMostrarConsumos.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Blue;
            this.btnMostrarConsumos.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnMostrarConsumos.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnMostrarConsumos.Location = new System.Drawing.Point(86, 468);
            this.btnMostrarConsumos.Name = "btnMostrarConsumos";
            this.btnMostrarConsumos.Size = new System.Drawing.Size(167, 43);
            this.btnMostrarConsumos.TabIndex = 29;
            this.btnMostrarConsumos.Text = "Mostrar Consumos";
            this.btnMostrarConsumos.UseVisualStyleBackColor = false;
            this.btnMostrarConsumos.Click += new System.EventHandler(this.btnMostrarConsumos_Click);
            // 
            // btnEliminar
            // 
            this.btnEliminar.BackColor = System.Drawing.Color.Red;
            this.btnEliminar.FlatAppearance.BorderColor = System.Drawing.SystemColors.ActiveBorder;
            this.btnEliminar.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.btnEliminar.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.btnEliminar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnEliminar.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnEliminar.Location = new System.Drawing.Point(342, 61);
            this.btnEliminar.Name = "btnEliminar";
            this.btnEliminar.Size = new System.Drawing.Size(67, 28);
            this.btnEliminar.TabIndex = 36;
            this.btnEliminar.Text = "Eliminar";
            this.btnEliminar.UseVisualStyleBackColor = false;
            this.btnEliminar.Click += new System.EventHandler(this.btnEliminar_Click);
            // 
            // maskedCantidad
            // 
            this.maskedCantidad.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.maskedCantidad.Location = new System.Drawing.Point(209, 63);
            this.maskedCantidad.Mask = "99.99";
            this.maskedCantidad.Name = "maskedCantidad";
            this.maskedCantidad.Size = new System.Drawing.Size(44, 25);
            this.maskedCantidad.TabIndex = 37;
            this.maskedCantidad.ValidatingType = typeof(int);
            // 
            // Consumos
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Blue;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(594, 542);
            this.Controls.Add(this.maskedCantidad);
            this.Controls.Add(this.btnEliminar);
            this.Controls.Add(this.btnMostrarConsumos);
            this.Controls.Add(this.dtFecha);
            this.Controls.Add(this.dataConsumibles);
            this.Controls.Add(this.btnRegistrarConsumos);
            this.Controls.Add(this.btnAgregar);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.comboConsumible);
            this.Controls.Add(this.dataConsumos);
            this.Controls.Add(this.btnVolver);
            this.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "Consumos";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Consumos";
            this.Load += new System.EventHandler(this.Consumos_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataConsumos)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataConsumibles)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Button btnVolver;
        private DataGridView dataConsumos;
        private ComboBox comboConsumible;
        private Label label1;
        private Label label2;
        private Button btnAgregar;
        private Button btnRegistrarConsumos;
        private DataGridView dataConsumibles;
        private DateTimePicker dtFecha;
        private DataGridViewTextBoxColumn nro_inventario;
        private DataGridViewTextBoxColumn nombreConsumible;
        private DataGridViewTextBoxColumn cantidad;
        private DataGridViewTextBoxColumn fecha;
        private Button btnMostrarConsumos;
        private Button btnEliminar;
        private DataGridViewTextBoxColumn nro;
        private DataGridViewTextBoxColumn nombre;
        private DataGridViewTextBoxColumn cantidadDisponible;
        private DataGridViewTextBoxColumn cantidadComprada;
        private DataGridViewTextBoxColumn unidad;
        private MaskedTextBox maskedCantidad;
    }
}