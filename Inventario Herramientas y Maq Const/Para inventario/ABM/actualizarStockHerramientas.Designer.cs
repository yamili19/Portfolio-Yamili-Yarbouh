namespace Para_inventario.ABM
{
    partial class actualizarStockHerramientas
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
            this.btnActualizar = new System.Windows.Forms.Button();
            this.btnVolver = new System.Windows.Forms.Button();
            this.dataHerramienta = new System.Windows.Forms.DataGridView();
            this.txtNombre = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.nro = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.nombre = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.marca = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.material = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.lugar = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.cantidad = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.cantidadIngresada = new System.Windows.Forms.DataGridViewTextBoxColumn();
            ((System.ComponentModel.ISupportInitialize)(this.dataHerramienta)).BeginInit();
            this.SuspendLayout();
            // 
            // btnActualizar
            // 
            this.btnActualizar.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.btnActualizar.Enabled = false;
            this.btnActualizar.FlatAppearance.BorderColor = System.Drawing.SystemColors.ActiveBorder;
            this.btnActualizar.FlatAppearance.MouseDownBackColor = System.Drawing.Color.Blue;
            this.btnActualizar.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Blue;
            this.btnActualizar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnActualizar.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnActualizar.Location = new System.Drawing.Point(679, 431);
            this.btnActualizar.Name = "btnActualizar";
            this.btnActualizar.Size = new System.Drawing.Size(107, 56);
            this.btnActualizar.TabIndex = 34;
            this.btnActualizar.Text = "Actualizar";
            this.btnActualizar.UseVisualStyleBackColor = false;
            this.btnActualizar.Click += new System.EventHandler(this.btnActualizar_Click);
            // 
            // btnVolver
            // 
            this.btnVolver.BackColor = System.Drawing.Color.Red;
            this.btnVolver.FlatAppearance.BorderColor = System.Drawing.SystemColors.ActiveBorder;
            this.btnVolver.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.btnVolver.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.btnVolver.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnVolver.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnVolver.Location = new System.Drawing.Point(559, 431);
            this.btnVolver.Name = "btnVolver";
            this.btnVolver.Size = new System.Drawing.Size(95, 56);
            this.btnVolver.TabIndex = 33;
            this.btnVolver.Text = "Volver";
            this.btnVolver.UseVisualStyleBackColor = false;
            this.btnVolver.Click += new System.EventHandler(this.btnVolver_Click);
            // 
            // dataHerramienta
            // 
            this.dataHerramienta.AllowUserToAddRows = false;
            this.dataHerramienta.AllowUserToDeleteRows = false;
            this.dataHerramienta.AllowUserToOrderColumns = true;
            this.dataHerramienta.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataHerramienta.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.nro,
            this.nombre,
            this.marca,
            this.material,
            this.lugar,
            this.cantidad,
            this.cantidadIngresada});
            this.dataHerramienta.Location = new System.Drawing.Point(43, 68);
            this.dataHerramienta.Name = "dataHerramienta";
            this.dataHerramienta.RowTemplate.Height = 25;
            this.dataHerramienta.Size = new System.Drawing.Size(743, 341);
            this.dataHerramienta.TabIndex = 35;
            this.dataHerramienta.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataHerramienta_CellClick);
            this.dataHerramienta.DataError += new System.Windows.Forms.DataGridViewDataErrorEventHandler(this.dataHerramienta_DataError);
            // 
            // txtNombre
            // 
            this.txtNombre.Location = new System.Drawing.Point(126, 28);
            this.txtNombre.Name = "txtNombre";
            this.txtNombre.Size = new System.Drawing.Size(134, 25);
            this.txtNombre.TabIndex = 37;
            this.txtNombre.TextChanged += new System.EventHandler(this.txtNombre_TextChanged);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.label4.Location = new System.Drawing.Point(43, 28);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(77, 21);
            this.label4.TabIndex = 36;
            this.label4.Text = "Nombre:";
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
            // marca
            // 
            this.marca.DataPropertyName = "marca";
            this.marca.HeaderText = "Marca";
            this.marca.Name = "marca";
            this.marca.ReadOnly = true;
            // 
            // material
            // 
            this.material.DataPropertyName = "material";
            this.material.HeaderText = "Material";
            this.material.Name = "material";
            this.material.ReadOnly = true;
            // 
            // lugar
            // 
            this.lugar.DataPropertyName = "lugar";
            this.lugar.HeaderText = "Lugar";
            this.lugar.Name = "lugar";
            this.lugar.ReadOnly = true;
            // 
            // cantidad
            // 
            this.cantidad.DataPropertyName = "cantidad";
            this.cantidad.HeaderText = "Cantidad";
            this.cantidad.Name = "cantidad";
            this.cantidad.ReadOnly = true;
            // 
            // cantidadIngresada
            // 
            this.cantidadIngresada.HeaderText = "Cantidad Ingresada";
            this.cantidadIngresada.Name = "cantidadIngresada";
            // 
            // actualizarStockHerramientas
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackgroundImage = global::Para_inventario.Properties.Resources.iStock_493585980;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(838, 510);
            this.Controls.Add(this.txtNombre);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.dataHerramienta);
            this.Controls.Add(this.btnActualizar);
            this.Controls.Add(this.btnVolver);
            this.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "actualizarStockHerramientas";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "actualizarStockHerramientas";
            this.Load += new System.EventHandler(this.actualizarStockHerramientas_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataHerramienta)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Button btnActualizar;
        private Button btnVolver;
        private DataGridView dataHerramienta;
        private TextBox txtNombre;
        private Label label4;
        private DataGridViewTextBoxColumn nro;
        private DataGridViewTextBoxColumn nombre;
        private DataGridViewTextBoxColumn marca;
        private DataGridViewTextBoxColumn material;
        private DataGridViewTextBoxColumn lugar;
        private DataGridViewTextBoxColumn cantidad;
        private DataGridViewTextBoxColumn cantidadIngresada;
    }
}