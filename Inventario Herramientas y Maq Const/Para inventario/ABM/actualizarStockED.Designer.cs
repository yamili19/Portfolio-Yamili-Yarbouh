namespace Para_inventario.ABM
{
    partial class actualizarStockED
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
            this.dataED = new System.Windows.Forms.DataGridView();
            this.nro = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.nombre = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.cantidadDisponible = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.cantidadIngresada = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.txtNombre = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.dataED)).BeginInit();
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
            this.btnActualizar.Location = new System.Drawing.Point(415, 423);
            this.btnActualizar.Name = "btnActualizar";
            this.btnActualizar.Size = new System.Drawing.Size(107, 49);
            this.btnActualizar.TabIndex = 32;
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
            this.btnVolver.Location = new System.Drawing.Point(295, 423);
            this.btnVolver.Name = "btnVolver";
            this.btnVolver.Size = new System.Drawing.Size(95, 49);
            this.btnVolver.TabIndex = 31;
            this.btnVolver.Text = "Volver";
            this.btnVolver.UseVisualStyleBackColor = false;
            this.btnVolver.Click += new System.EventHandler(this.btnVolver_Click);
            // 
            // dataED
            // 
            this.dataED.AllowUserToAddRows = false;
            this.dataED.AllowUserToDeleteRows = false;
            this.dataED.AllowUserToOrderColumns = true;
            this.dataED.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataED.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.nro,
            this.nombre,
            this.cantidadDisponible,
            this.cantidadIngresada});
            this.dataED.Location = new System.Drawing.Point(78, 69);
            this.dataED.Name = "dataED";
            this.dataED.RowTemplate.Height = 25;
            this.dataED.Size = new System.Drawing.Size(444, 339);
            this.dataED.TabIndex = 33;
            this.dataED.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataED_CellClick);
            this.dataED.DataError += new System.Windows.Forms.DataGridViewDataErrorEventHandler(this.dataED_DataError);
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
            // cantidadIngresada
            // 
            this.cantidadIngresada.HeaderText = "Cantidad Ingresada";
            this.cantidadIngresada.Name = "cantidadIngresada";
            // 
            // txtNombre
            // 
            this.txtNombre.Location = new System.Drawing.Point(161, 25);
            this.txtNombre.Name = "txtNombre";
            this.txtNombre.Size = new System.Drawing.Size(134, 25);
            this.txtNombre.TabIndex = 35;
            this.txtNombre.TextChanged += new System.EventHandler(this.txtNombre_TextChanged);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.label4.Location = new System.Drawing.Point(78, 25);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(77, 21);
            this.label4.TabIndex = 34;
            this.label4.Text = "Nombre:";
            // 
            // actualizarStockED
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackgroundImage = global::Para_inventario.Properties.Resources.tablero_regla_t;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(590, 498);
            this.Controls.Add(this.txtNombre);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.dataED);
            this.Controls.Add(this.btnActualizar);
            this.Controls.Add(this.btnVolver);
            this.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "actualizarStockED";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "actualizarStockED";
            this.Load += new System.EventHandler(this.actualizarStockED_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataED)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Button btnActualizar;
        private Button btnVolver;
        private DataGridView dataED;
        private TextBox txtNombre;
        private Label label4;
        private DataGridViewTextBoxColumn nro;
        private DataGridViewTextBoxColumn nombre;
        private DataGridViewTextBoxColumn cantidadDisponible;
        private DataGridViewTextBoxColumn cantidadIngresada;
    }
}