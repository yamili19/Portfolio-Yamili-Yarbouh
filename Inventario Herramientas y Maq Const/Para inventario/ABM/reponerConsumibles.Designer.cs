namespace Para_inventario.ABM
{
    partial class reponerConsumibles
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
            this.btnReponer = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.comboConsumible = new System.Windows.Forms.ComboBox();
            this.label2 = new System.Windows.Forms.Label();
            this.checkCantidad = new System.Windows.Forms.CheckBox();
            this.maskCantidad = new System.Windows.Forms.MaskedTextBox();
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
            this.btnVolver.Location = new System.Drawing.Point(229, 113);
            this.btnVolver.Name = "btnVolver";
            this.btnVolver.Size = new System.Drawing.Size(95, 43);
            this.btnVolver.TabIndex = 29;
            this.btnVolver.Text = "Volver";
            this.btnVolver.UseVisualStyleBackColor = false;
            this.btnVolver.Click += new System.EventHandler(this.btnVolver_Click);
            // 
            // btnReponer
            // 
            this.btnReponer.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.btnReponer.Enabled = false;
            this.btnReponer.FlatAppearance.BorderColor = System.Drawing.SystemColors.ActiveBorder;
            this.btnReponer.FlatAppearance.MouseDownBackColor = System.Drawing.Color.Blue;
            this.btnReponer.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Blue;
            this.btnReponer.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnReponer.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnReponer.Location = new System.Drawing.Point(340, 113);
            this.btnReponer.Name = "btnReponer";
            this.btnReponer.Size = new System.Drawing.Size(95, 43);
            this.btnReponer.TabIndex = 30;
            this.btnReponer.Text = "Reponer";
            this.btnReponer.UseVisualStyleBackColor = false;
            this.btnReponer.Click += new System.EventHandler(this.btnReponer_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Segoe UI Symbol", 11F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.label1.Location = new System.Drawing.Point(96, 31);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(167, 20);
            this.label1.TabIndex = 33;
            this.label1.Text = "Nombre Consumible:";
            // 
            // comboConsumible
            // 
            this.comboConsumible.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.comboConsumible.FormattingEnabled = true;
            this.comboConsumible.Location = new System.Drawing.Point(263, 29);
            this.comboConsumible.Name = "comboConsumible";
            this.comboConsumible.Size = new System.Drawing.Size(172, 25);
            this.comboConsumible.TabIndex = 32;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Segoe UI Symbol", 11F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.label2.Location = new System.Drawing.Point(94, 71);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(169, 20);
            this.label2.TabIndex = 34;
            this.label2.Text = "Cantidad Comprada: ";
            // 
            // checkCantidad
            // 
            this.checkCantidad.AutoSize = true;
            this.checkCantidad.ForeColor = System.Drawing.Color.Red;
            this.checkCantidad.Location = new System.Drawing.Point(313, 76);
            this.checkCantidad.Name = "checkCantidad";
            this.checkCantidad.Size = new System.Drawing.Size(15, 14);
            this.checkCantidad.TabIndex = 36;
            this.checkCantidad.UseVisualStyleBackColor = true;
            // 
            // maskCantidad
            // 
            this.maskCantidad.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.maskCantidad.Location = new System.Drawing.Point(263, 71);
            this.maskCantidad.Mask = "99.99";
            this.maskCantidad.Name = "maskCantidad";
            this.maskCantidad.Size = new System.Drawing.Size(44, 25);
            this.maskCantidad.TabIndex = 37;
            this.maskCantidad.ValidatingType = typeof(int);
            this.maskCantidad.TextChanged += new System.EventHandler(this.maskedCantidad_TextChanged);
            // 
            // reponerConsumibles
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackgroundImage = global::Para_inventario.Properties.Resources.precision_erasers_group;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(514, 195);
            this.Controls.Add(this.maskCantidad);
            this.Controls.Add(this.checkCantidad);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.comboConsumible);
            this.Controls.Add(this.btnReponer);
            this.Controls.Add(this.btnVolver);
            this.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "reponerConsumibles";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "reponerConsumibles";
            this.Load += new System.EventHandler(this.reponerConsumibles_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private Button btnVolver;
        private Button btnReponer;
        private Label label1;
        private ComboBox comboConsumible;
        private Label label2;
        private CheckBox checkCantidad;
        private MaskedTextBox maskCantidad;
    }
}