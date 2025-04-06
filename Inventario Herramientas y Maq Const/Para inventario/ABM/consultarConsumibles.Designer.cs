namespace Para_inventario.Interfaces
{
    partial class consultarConsumibles
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
            this.dataConsumiblesConsultar = new System.Windows.Forms.DataGridView();
            this.nro = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.nombre = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.cantidadDisponible = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.cantidadComprada = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.unidad = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.txtNombre = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.dataConsumiblesConsultar)).BeginInit();
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
            this.btnVolver.Location = new System.Drawing.Point(385, 434);
            this.btnVolver.Name = "btnVolver";
            this.btnVolver.Size = new System.Drawing.Size(128, 43);
            this.btnVolver.TabIndex = 21;
            this.btnVolver.Text = "Volver";
            this.btnVolver.UseVisualStyleBackColor = false;
            this.btnVolver.Click += new System.EventHandler(this.btnVolver_Click);
            // 
            // dataConsumiblesConsultar
            // 
            this.dataConsumiblesConsultar.AllowUserToAddRows = false;
            this.dataConsumiblesConsultar.AllowUserToDeleteRows = false;
            this.dataConsumiblesConsultar.AllowUserToOrderColumns = true;
            this.dataConsumiblesConsultar.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataConsumiblesConsultar.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.nro,
            this.nombre,
            this.cantidadDisponible,
            this.cantidadComprada,
            this.unidad});
            this.dataConsumiblesConsultar.Location = new System.Drawing.Point(21, 80);
            this.dataConsumiblesConsultar.Name = "dataConsumiblesConsultar";
            this.dataConsumiblesConsultar.ReadOnly = true;
            this.dataConsumiblesConsultar.RowTemplate.Height = 25;
            this.dataConsumiblesConsultar.Size = new System.Drawing.Size(492, 347);
            this.dataConsumiblesConsultar.TabIndex = 27;
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
            this.cantidadDisponible.Width = 150;
            // 
            // cantidadComprada
            // 
            this.cantidadComprada.DataPropertyName = "cantidadComprada";
            this.cantidadComprada.HeaderText = "Cantidad Comprada";
            this.cantidadComprada.Name = "cantidadComprada";
            this.cantidadComprada.ReadOnly = true;
            this.cantidadComprada.Visible = false;
            // 
            // unidad
            // 
            this.unidad.DataPropertyName = "unidad";
            this.unidad.HeaderText = "Unidad";
            this.unidad.Name = "unidad";
            this.unidad.ReadOnly = true;
            // 
            // txtNombre
            // 
            this.txtNombre.Location = new System.Drawing.Point(232, 31);
            this.txtNombre.Name = "txtNombre";
            this.txtNombre.Size = new System.Drawing.Size(134, 25);
            this.txtNombre.TabIndex = 33;
            this.txtNombre.TextChanged += new System.EventHandler(this.txtNombre_TextChanged);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.label4.Location = new System.Drawing.Point(149, 31);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(77, 21);
            this.label4.TabIndex = 32;
            this.label4.Text = "Nombre:";
            // 
            // consultarConsumibles
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackgroundImage = global::Para_inventario.Properties.Resources.precision_erasers_group;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(535, 495);
            this.Controls.Add(this.txtNombre);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.dataConsumiblesConsultar);
            this.Controls.Add(this.btnVolver);
            this.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "consultarConsumibles";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "consultarConsumibles";
            this.Load += new System.EventHandler(this.consultarConsumibles_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataConsumiblesConsultar)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Button btnVolver;
        private DataGridView dataConsumiblesConsultar;
        private TextBox txtNombre;
        private Label label4;
        private DataGridViewTextBoxColumn nro;
        private DataGridViewTextBoxColumn nombre;
        private DataGridViewTextBoxColumn cantidadDisponible;
        private DataGridViewTextBoxColumn cantidadComprada;
        private DataGridViewTextBoxColumn unidad;
    }
}