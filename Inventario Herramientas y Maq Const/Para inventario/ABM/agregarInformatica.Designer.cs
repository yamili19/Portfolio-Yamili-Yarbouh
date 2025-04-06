namespace Para_inventario.Interfaces
{
    partial class agregarInformatica
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
            this.btnAgregar = new System.Windows.Forms.Button();
            this.checkCantidad = new System.Windows.Forms.CheckBox();
            this.maskCantidad = new System.Windows.Forms.MaskedTextBox();
            this.lblCantidad = new System.Windows.Forms.Label();
            this.txtLugar = new System.Windows.Forms.TextBox();
            this.txtMarca = new System.Windows.Forms.TextBox();
            this.txtNombre = new System.Windows.Forms.TextBox();
            this.lblLugar = new System.Windows.Forms.Label();
            this.lblMarca = new System.Windows.Forms.Label();
            this.lblNombre = new System.Windows.Forms.Label();
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
            this.btnVolver.Location = new System.Drawing.Point(400, 138);
            this.btnVolver.Name = "btnVolver";
            this.btnVolver.Size = new System.Drawing.Size(95, 43);
            this.btnVolver.TabIndex = 18;
            this.btnVolver.Text = "Volver";
            this.btnVolver.UseVisualStyleBackColor = false;
            this.btnVolver.Click += new System.EventHandler(this.btnVolver_Click);
            // 
            // btnAgregar
            // 
            this.btnAgregar.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.btnAgregar.FlatAppearance.BorderColor = System.Drawing.SystemColors.ActiveBorder;
            this.btnAgregar.FlatAppearance.MouseDownBackColor = System.Drawing.Color.Blue;
            this.btnAgregar.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Blue;
            this.btnAgregar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnAgregar.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnAgregar.Location = new System.Drawing.Point(400, 71);
            this.btnAgregar.Name = "btnAgregar";
            this.btnAgregar.Size = new System.Drawing.Size(95, 43);
            this.btnAgregar.TabIndex = 17;
            this.btnAgregar.Text = "Agregar";
            this.btnAgregar.UseVisualStyleBackColor = false;
            this.btnAgregar.Click += new System.EventHandler(this.btnAgregar_Click);
            // 
            // checkCantidad
            // 
            this.checkCantidad.AutoSize = true;
            this.checkCantidad.ForeColor = System.Drawing.Color.Red;
            this.checkCantidad.Location = new System.Drawing.Point(239, 170);
            this.checkCantidad.Name = "checkCantidad";
            this.checkCantidad.Size = new System.Drawing.Size(15, 14);
            this.checkCantidad.TabIndex = 29;
            this.checkCantidad.UseVisualStyleBackColor = true;
            // 
            // maskCantidad
            // 
            this.maskCantidad.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.maskCantidad.Location = new System.Drawing.Point(191, 165);
            this.maskCantidad.Mask = "99999";
            this.maskCantidad.Name = "maskCantidad";
            this.maskCantidad.Size = new System.Drawing.Size(42, 25);
            this.maskCantidad.TabIndex = 28;
            this.maskCantidad.ValidatingType = typeof(int);
            this.maskCantidad.TextChanged += new System.EventHandler(this.maskCantidad_TextChanged);
            // 
            // lblCantidad
            // 
            this.lblCantidad.AutoSize = true;
            this.lblCantidad.Font = new System.Drawing.Font("Segoe UI Semilight", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblCantidad.Location = new System.Drawing.Point(98, 168);
            this.lblCantidad.Name = "lblCantidad";
            this.lblCantidad.Size = new System.Drawing.Size(85, 21);
            this.lblCantidad.TabIndex = 27;
            this.lblCantidad.Text = "Cantidad:";
            // 
            // txtLugar
            // 
            this.txtLugar.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtLugar.Location = new System.Drawing.Point(191, 127);
            this.txtLugar.Name = "txtLugar";
            this.txtLugar.Size = new System.Drawing.Size(144, 25);
            this.txtLugar.TabIndex = 26;
            // 
            // txtMarca
            // 
            this.txtMarca.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtMarca.Location = new System.Drawing.Point(191, 88);
            this.txtMarca.Name = "txtMarca";
            this.txtMarca.Size = new System.Drawing.Size(144, 25);
            this.txtMarca.TabIndex = 25;
            // 
            // txtNombre
            // 
            this.txtNombre.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtNombre.Location = new System.Drawing.Point(191, 53);
            this.txtNombre.Name = "txtNombre";
            this.txtNombre.Size = new System.Drawing.Size(144, 25);
            this.txtNombre.TabIndex = 23;
            // 
            // lblLugar
            // 
            this.lblLugar.AutoSize = true;
            this.lblLugar.Font = new System.Drawing.Font("Segoe UI Semilight", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblLugar.Location = new System.Drawing.Point(99, 127);
            this.lblLugar.Name = "lblLugar";
            this.lblLugar.Size = new System.Drawing.Size(59, 21);
            this.lblLugar.TabIndex = 22;
            this.lblLugar.Text = "Lugar:";
            // 
            // lblMarca
            // 
            this.lblMarca.AutoSize = true;
            this.lblMarca.Font = new System.Drawing.Font("Segoe UI Semilight", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblMarca.Location = new System.Drawing.Point(99, 88);
            this.lblMarca.Name = "lblMarca";
            this.lblMarca.Size = new System.Drawing.Size(62, 21);
            this.lblMarca.TabIndex = 20;
            this.lblMarca.Text = "Marca:";
            // 
            // lblNombre
            // 
            this.lblNombre.AutoSize = true;
            this.lblNombre.Font = new System.Drawing.Font("Segoe UI Semilight", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblNombre.Location = new System.Drawing.Point(99, 53);
            this.lblNombre.Name = "lblNombre";
            this.lblNombre.Size = new System.Drawing.Size(77, 21);
            this.lblNombre.TabIndex = 19;
            this.lblNombre.Text = "Nombre:";
            // 
            // agregarInformatica
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackgroundImage = global::Para_inventario.Properties.Resources._250202692;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(529, 243);
            this.Controls.Add(this.checkCantidad);
            this.Controls.Add(this.maskCantidad);
            this.Controls.Add(this.lblCantidad);
            this.Controls.Add(this.txtLugar);
            this.Controls.Add(this.txtMarca);
            this.Controls.Add(this.txtNombre);
            this.Controls.Add(this.lblLugar);
            this.Controls.Add(this.lblMarca);
            this.Controls.Add(this.lblNombre);
            this.Controls.Add(this.btnVolver);
            this.Controls.Add(this.btnAgregar);
            this.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "agregarInformatica";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "agregarInformatica";
            this.Load += new System.EventHandler(this.agregarInformatica_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Button btnVolver;
        private Button btnAgregar;
        private CheckBox checkCantidad;
        private MaskedTextBox maskCantidad;
        private Label lblCantidad;
        private TextBox txtLugar;
        private TextBox txtMarca;
        private TextBox txtNombre;
        private Label lblLugar;
        private Label lblMarca;
        private Label lblNombre;
    }
}