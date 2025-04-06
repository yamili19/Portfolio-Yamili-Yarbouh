namespace Para_inventario.Interfaces
{
    partial class eliminarMueble
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
            this.btnEliminar = new System.Windows.Forms.Button();
            this.dataMuebleEliminar = new System.Windows.Forms.DataGridView();
            this.nro = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.nombre = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.material = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.lugar = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.adquirido = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.cantidad = new System.Windows.Forms.DataGridViewTextBoxColumn();
            ((System.ComponentModel.ISupportInitialize)(this.dataMuebleEliminar)).BeginInit();
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
            this.btnVolver.Location = new System.Drawing.Point(466, 397);
            this.btnVolver.Name = "btnVolver";
            this.btnVolver.Size = new System.Drawing.Size(95, 43);
            this.btnVolver.TabIndex = 20;
            this.btnVolver.Text = "Volver";
            this.btnVolver.UseVisualStyleBackColor = false;
            this.btnVolver.Click += new System.EventHandler(this.btnVolver_Click);
            // 
            // btnEliminar
            // 
            this.btnEliminar.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.btnEliminar.FlatAppearance.BorderColor = System.Drawing.SystemColors.ActiveBorder;
            this.btnEliminar.FlatAppearance.MouseDownBackColor = System.Drawing.Color.Blue;
            this.btnEliminar.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Blue;
            this.btnEliminar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnEliminar.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnEliminar.Location = new System.Drawing.Point(593, 397);
            this.btnEliminar.Name = "btnEliminar";
            this.btnEliminar.Size = new System.Drawing.Size(95, 43);
            this.btnEliminar.TabIndex = 19;
            this.btnEliminar.Text = "Eliminar";
            this.btnEliminar.UseVisualStyleBackColor = false;
            this.btnEliminar.Click += new System.EventHandler(this.btnEliminar_Click);
            // 
            // dataMuebleEliminar
            // 
            this.dataMuebleEliminar.AllowUserToAddRows = false;
            this.dataMuebleEliminar.AllowUserToDeleteRows = false;
            this.dataMuebleEliminar.AllowUserToOrderColumns = true;
            this.dataMuebleEliminar.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataMuebleEliminar.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.nro,
            this.nombre,
            this.material,
            this.lugar,
            this.adquirido,
            this.cantidad});
            this.dataMuebleEliminar.Location = new System.Drawing.Point(45, 41);
            this.dataMuebleEliminar.Name = "dataMuebleEliminar";
            this.dataMuebleEliminar.ReadOnly = true;
            this.dataMuebleEliminar.RowTemplate.Height = 25;
            this.dataMuebleEliminar.Size = new System.Drawing.Size(643, 335);
            this.dataMuebleEliminar.TabIndex = 21;
            this.dataMuebleEliminar.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataMuebleEliminar_CellClick);
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
            // eliminarMueble
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackgroundImage = global::Para_inventario.Properties.Resources.fbd5599924f8;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(748, 473);
            this.Controls.Add(this.dataMuebleEliminar);
            this.Controls.Add(this.btnVolver);
            this.Controls.Add(this.btnEliminar);
            this.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "eliminarMueble";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "eliminarMueble";
            this.Load += new System.EventHandler(this.eliminarMueble_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataMuebleEliminar)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private Button btnVolver;
        private Button btnEliminar;
        private DataGridView dataMuebleEliminar;
        private DataGridViewTextBoxColumn nro;
        private DataGridViewTextBoxColumn nombre;
        private DataGridViewTextBoxColumn material;
        private DataGridViewTextBoxColumn lugar;
        private DataGridViewTextBoxColumn adquirido;
        private DataGridViewTextBoxColumn cantidad;
    }
}