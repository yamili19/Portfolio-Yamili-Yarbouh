namespace Para_inventario.ABM
{
    partial class eliminarUsuarios
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
            this.dataUsuarios = new System.Windows.Forms.DataGridView();
            this.nroUsuario = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.nombreUsuario = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.contraseña = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.estado = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.btnVolver = new System.Windows.Forms.Button();
            this.btnEliminar = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.dataUsuarios)).BeginInit();
            this.SuspendLayout();
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
            this.contraseña,
            this.estado});
            this.dataUsuarios.Location = new System.Drawing.Point(40, 25);
            this.dataUsuarios.Name = "dataUsuarios";
            this.dataUsuarios.ReadOnly = true;
            this.dataUsuarios.RowTemplate.Height = 25;
            this.dataUsuarios.Size = new System.Drawing.Size(344, 170);
            this.dataUsuarios.TabIndex = 0;
            this.dataUsuarios.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataUsuarios_CellClick);
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
            this.nombreUsuario.HeaderText = "Nombre de Usuario";
            this.nombreUsuario.Name = "nombreUsuario";
            this.nombreUsuario.ReadOnly = true;
            this.nombreUsuario.Width = 200;
            // 
            // contraseña
            // 
            this.contraseña.DataPropertyName = "contraseña";
            this.contraseña.HeaderText = "contraseña";
            this.contraseña.Name = "contraseña";
            this.contraseña.ReadOnly = true;
            this.contraseña.Visible = false;
            // 
            // estado
            // 
            this.estado.DataPropertyName = "estado";
            this.estado.HeaderText = "estado";
            this.estado.Name = "estado";
            this.estado.ReadOnly = true;
            this.estado.Visible = false;
            // 
            // btnVolver
            // 
            this.btnVolver.BackColor = System.Drawing.Color.Red;
            this.btnVolver.FlatAppearance.BorderColor = System.Drawing.SystemColors.ActiveBorder;
            this.btnVolver.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.btnVolver.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.btnVolver.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnVolver.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnVolver.Location = new System.Drawing.Point(162, 202);
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
            this.btnEliminar.Location = new System.Drawing.Point(289, 202);
            this.btnEliminar.Name = "btnEliminar";
            this.btnEliminar.Size = new System.Drawing.Size(95, 43);
            this.btnEliminar.TabIndex = 19;
            this.btnEliminar.Text = "Eliminar";
            this.btnEliminar.UseVisualStyleBackColor = false;
            this.btnEliminar.Click += new System.EventHandler(this.btnEliminar_Click);
            // 
            // eliminarUsuarios
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Blue;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(427, 263);
            this.Controls.Add(this.btnVolver);
            this.Controls.Add(this.btnEliminar);
            this.Controls.Add(this.dataUsuarios);
            this.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "eliminarUsuarios";
            this.Text = "eliminarUsuarios";
            this.Load += new System.EventHandler(this.eliminarUsuarios_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataUsuarios)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private DataGridView dataUsuarios;
        private Button btnVolver;
        private Button btnEliminar;
        private DataGridViewTextBoxColumn nroUsuario;
        private DataGridViewTextBoxColumn nombreUsuario;
        private DataGridViewTextBoxColumn contraseña;
        private DataGridViewTextBoxColumn estado;
    }
}