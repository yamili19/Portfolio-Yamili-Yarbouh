namespace Para_inventario.Interfaces
{
    partial class frmHerramientaProblema
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
            this.btnReportar = new System.Windows.Forms.Button();
            this.dataHConsultar = new System.Windows.Forms.DataGridView();
            this.Nombre = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.Codigo = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.Problema = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.nro = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.btnBuscar = new System.Windows.Forms.Button();
            this.txtNombre = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.txtCodigo = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.dataHConsultar)).BeginInit();
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
            this.btnVolver.Location = new System.Drawing.Point(403, 440);
            this.btnVolver.Name = "btnVolver";
            this.btnVolver.Size = new System.Drawing.Size(95, 43);
            this.btnVolver.TabIndex = 17;
            this.btnVolver.Text = "Volver";
            this.btnVolver.UseVisualStyleBackColor = false;
            this.btnVolver.Click += new System.EventHandler(this.btnVolver_Click);
            // 
            // btnReportar
            // 
            this.btnReportar.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.btnReportar.FlatAppearance.BorderColor = System.Drawing.SystemColors.ActiveBorder;
            this.btnReportar.FlatAppearance.MouseDownBackColor = System.Drawing.Color.Blue;
            this.btnReportar.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Blue;
            this.btnReportar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnReportar.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnReportar.Location = new System.Drawing.Point(504, 440);
            this.btnReportar.Name = "btnReportar";
            this.btnReportar.Size = new System.Drawing.Size(168, 43);
            this.btnReportar.TabIndex = 18;
            this.btnReportar.Text = "Reportar Problema";
            this.btnReportar.UseVisualStyleBackColor = false;
            this.btnReportar.Click += new System.EventHandler(this.btnActualizar_Click);
            // 
            // dataHConsultar
            // 
            this.dataHConsultar.AllowUserToAddRows = false;
            this.dataHConsultar.AllowUserToDeleteRows = false;
            this.dataHConsultar.AllowUserToOrderColumns = true;
            this.dataHConsultar.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataHConsultar.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.Nombre,
            this.Codigo,
            this.Problema,
            this.nro});
            this.dataHConsultar.Location = new System.Drawing.Point(129, 78);
            this.dataHConsultar.Name = "dataHConsultar";
            this.dataHConsultar.RowTemplate.Height = 25;
            this.dataHConsultar.Size = new System.Drawing.Size(543, 356);
            this.dataHConsultar.TabIndex = 24;
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
            // btnBuscar
            // 
            this.btnBuscar.Location = new System.Drawing.Point(314, 36);
            this.btnBuscar.Name = "btnBuscar";
            this.btnBuscar.Size = new System.Drawing.Size(75, 26);
            this.btnBuscar.TabIndex = 40;
            this.btnBuscar.Text = "Buscar";
            this.btnBuscar.UseVisualStyleBackColor = true;
            this.btnBuscar.Click += new System.EventHandler(this.btnBuscar_Click);
            // 
            // txtNombre
            // 
            this.txtNombre.Location = new System.Drawing.Point(478, 37);
            this.txtNombre.Name = "txtNombre";
            this.txtNombre.Size = new System.Drawing.Size(134, 25);
            this.txtNombre.TabIndex = 39;
            this.txtNombre.TextChanged += new System.EventHandler(this.txtNombre_TextChanged);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.label4.Location = new System.Drawing.Point(395, 37);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(77, 21);
            this.label4.TabIndex = 38;
            this.label4.Text = "Nombre:";
            // 
            // txtCodigo
            // 
            this.txtCodigo.Location = new System.Drawing.Point(208, 36);
            this.txtCodigo.Name = "txtCodigo";
            this.txtCodigo.Size = new System.Drawing.Size(100, 25);
            this.txtCodigo.TabIndex = 37;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.label3.Location = new System.Drawing.Point(129, 36);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(73, 21);
            this.label3.TabIndex = 36;
            this.label3.Text = "Codigo: ";
            // 
            // frmHerramientaProblema
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackgroundImage = global::Para_inventario.Properties.Resources.iStock_493585980;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(800, 512);
            this.Controls.Add(this.btnBuscar);
            this.Controls.Add(this.txtNombre);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.txtCodigo);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.dataHConsultar);
            this.Controls.Add(this.btnReportar);
            this.Controls.Add(this.btnVolver);
            this.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "frmHerramientaProblema";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "frmHerramientaProblema";
            this.Load += new System.EventHandler(this.frmHerramientaProblema_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataHConsultar)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private Button btnVolver;
        private Button btnReportar;
        private DataGridView dataHConsultar;
        private Button btnBuscar;
        private TextBox txtNombre;
        private Label label4;
        private TextBox txtCodigo;
        private Label label3;
        private DataGridViewTextBoxColumn Nombre;
        private DataGridViewTextBoxColumn Codigo;
        private DataGridViewTextBoxColumn Problema;
        private DataGridViewTextBoxColumn nro;
    }
}