namespace Para_inventario.ABM
{
    partial class login
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
            this.btnCerrar = new System.Windows.Forms.Button();
            this.txtContraseña = new System.Windows.Forms.TextBox();
            this.txtUsuario = new System.Windows.Forms.TextBox();
            this.lblContraseña = new System.Windows.Forms.Label();
            this.lblNombre = new System.Windows.Forms.Label();
            this.btnIniciarSesion = new System.Windows.Forms.Button();
            this.dataUsuarios = new System.Windows.Forms.DataGridView();
            this.nroUsuario = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.nombreUsuario = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.contraseña = new System.Windows.Forms.DataGridViewTextBoxColumn();
            ((System.ComponentModel.ISupportInitialize)(this.dataUsuarios)).BeginInit();
            this.SuspendLayout();
            // 
            // btnCerrar
            // 
            this.btnCerrar.BackColor = System.Drawing.Color.White;
            this.btnCerrar.FlatAppearance.BorderColor = System.Drawing.Color.DarkRed;
            this.btnCerrar.FlatAppearance.MouseDownBackColor = System.Drawing.Color.DarkRed;
            this.btnCerrar.FlatAppearance.MouseOverBackColor = System.Drawing.Color.DarkRed;
            this.btnCerrar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnCerrar.Image = global::Para_inventario.Properties.Resources.Captura;
            this.btnCerrar.Location = new System.Drawing.Point(392, 0);
            this.btnCerrar.Name = "btnCerrar";
            this.btnCerrar.Size = new System.Drawing.Size(40, 35);
            this.btnCerrar.TabIndex = 2;
            this.btnCerrar.UseVisualStyleBackColor = false;
            this.btnCerrar.Click += new System.EventHandler(this.btnCerrar_Click);
            // 
            // txtContraseña
            // 
            this.txtContraseña.Location = new System.Drawing.Point(182, 94);
            this.txtContraseña.Name = "txtContraseña";
            this.txtContraseña.PasswordChar = '*';
            this.txtContraseña.Size = new System.Drawing.Size(155, 25);
            this.txtContraseña.TabIndex = 38;
            // 
            // txtUsuario
            // 
            this.txtUsuario.Location = new System.Drawing.Point(182, 57);
            this.txtUsuario.Name = "txtUsuario";
            this.txtUsuario.Size = new System.Drawing.Size(155, 25);
            this.txtUsuario.TabIndex = 37;
            // 
            // lblContraseña
            // 
            this.lblContraseña.AutoSize = true;
            this.lblContraseña.Font = new System.Drawing.Font("Segoe UI Semilight", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblContraseña.Location = new System.Drawing.Point(62, 94);
            this.lblContraseña.Name = "lblContraseña";
            this.lblContraseña.Size = new System.Drawing.Size(108, 21);
            this.lblContraseña.TabIndex = 36;
            this.lblContraseña.Text = "Contraseña: ";
            // 
            // lblNombre
            // 
            this.lblNombre.AutoSize = true;
            this.lblNombre.Font = new System.Drawing.Font("Segoe UI Semilight", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblNombre.Location = new System.Drawing.Point(90, 57);
            this.lblNombre.Name = "lblNombre";
            this.lblNombre.Size = new System.Drawing.Size(80, 21);
            this.lblNombre.TabIndex = 35;
            this.lblNombre.Text = "Usuario: ";
            // 
            // btnIniciarSesion
            // 
            this.btnIniciarSesion.FlatAppearance.BorderColor = System.Drawing.Color.White;
            this.btnIniciarSesion.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.btnIniciarSesion.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.btnIniciarSesion.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnIniciarSesion.Font = new System.Drawing.Font("Segoe UI", 8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnIniciarSesion.Location = new System.Drawing.Point(209, 127);
            this.btnIniciarSesion.Name = "btnIniciarSesion";
            this.btnIniciarSesion.Size = new System.Drawing.Size(92, 26);
            this.btnIniciarSesion.TabIndex = 43;
            this.btnIniciarSesion.Text = "Iniciar Sesión";
            this.btnIniciarSesion.UseVisualStyleBackColor = true;
            this.btnIniciarSesion.Click += new System.EventHandler(this.btnIniciarSesion_Click);
            // 
            // dataUsuarios
            // 
            this.dataUsuarios.AllowUserToAddRows = false;
            this.dataUsuarios.AllowUserToDeleteRows = false;
            this.dataUsuarios.AllowUserToOrderColumns = true;
            this.dataUsuarios.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataUsuarios.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.nroUsuario,
            this.nombreUsuario,
            this.contraseña});
            this.dataUsuarios.Location = new System.Drawing.Point(62, 0);
            this.dataUsuarios.Name = "dataUsuarios";
            this.dataUsuarios.ReadOnly = true;
            this.dataUsuarios.RowTemplate.Height = 25;
            this.dataUsuarios.Size = new System.Drawing.Size(75, 53);
            this.dataUsuarios.TabIndex = 45;
            this.dataUsuarios.Visible = false;
            // 
            // nroUsuario
            // 
            this.nroUsuario.DataPropertyName = "nroUsuario";
            this.nroUsuario.HeaderText = "nroUsuario";
            this.nroUsuario.Name = "nroUsuario";
            this.nroUsuario.ReadOnly = true;
            // 
            // nombreUsuario
            // 
            this.nombreUsuario.DataPropertyName = "nombreUsuario";
            this.nombreUsuario.HeaderText = "nombreUsuario";
            this.nombreUsuario.Name = "nombreUsuario";
            this.nombreUsuario.ReadOnly = true;
            // 
            // contraseña
            // 
            this.contraseña.DataPropertyName = "contraseña";
            this.contraseña.HeaderText = "contraseña";
            this.contraseña.Name = "contraseña";
            this.contraseña.ReadOnly = true;
            this.contraseña.Visible = false;
            // 
            // login
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackgroundImage = global::Para_inventario.Properties.Resources.images;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Zoom;
            this.ClientSize = new System.Drawing.Size(430, 175);
            this.Controls.Add(this.dataUsuarios);
            this.Controls.Add(this.btnIniciarSesion);
            this.Controls.Add(this.txtContraseña);
            this.Controls.Add(this.txtUsuario);
            this.Controls.Add(this.lblContraseña);
            this.Controls.Add(this.lblNombre);
            this.Controls.Add(this.btnCerrar);
            this.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "login";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "login";
            this.Load += new System.EventHandler(this.login_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataUsuarios)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Button btnCerrar;
        private TextBox txtContraseña;
        private Label lblContraseña;
        private Label lblNombre;
        private Button btnIniciarSesion;
        private DataGridView dataUsuarios;
        private DataGridViewTextBoxColumn nroUsuario;
        private DataGridViewTextBoxColumn nombreUsuario;
        private DataGridViewTextBoxColumn contraseña;
        private TextBox txtUsuario;
    }
}