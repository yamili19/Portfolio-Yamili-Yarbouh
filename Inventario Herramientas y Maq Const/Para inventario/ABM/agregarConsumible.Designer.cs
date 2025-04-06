namespace Para_inventario.Interfaces
{
    partial class agregarConsumible
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
            this.maskCantidadComprada = new System.Windows.Forms.MaskedTextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.txtNombre = new System.Windows.Forms.TextBox();
            this.lblNombre = new System.Windows.Forms.Label();
            this.txtUnidad = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
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
            this.btnVolver.Location = new System.Drawing.Point(422, 86);
            this.btnVolver.Name = "btnVolver";
            this.btnVolver.Size = new System.Drawing.Size(95, 43);
            this.btnVolver.TabIndex = 16;
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
            this.btnAgregar.Location = new System.Drawing.Point(422, 27);
            this.btnAgregar.Name = "btnAgregar";
            this.btnAgregar.Size = new System.Drawing.Size(95, 43);
            this.btnAgregar.TabIndex = 15;
            this.btnAgregar.Text = "Agregar";
            this.btnAgregar.UseVisualStyleBackColor = false;
            this.btnAgregar.Click += new System.EventHandler(this.btnAgregar_Click);
            // 
            // checkCantidad
            // 
            this.checkCantidad.AutoSize = true;
            this.checkCantidad.ForeColor = System.Drawing.Color.Red;
            this.checkCantidad.Location = new System.Drawing.Point(287, 87);
            this.checkCantidad.Name = "checkCantidad";
            this.checkCantidad.Size = new System.Drawing.Size(15, 14);
            this.checkCantidad.TabIndex = 24;
            this.checkCantidad.UseVisualStyleBackColor = true;
            // 
            // maskCantidadComprada
            // 
            this.maskCantidadComprada.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.maskCantidadComprada.Location = new System.Drawing.Point(236, 84);
            this.maskCantidadComprada.Mask = "99.99";
            this.maskCantidadComprada.Name = "maskCantidadComprada";
            this.maskCantidadComprada.Size = new System.Drawing.Size(44, 25);
            this.maskCantidadComprada.TabIndex = 23;
            this.maskCantidadComprada.ValidatingType = typeof(int);
            this.maskCantidadComprada.TextChanged += new System.EventHandler(this.maskCantidadComprada_TextChanged);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Segoe UI Semilight", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.label1.Location = new System.Drawing.Point(52, 86);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(169, 21);
            this.label1.TabIndex = 22;
            this.label1.Text = "Cantidad Comprada:";
            // 
            // txtNombre
            // 
            this.txtNombre.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtNombre.Location = new System.Drawing.Point(236, 37);
            this.txtNombre.Name = "txtNombre";
            this.txtNombre.Size = new System.Drawing.Size(144, 25);
            this.txtNombre.TabIndex = 21;
            // 
            // lblNombre
            // 
            this.lblNombre.AutoSize = true;
            this.lblNombre.Font = new System.Drawing.Font("Segoe UI Symbol", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblNombre.Location = new System.Drawing.Point(144, 37);
            this.lblNombre.Name = "lblNombre";
            this.lblNombre.Size = new System.Drawing.Size(78, 21);
            this.lblNombre.TabIndex = 20;
            this.lblNombre.Text = "Nombre:";
            // 
            // txtUnidad
            // 
            this.txtUnidad.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtUnidad.Location = new System.Drawing.Point(235, 124);
            this.txtUnidad.Name = "txtUnidad";
            this.txtUnidad.Size = new System.Drawing.Size(144, 25);
            this.txtUnidad.TabIndex = 26;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Segoe UI Symbol", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.label2.Location = new System.Drawing.Point(143, 124);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(70, 21);
            this.label2.TabIndex = 25;
            this.label2.Text = "Unidad:";
            // 
            // agregarConsumible
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackgroundImage = global::Para_inventario.Properties.Resources.precision_erasers_group;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(595, 172);
            this.Controls.Add(this.txtUnidad);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.checkCantidad);
            this.Controls.Add(this.maskCantidadComprada);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.txtNombre);
            this.Controls.Add(this.lblNombre);
            this.Controls.Add(this.btnVolver);
            this.Controls.Add(this.btnAgregar);
            this.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "agregarConsumible";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "agregarConsumible";
            this.Load += new System.EventHandler(this.agregarConsumible_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Button btnVolver;
        private Button btnAgregar;
        private CheckBox checkCantidad;
        private MaskedTextBox maskCantidadComprada;
        private Label label1;
        private TextBox txtNombre;
        private Label lblNombre;
        private TextBox txtUnidad;
        private Label label2;
    }
}