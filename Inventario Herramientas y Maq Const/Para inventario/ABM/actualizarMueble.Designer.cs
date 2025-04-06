namespace Para_inventario.Interfaces
{
    partial class actualizarMueble
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
            this.dataMuebleActualizar = new System.Windows.Forms.DataGridView();
            this.nro = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.nombre = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.material = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.lugar = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.adquirido = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.cantidad = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.btnActualizar = new System.Windows.Forms.Button();
            this.btnVolver = new System.Windows.Forms.Button();
            this.lblHerramientas = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.dataMuebleActualizar)).BeginInit();
            this.SuspendLayout();
            // 
            // dataMuebleActualizar
            // 
            this.dataMuebleActualizar.AllowUserToAddRows = false;
            this.dataMuebleActualizar.AllowUserToDeleteRows = false;
            this.dataMuebleActualizar.AllowUserToOrderColumns = true;
            this.dataMuebleActualizar.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataMuebleActualizar.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.nro,
            this.nombre,
            this.material,
            this.lugar,
            this.adquirido,
            this.cantidad});
            this.dataMuebleActualizar.Location = new System.Drawing.Point(45, 46);
            this.dataMuebleActualizar.Name = "dataMuebleActualizar";
            this.dataMuebleActualizar.RowTemplate.Height = 25;
            this.dataMuebleActualizar.Size = new System.Drawing.Size(643, 335);
            this.dataMuebleActualizar.TabIndex = 22;
            this.dataMuebleActualizar.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataMuebleActualizar_CellClick);
            this.dataMuebleActualizar.DataError += new System.Windows.Forms.DataGridViewDataErrorEventHandler(this.dataMuebleActualizar_DataError);
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
            // 
            // btnActualizar
            // 
            this.btnActualizar.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.btnActualizar.FlatAppearance.BorderColor = System.Drawing.SystemColors.ActiveBorder;
            this.btnActualizar.FlatAppearance.MouseDownBackColor = System.Drawing.Color.Blue;
            this.btnActualizar.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Blue;
            this.btnActualizar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnActualizar.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnActualizar.Location = new System.Drawing.Point(581, 400);
            this.btnActualizar.Name = "btnActualizar";
            this.btnActualizar.Size = new System.Drawing.Size(107, 43);
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
            this.btnVolver.Location = new System.Drawing.Point(461, 400);
            this.btnVolver.Name = "btnVolver";
            this.btnVolver.Size = new System.Drawing.Size(95, 43);
            this.btnVolver.TabIndex = 31;
            this.btnVolver.Text = "Volver";
            this.btnVolver.UseVisualStyleBackColor = false;
            this.btnVolver.Click += new System.EventHandler(this.btnVolver_Click);
            // 
            // lblHerramientas
            // 
            this.lblHerramientas.AutoSize = true;
            this.lblHerramientas.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblHerramientas.Location = new System.Drawing.Point(317, 20);
            this.lblHerramientas.Name = "lblHerramientas";
            this.lblHerramientas.Size = new System.Drawing.Size(142, 20);
            this.lblHerramientas.TabIndex = 33;
            this.lblHerramientas.Text = "Todos Los Muebles";
            // 
            // actualizarMueble
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackgroundImage = global::Para_inventario.Properties.Resources.fbd5599924f8;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(748, 473);
            this.Controls.Add(this.lblHerramientas);
            this.Controls.Add(this.btnActualizar);
            this.Controls.Add(this.btnVolver);
            this.Controls.Add(this.dataMuebleActualizar);
            this.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "actualizarMueble";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "actualizarMueble";
            this.Load += new System.EventHandler(this.actualizarMueble_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataMuebleActualizar)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private DataGridView dataMuebleActualizar;
        private Button btnActualizar;
        private Button btnVolver;
        private Label lblHerramientas;
        private DataGridViewTextBoxColumn nro;
        private DataGridViewTextBoxColumn nombre;
        private DataGridViewTextBoxColumn material;
        private DataGridViewTextBoxColumn lugar;
        private DataGridViewTextBoxColumn adquirido;
        private DataGridViewTextBoxColumn cantidad;
    }
}