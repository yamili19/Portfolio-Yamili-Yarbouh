namespace Para_inventario.Interfaces
{
    partial class consultarMueble
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
            this.txtNombre = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.txtNroInventario = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.btnVolver = new System.Windows.Forms.Button();
            this.dataMuebleConsultar = new System.Windows.Forms.DataGridView();
            this.nro = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.nombre = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.material = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.lugar = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.adquirido = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.cantidad = new System.Windows.Forms.DataGridViewTextBoxColumn();
            ((System.ComponentModel.ISupportInitialize)(this.dataMuebleConsultar)).BeginInit();
            this.SuspendLayout();
            // 
            // txtNombre
            // 
            this.txtNombre.Location = new System.Drawing.Point(384, 10);
            this.txtNombre.Name = "txtNombre";
            this.txtNombre.Size = new System.Drawing.Size(134, 25);
            this.txtNombre.TabIndex = 37;
            this.txtNombre.TextChanged += new System.EventHandler(this.txtNombre_TextChanged);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.label4.Location = new System.Drawing.Point(301, 10);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(77, 21);
            this.label4.TabIndex = 36;
            this.label4.Text = "Nombre:";
            // 
            // txtNroInventario
            // 
            this.txtNroInventario.Location = new System.Drawing.Point(177, 10);
            this.txtNroInventario.Name = "txtNroInventario";
            this.txtNroInventario.Size = new System.Drawing.Size(100, 25);
            this.txtNroInventario.TabIndex = 35;
            this.txtNroInventario.TextChanged += new System.EventHandler(this.txtNroInventario_TextChanged);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.label3.Location = new System.Drawing.Point(45, 10);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(126, 21);
            this.label3.TabIndex = 34;
            this.label3.Text = "Nro Inventario:";
            // 
            // btnVolver
            // 
            this.btnVolver.BackColor = System.Drawing.Color.Red;
            this.btnVolver.FlatAppearance.BorderColor = System.Drawing.SystemColors.ActiveBorder;
            this.btnVolver.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.btnVolver.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.btnVolver.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnVolver.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnVolver.Location = new System.Drawing.Point(593, 397);
            this.btnVolver.Name = "btnVolver";
            this.btnVolver.Size = new System.Drawing.Size(95, 43);
            this.btnVolver.TabIndex = 38;
            this.btnVolver.Text = "Volver";
            this.btnVolver.UseVisualStyleBackColor = false;
            this.btnVolver.Click += new System.EventHandler(this.btnVolver_Click);
            // 
            // dataMuebleConsultar
            // 
            this.dataMuebleConsultar.AllowUserToAddRows = false;
            this.dataMuebleConsultar.AllowUserToDeleteRows = false;
            this.dataMuebleConsultar.AllowUserToOrderColumns = true;
            this.dataMuebleConsultar.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataMuebleConsultar.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.nro,
            this.nombre,
            this.material,
            this.lugar,
            this.adquirido,
            this.cantidad});
            this.dataMuebleConsultar.Location = new System.Drawing.Point(45, 41);
            this.dataMuebleConsultar.Name = "dataMuebleConsultar";
            this.dataMuebleConsultar.ReadOnly = true;
            this.dataMuebleConsultar.RowTemplate.Height = 25;
            this.dataMuebleConsultar.Size = new System.Drawing.Size(643, 335);
            this.dataMuebleConsultar.TabIndex = 39;
            // 
            // nro
            // 
            this.nro.DataPropertyName = "nro";
            this.nro.HeaderText = "Nro Iventario";
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
            // adquirido
            // 
            this.adquirido.DataPropertyName = "adquirido";
            this.adquirido.HeaderText = "Adquirido";
            this.adquirido.Name = "adquirido";
            this.adquirido.ReadOnly = true;
            // 
            // cantidad
            // 
            this.cantidad.DataPropertyName = "cantidad";
            this.cantidad.HeaderText = "Cantidad";
            this.cantidad.Name = "cantidad";
            this.cantidad.ReadOnly = true;
            // 
            // consultarMueble
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackgroundImage = global::Para_inventario.Properties.Resources.fbd5599924f8;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(748, 473);
            this.Controls.Add(this.dataMuebleConsultar);
            this.Controls.Add(this.btnVolver);
            this.Controls.Add(this.txtNombre);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.txtNroInventario);
            this.Controls.Add(this.label3);
            this.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "consultarMueble";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "consultarMueble";
            this.Load += new System.EventHandler(this.consultarMueble_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataMuebleConsultar)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private TextBox txtNombre;
        private Label label4;
        private TextBox txtNroInventario;
        private Label label3;
        private Button btnVolver;
        private DataGridView dataMuebleConsultar;
        private DataGridViewTextBoxColumn nro;
        private DataGridViewTextBoxColumn nombre;
        private DataGridViewTextBoxColumn material;
        private DataGridViewTextBoxColumn lugar;
        private DataGridViewTextBoxColumn adquirido;
        private DataGridViewTextBoxColumn cantidad;
    }
}