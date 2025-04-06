namespace Para_inventario.ABM
{
    partial class crearUsuario
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
            this.btnCrearUsuario = new System.Windows.Forms.Button();
            this.txtContraseña = new System.Windows.Forms.TextBox();
            this.txtUsuario = new System.Windows.Forms.TextBox();
            this.lblContraseña = new System.Windows.Forms.Label();
            this.lblNombre = new System.Windows.Forms.Label();
            this.btnCerrar = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // btnCrearUsuario
            // 
            this.btnCrearUsuario.FlatAppearance.BorderColor = System.Drawing.Color.White;
            this.btnCrearUsuario.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.btnCrearUsuario.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.btnCrearUsuario.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnCrearUsuario.Font = new System.Drawing.Font("Segoe UI", 8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnCrearUsuario.Location = new System.Drawing.Point(200, 125);
            this.btnCrearUsuario.Name = "btnCrearUsuario";
            this.btnCrearUsuario.Size = new System.Drawing.Size(92, 26);
            this.btnCrearUsuario.TabIndex = 50;
            this.btnCrearUsuario.Text = "Crear Usuario";
            this.btnCrearUsuario.UseVisualStyleBackColor = true;
            this.btnCrearUsuario.Click += new System.EventHandler(this.btnCrearUsuario_Click_1);
            // 
            // txtContraseña
            // 
            this.txtContraseña.Location = new System.Drawing.Point(173, 92);
            this.txtContraseña.Name = "txtContraseña";
            this.txtContraseña.PasswordChar = '*';
            this.txtContraseña.Size = new System.Drawing.Size(155, 25);
            this.txtContraseña.TabIndex = 49;
            // 
            // txtUsuario
            // 
            this.txtUsuario.Location = new System.Drawing.Point(173, 54);
            this.txtUsuario.Name = "txtUsuario";
            this.txtUsuario.Size = new System.Drawing.Size(155, 25);
            this.txtUsuario.TabIndex = 48;
            // 
            // lblContraseña
            // 
            this.lblContraseña.AutoSize = true;
            this.lblContraseña.Font = new System.Drawing.Font("Segoe UI Semilight", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblContraseña.Location = new System.Drawing.Point(53, 92);
            this.lblContraseña.Name = "lblContraseña";
            this.lblContraseña.Size = new System.Drawing.Size(108, 21);
            this.lblContraseña.TabIndex = 47;
            this.lblContraseña.Text = "Contraseña: ";
            // 
            // lblNombre
            // 
            this.lblNombre.AutoSize = true;
            this.lblNombre.Font = new System.Drawing.Font("Segoe UI Semilight", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblNombre.Location = new System.Drawing.Point(81, 54);
            this.lblNombre.Name = "lblNombre";
            this.lblNombre.Size = new System.Drawing.Size(80, 21);
            this.lblNombre.TabIndex = 46;
            this.lblNombre.Text = "Usuario: ";
            // 
            // btnCerrar
            // 
            this.btnCerrar.BackColor = System.Drawing.Color.White;
            this.btnCerrar.FlatAppearance.BorderColor = System.Drawing.Color.DarkRed;
            this.btnCerrar.FlatAppearance.MouseDownBackColor = System.Drawing.Color.DarkRed;
            this.btnCerrar.FlatAppearance.MouseOverBackColor = System.Drawing.Color.DarkRed;
            this.btnCerrar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnCerrar.Image = global::Para_inventario.Properties.Resources.Captura;
            this.btnCerrar.Location = new System.Drawing.Point(392, -2);
            this.btnCerrar.Name = "btnCerrar";
            this.btnCerrar.Size = new System.Drawing.Size(40, 35);
            this.btnCerrar.TabIndex = 52;
            this.btnCerrar.UseVisualStyleBackColor = false;
            this.btnCerrar.Click += new System.EventHandler(this.btnCerrar_Click);
            // 
            // crearUsuario
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackgroundImage = global::Para_inventario.Properties.Resources.images;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Zoom;
            this.ClientSize = new System.Drawing.Size(430, 175);
            this.Controls.Add(this.btnCerrar);
            this.Controls.Add(this.btnCrearUsuario);
            this.Controls.Add(this.txtContraseña);
            this.Controls.Add(this.txtUsuario);
            this.Controls.Add(this.lblContraseña);
            this.Controls.Add(this.lblNombre);
            this.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "crearUsuario";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "crearUsuario";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private Button btnCrearUsuario;
        private TextBox txtContraseña;
        private TextBox txtUsuario;
        private Label lblContraseña;
        private Label lblNombre;
        private Button btnCerrar;
    }
}