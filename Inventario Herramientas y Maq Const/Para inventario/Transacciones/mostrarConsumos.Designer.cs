namespace Para_inventario.Transacciones
{
    partial class mostrarConsumos
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
            this.label1 = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.dataConsumos)).BeginInit();
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
            this.btnVolver.Location = new System.Drawing.Point(438, 398);
            this.btnVolver.Name = "btnVolver";
            this.btnVolver.Size = new System.Drawing.Size(95, 43);
            this.btnVolver.TabIndex = 18;
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
            this.dataConsumos.Location = new System.Drawing.Point(40, 43);
            this.dataConsumos.Name = "dataConsumos";
            this.dataConsumos.ReadOnly = true;
            this.dataConsumos.RowTemplate.Height = 25;
            this.dataConsumos.Size = new System.Drawing.Size(493, 348);
            this.dataConsumos.TabIndex = 19;
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
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.label1.Location = new System.Drawing.Point(218, 17);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(156, 20);
            this.label1.TabIndex = 20;
            this.label1.Text = "Todos Los Consumos";
            // 
            // mostrarConsumos
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Blue;
            this.ClientSize = new System.Drawing.Size(573, 461);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.dataConsumos);
            this.Controls.Add(this.btnVolver);
            this.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "mostrarConsumos";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "mostrarConsumos";
            this.Load += new System.EventHandler(this.mostrarConsumos_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataConsumos)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Button btnVolver;
        private DataGridView dataConsumos;
        private DataGridViewTextBoxColumn nro_inventario;
        private DataGridViewTextBoxColumn nombreConsumible;
        private DataGridViewTextBoxColumn cantidad;
        private DataGridViewTextBoxColumn fecha;
        private Label label1;
    }
}