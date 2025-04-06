namespace Para_inventario.Interfaces
{
    partial class frmPrincipal
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(frmPrincipal));
            this.btnCerrar = new System.Windows.Forms.Button();
            this.dataConsumiblesConsultar = new System.Windows.Forms.DataGridView();
            this.nro = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.nombre = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.cantidadDisponible = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.cantidadComprada = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.menuStrip2 = new System.Windows.Forms.MenuStrip();
            this.usuarioToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.crearUsuarioToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.eliminarUsuariosToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.herramientasToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.agregarToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.consultarToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.reportarProblemaToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.eliminarToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.registrarPrestamoToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.actualizarStockToolStripMenuItem1 = new System.Windows.Forms.ToolStripMenuItem();
            this.elementosDibujoToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.agregarToolStripMenuItem1 = new System.Windows.Forms.ToolStripMenuItem();
            this.consultarToolStripMenuItem1 = new System.Windows.Forms.ToolStripMenuItem();
            this.reportarProblema = new System.Windows.Forms.ToolStripMenuItem();
            this.eliminarToolStripMenuItem1 = new System.Windows.Forms.ToolStripMenuItem();
            this.registrarPrestamoToolStripMenuItem1 = new System.Windows.Forms.ToolStripMenuItem();
            this.actualizarStockToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.consumiblesToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.agregarToolStripMenuItem2 = new System.Windows.Forms.ToolStripMenuItem();
            this.consultarToolStripMenuItem2 = new System.Windows.Forms.ToolStripMenuItem();
            this.reponerToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.registrarConsumosToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.informáticaToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.agregarToolStripMenuItem3 = new System.Windows.Forms.ToolStripMenuItem();
            this.consultarToolStripMenuItem3 = new System.Windows.Forms.ToolStripMenuItem();
            this.reportarProblemaToolStripMenuItem2 = new System.Windows.Forms.ToolStripMenuItem();
            this.eliminarToolStripMenuItem2 = new System.Windows.Forms.ToolStripMenuItem();
            this.registrarDevolverPréstamoToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.actualizarStockToolStripMenuItem3 = new System.Windows.Forms.ToolStripMenuItem();
            this.máquinasToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.agregarToolStripMenuItem4 = new System.Windows.Forms.ToolStripMenuItem();
            this.consultarToolStripMenuItem4 = new System.Windows.Forms.ToolStripMenuItem();
            this.reportarProblemaToolStripMenuItem3 = new System.Windows.Forms.ToolStripMenuItem();
            this.eliminarToolStripMenuItem3 = new System.Windows.Forms.ToolStripMenuItem();
            this.registrarPrestamoToolStripMenuItem2 = new System.Windows.Forms.ToolStripMenuItem();
            this.actualizarStockToolStripMenuItem2 = new System.Windows.Forms.ToolStripMenuItem();
            this.mueblesToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.agregarToolStripMenuItem5 = new System.Windows.Forms.ToolStripMenuItem();
            this.consultarToolStripMenuItem5 = new System.Windows.Forms.ToolStripMenuItem();
            this.actualizarToolStripMenuItem4 = new System.Windows.Forms.ToolStripMenuItem();
            this.eliminarToolStripMenuItem4 = new System.Windows.Forms.ToolStripMenuItem();
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            ((System.ComponentModel.ISupportInitialize)(this.dataConsumiblesConsultar)).BeginInit();
            this.menuStrip2.SuspendLayout();
            this.menuStrip1.SuspendLayout();
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
            this.btnCerrar.Location = new System.Drawing.Point(760, -2);
            this.btnCerrar.Name = "btnCerrar";
            this.btnCerrar.Size = new System.Drawing.Size(40, 33);
            this.btnCerrar.TabIndex = 1;
            this.btnCerrar.UseVisualStyleBackColor = false;
            this.btnCerrar.Click += new System.EventHandler(this.btnCerrar_Click);
            // 
            // dataConsumiblesConsultar
            // 
            this.dataConsumiblesConsultar.AllowUserToAddRows = false;
            this.dataConsumiblesConsultar.AllowUserToDeleteRows = false;
            this.dataConsumiblesConsultar.AllowUserToOrderColumns = true;
            this.dataConsumiblesConsultar.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataConsumiblesConsultar.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.nro,
            this.nombre,
            this.cantidadDisponible,
            this.cantidadComprada});
            this.dataConsumiblesConsultar.Location = new System.Drawing.Point(44, 45);
            this.dataConsumiblesConsultar.Name = "dataConsumiblesConsultar";
            this.dataConsumiblesConsultar.ReadOnly = true;
            this.dataConsumiblesConsultar.RowTemplate.Height = 25;
            this.dataConsumiblesConsultar.Size = new System.Drawing.Size(119, 108);
            this.dataConsumiblesConsultar.TabIndex = 28;
            this.dataConsumiblesConsultar.Visible = false;
            // 
            // nro
            // 
            this.nro.DataPropertyName = "nro";
            this.nro.HeaderText = "Nro Inventario";
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
            // cantidadDisponible
            // 
            this.cantidadDisponible.DataPropertyName = "cantidadDisponible";
            this.cantidadDisponible.HeaderText = "Cantidad Disponible";
            this.cantidadDisponible.Name = "cantidadDisponible";
            this.cantidadDisponible.ReadOnly = true;
            this.cantidadDisponible.Width = 150;
            // 
            // cantidadComprada
            // 
            this.cantidadComprada.DataPropertyName = "cantidadComprada";
            this.cantidadComprada.HeaderText = "Cantidad Comprada";
            this.cantidadComprada.Name = "cantidadComprada";
            this.cantidadComprada.ReadOnly = true;
            this.cantidadComprada.Visible = false;
            // 
            // menuStrip2
            // 
            this.menuStrip2.BackColor = System.Drawing.SystemColors.MenuHighlight;
            this.menuStrip2.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.menuStrip2.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.usuarioToolStripMenuItem});
            this.menuStrip2.Location = new System.Drawing.Point(0, 482);
            this.menuStrip2.Name = "menuStrip2";
            this.menuStrip2.Size = new System.Drawing.Size(800, 28);
            this.menuStrip2.TabIndex = 29;
            this.menuStrip2.Text = "menuStrip2";
            // 
            // usuarioToolStripMenuItem
            // 
            this.usuarioToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.crearUsuarioToolStripMenuItem,
            this.eliminarUsuariosToolStripMenuItem});
            this.usuarioToolStripMenuItem.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.usuarioToolStripMenuItem.Image = global::Para_inventario.Properties.Resources.user_shape_icon_icons_com_72487;
            this.usuarioToolStripMenuItem.Name = "usuarioToolStripMenuItem";
            this.usuarioToolStripMenuItem.Size = new System.Drawing.Size(87, 24);
            this.usuarioToolStripMenuItem.Text = "Usuario";
            // 
            // crearUsuarioToolStripMenuItem
            // 
            this.crearUsuarioToolStripMenuItem.Name = "crearUsuarioToolStripMenuItem";
            this.crearUsuarioToolStripMenuItem.Size = new System.Drawing.Size(192, 24);
            this.crearUsuarioToolStripMenuItem.Text = "Crear Usuario";
            this.crearUsuarioToolStripMenuItem.Click += new System.EventHandler(this.crearUsuarioToolStripMenuItem_Click);
            // 
            // eliminarUsuariosToolStripMenuItem
            // 
            this.eliminarUsuariosToolStripMenuItem.Name = "eliminarUsuariosToolStripMenuItem";
            this.eliminarUsuariosToolStripMenuItem.Size = new System.Drawing.Size(192, 24);
            this.eliminarUsuariosToolStripMenuItem.Text = "Eliminar Usuarios";
            this.eliminarUsuariosToolStripMenuItem.Click += new System.EventHandler(this.eliminarUsuariosToolStripMenuItem_Click_1);
            // 
            // herramientasToolStripMenuItem
            // 
            this.herramientasToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.agregarToolStripMenuItem,
            this.consultarToolStripMenuItem,
            this.reportarProblemaToolStripMenuItem,
            this.eliminarToolStripMenuItem,
            this.registrarPrestamoToolStripMenuItem,
            this.actualizarStockToolStripMenuItem1});
            this.herramientasToolStripMenuItem.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.herramientasToolStripMenuItem.Name = "herramientasToolStripMenuItem";
            this.herramientasToolStripMenuItem.Size = new System.Drawing.Size(103, 23);
            this.herramientasToolStripMenuItem.Text = "Herramientas";
            // 
            // agregarToolStripMenuItem
            // 
            this.agregarToolStripMenuItem.Name = "agregarToolStripMenuItem";
            this.agregarToolStripMenuItem.Size = new System.Drawing.Size(253, 24);
            this.agregarToolStripMenuItem.Text = "Agregar";
            this.agregarToolStripMenuItem.Click += new System.EventHandler(this.agregarToolStripMenuItem_Click);
            // 
            // consultarToolStripMenuItem
            // 
            this.consultarToolStripMenuItem.Name = "consultarToolStripMenuItem";
            this.consultarToolStripMenuItem.Size = new System.Drawing.Size(253, 24);
            this.consultarToolStripMenuItem.Text = "Consultar";
            this.consultarToolStripMenuItem.Click += new System.EventHandler(this.consultarToolStripMenuItem_Click);
            // 
            // reportarProblemaToolStripMenuItem
            // 
            this.reportarProblemaToolStripMenuItem.Name = "reportarProblemaToolStripMenuItem";
            this.reportarProblemaToolStripMenuItem.Size = new System.Drawing.Size(253, 24);
            this.reportarProblemaToolStripMenuItem.Text = "Reportar Problema";
            this.reportarProblemaToolStripMenuItem.Click += new System.EventHandler(this.reportarProblemaToolStripMenuItem_Click);
            // 
            // eliminarToolStripMenuItem
            // 
            this.eliminarToolStripMenuItem.Name = "eliminarToolStripMenuItem";
            this.eliminarToolStripMenuItem.Size = new System.Drawing.Size(253, 24);
            this.eliminarToolStripMenuItem.Text = "Eliminar";
            this.eliminarToolStripMenuItem.Click += new System.EventHandler(this.eliminarToolStripMenuItem_Click);
            // 
            // registrarPrestamoToolStripMenuItem
            // 
            this.registrarPrestamoToolStripMenuItem.Name = "registrarPrestamoToolStripMenuItem";
            this.registrarPrestamoToolStripMenuItem.Size = new System.Drawing.Size(253, 24);
            this.registrarPrestamoToolStripMenuItem.Text = "Registrar/Devolver Préstamo";
            this.registrarPrestamoToolStripMenuItem.Click += new System.EventHandler(this.registrarPrestamoToolStripMenuItem_Click);
            // 
            // actualizarStockToolStripMenuItem1
            // 
            this.actualizarStockToolStripMenuItem1.Name = "actualizarStockToolStripMenuItem1";
            this.actualizarStockToolStripMenuItem1.Size = new System.Drawing.Size(253, 24);
            this.actualizarStockToolStripMenuItem1.Text = "Actualizar Stock";
            this.actualizarStockToolStripMenuItem1.Click += new System.EventHandler(this.actualizarStockToolStripMenuItem1_Click);
            // 
            // elementosDibujoToolStripMenuItem
            // 
            this.elementosDibujoToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.agregarToolStripMenuItem1,
            this.consultarToolStripMenuItem1,
            this.reportarProblema,
            this.eliminarToolStripMenuItem1,
            this.registrarPrestamoToolStripMenuItem1,
            this.actualizarStockToolStripMenuItem});
            this.elementosDibujoToolStripMenuItem.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.elementosDibujoToolStripMenuItem.Name = "elementosDibujoToolStripMenuItem";
            this.elementosDibujoToolStripMenuItem.Size = new System.Drawing.Size(147, 23);
            this.elementosDibujoToolStripMenuItem.Text = "Elementos de Dibujo";
            // 
            // agregarToolStripMenuItem1
            // 
            this.agregarToolStripMenuItem1.Name = "agregarToolStripMenuItem1";
            this.agregarToolStripMenuItem1.Size = new System.Drawing.Size(253, 24);
            this.agregarToolStripMenuItem1.Text = "Agregar";
            this.agregarToolStripMenuItem1.Click += new System.EventHandler(this.agregarToolStripMenuItem1_Click);
            // 
            // consultarToolStripMenuItem1
            // 
            this.consultarToolStripMenuItem1.Name = "consultarToolStripMenuItem1";
            this.consultarToolStripMenuItem1.Size = new System.Drawing.Size(253, 24);
            this.consultarToolStripMenuItem1.Text = "Consultar";
            this.consultarToolStripMenuItem1.Click += new System.EventHandler(this.consultarToolStripMenuItem1_Click);
            // 
            // reportarProblema
            // 
            this.reportarProblema.Name = "reportarProblema";
            this.reportarProblema.Size = new System.Drawing.Size(253, 24);
            this.reportarProblema.Text = "Reportar Problema";
            this.reportarProblema.Click += new System.EventHandler(this.reportarProblema_Click);
            // 
            // eliminarToolStripMenuItem1
            // 
            this.eliminarToolStripMenuItem1.Name = "eliminarToolStripMenuItem1";
            this.eliminarToolStripMenuItem1.Size = new System.Drawing.Size(253, 24);
            this.eliminarToolStripMenuItem1.Text = "Eliminar";
            this.eliminarToolStripMenuItem1.Click += new System.EventHandler(this.eliminarToolStripMenuItem1_Click);
            // 
            // registrarPrestamoToolStripMenuItem1
            // 
            this.registrarPrestamoToolStripMenuItem1.Name = "registrarPrestamoToolStripMenuItem1";
            this.registrarPrestamoToolStripMenuItem1.Size = new System.Drawing.Size(253, 24);
            this.registrarPrestamoToolStripMenuItem1.Text = "Registrar/Devolver Préstamo";
            this.registrarPrestamoToolStripMenuItem1.Click += new System.EventHandler(this.registrarPrestamoToolStripMenuItem1_Click);
            // 
            // actualizarStockToolStripMenuItem
            // 
            this.actualizarStockToolStripMenuItem.Name = "actualizarStockToolStripMenuItem";
            this.actualizarStockToolStripMenuItem.Size = new System.Drawing.Size(253, 24);
            this.actualizarStockToolStripMenuItem.Text = "Actualizar Stock";
            this.actualizarStockToolStripMenuItem.Click += new System.EventHandler(this.actualizarStockToolStripMenuItem_Click);
            // 
            // consumiblesToolStripMenuItem
            // 
            this.consumiblesToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.agregarToolStripMenuItem2,
            this.consultarToolStripMenuItem2,
            this.reponerToolStripMenuItem,
            this.registrarConsumosToolStripMenuItem});
            this.consumiblesToolStripMenuItem.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.consumiblesToolStripMenuItem.Name = "consumiblesToolStripMenuItem";
            this.consumiblesToolStripMenuItem.Size = new System.Drawing.Size(99, 23);
            this.consumiblesToolStripMenuItem.Text = "Consumibles";
            // 
            // agregarToolStripMenuItem2
            // 
            this.agregarToolStripMenuItem2.Name = "agregarToolStripMenuItem2";
            this.agregarToolStripMenuItem2.Size = new System.Drawing.Size(201, 24);
            this.agregarToolStripMenuItem2.Text = "Agregar";
            this.agregarToolStripMenuItem2.Click += new System.EventHandler(this.agregarToolStripMenuItem2_Click);
            // 
            // consultarToolStripMenuItem2
            // 
            this.consultarToolStripMenuItem2.Name = "consultarToolStripMenuItem2";
            this.consultarToolStripMenuItem2.Size = new System.Drawing.Size(201, 24);
            this.consultarToolStripMenuItem2.Text = "Consultar";
            this.consultarToolStripMenuItem2.Click += new System.EventHandler(this.consultarToolStripMenuItem2_Click);
            // 
            // reponerToolStripMenuItem
            // 
            this.reponerToolStripMenuItem.Name = "reponerToolStripMenuItem";
            this.reponerToolStripMenuItem.Size = new System.Drawing.Size(201, 24);
            this.reponerToolStripMenuItem.Text = "Reponer";
            this.reponerToolStripMenuItem.Click += new System.EventHandler(this.reponerToolStripMenuItem_Click);
            // 
            // registrarConsumosToolStripMenuItem
            // 
            this.registrarConsumosToolStripMenuItem.Name = "registrarConsumosToolStripMenuItem";
            this.registrarConsumosToolStripMenuItem.Size = new System.Drawing.Size(201, 24);
            this.registrarConsumosToolStripMenuItem.Text = "Registrar Consumos";
            this.registrarConsumosToolStripMenuItem.Click += new System.EventHandler(this.registrarConsumosToolStripMenuItem_Click);
            // 
            // informáticaToolStripMenuItem
            // 
            this.informáticaToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.agregarToolStripMenuItem3,
            this.consultarToolStripMenuItem3,
            this.reportarProblemaToolStripMenuItem2,
            this.eliminarToolStripMenuItem2,
            this.registrarDevolverPréstamoToolStripMenuItem,
            this.actualizarStockToolStripMenuItem3});
            this.informáticaToolStripMenuItem.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.informáticaToolStripMenuItem.Name = "informáticaToolStripMenuItem";
            this.informáticaToolStripMenuItem.Size = new System.Drawing.Size(90, 23);
            this.informáticaToolStripMenuItem.Text = "Informática";
            // 
            // agregarToolStripMenuItem3
            // 
            this.agregarToolStripMenuItem3.Name = "agregarToolStripMenuItem3";
            this.agregarToolStripMenuItem3.Size = new System.Drawing.Size(253, 24);
            this.agregarToolStripMenuItem3.Text = "Agregar ";
            this.agregarToolStripMenuItem3.Click += new System.EventHandler(this.agregarToolStripMenuItem3_Click);
            // 
            // consultarToolStripMenuItem3
            // 
            this.consultarToolStripMenuItem3.Name = "consultarToolStripMenuItem3";
            this.consultarToolStripMenuItem3.Size = new System.Drawing.Size(253, 24);
            this.consultarToolStripMenuItem3.Text = "Consultar";
            this.consultarToolStripMenuItem3.Click += new System.EventHandler(this.consultarToolStripMenuItem3_Click);
            // 
            // reportarProblemaToolStripMenuItem2
            // 
            this.reportarProblemaToolStripMenuItem2.Name = "reportarProblemaToolStripMenuItem2";
            this.reportarProblemaToolStripMenuItem2.Size = new System.Drawing.Size(253, 24);
            this.reportarProblemaToolStripMenuItem2.Text = "Reportar Problema";
            this.reportarProblemaToolStripMenuItem2.Click += new System.EventHandler(this.reportarProblemaToolStripMenuItem2_Click);
            // 
            // eliminarToolStripMenuItem2
            // 
            this.eliminarToolStripMenuItem2.Name = "eliminarToolStripMenuItem2";
            this.eliminarToolStripMenuItem2.Size = new System.Drawing.Size(253, 24);
            this.eliminarToolStripMenuItem2.Text = "Eliminar";
            this.eliminarToolStripMenuItem2.Click += new System.EventHandler(this.eliminarToolStripMenuItem2_Click);
            // 
            // registrarDevolverPréstamoToolStripMenuItem
            // 
            this.registrarDevolverPréstamoToolStripMenuItem.Name = "registrarDevolverPréstamoToolStripMenuItem";
            this.registrarDevolverPréstamoToolStripMenuItem.Size = new System.Drawing.Size(253, 24);
            this.registrarDevolverPréstamoToolStripMenuItem.Text = "Registrar/Devolver Préstamo";
            this.registrarDevolverPréstamoToolStripMenuItem.Click += new System.EventHandler(this.registrarDevolverPréstamoToolStripMenuItem_Click);
            // 
            // actualizarStockToolStripMenuItem3
            // 
            this.actualizarStockToolStripMenuItem3.Name = "actualizarStockToolStripMenuItem3";
            this.actualizarStockToolStripMenuItem3.Size = new System.Drawing.Size(253, 24);
            this.actualizarStockToolStripMenuItem3.Text = "Actualizar Stock";
            this.actualizarStockToolStripMenuItem3.Click += new System.EventHandler(this.actualizarStockToolStripMenuItem3_Click);
            // 
            // máquinasToolStripMenuItem
            // 
            this.máquinasToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.agregarToolStripMenuItem4,
            this.consultarToolStripMenuItem4,
            this.reportarProblemaToolStripMenuItem3,
            this.eliminarToolStripMenuItem3,
            this.registrarPrestamoToolStripMenuItem2,
            this.actualizarStockToolStripMenuItem2});
            this.máquinasToolStripMenuItem.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.máquinasToolStripMenuItem.Name = "máquinasToolStripMenuItem";
            this.máquinasToolStripMenuItem.Size = new System.Drawing.Size(81, 23);
            this.máquinasToolStripMenuItem.Text = "Máquinas";
            // 
            // agregarToolStripMenuItem4
            // 
            this.agregarToolStripMenuItem4.Name = "agregarToolStripMenuItem4";
            this.agregarToolStripMenuItem4.Size = new System.Drawing.Size(253, 24);
            this.agregarToolStripMenuItem4.Text = "Agregar ";
            this.agregarToolStripMenuItem4.Click += new System.EventHandler(this.agregarToolStripMenuItem4_Click);
            // 
            // consultarToolStripMenuItem4
            // 
            this.consultarToolStripMenuItem4.Name = "consultarToolStripMenuItem4";
            this.consultarToolStripMenuItem4.Size = new System.Drawing.Size(253, 24);
            this.consultarToolStripMenuItem4.Text = "Consultar";
            this.consultarToolStripMenuItem4.Click += new System.EventHandler(this.consultarToolStripMenuItem4_Click);
            // 
            // reportarProblemaToolStripMenuItem3
            // 
            this.reportarProblemaToolStripMenuItem3.Name = "reportarProblemaToolStripMenuItem3";
            this.reportarProblemaToolStripMenuItem3.Size = new System.Drawing.Size(253, 24);
            this.reportarProblemaToolStripMenuItem3.Text = "Reportar Problema";
            this.reportarProblemaToolStripMenuItem3.Click += new System.EventHandler(this.reportarProblemaToolStripMenuItem3_Click);
            // 
            // eliminarToolStripMenuItem3
            // 
            this.eliminarToolStripMenuItem3.Name = "eliminarToolStripMenuItem3";
            this.eliminarToolStripMenuItem3.Size = new System.Drawing.Size(253, 24);
            this.eliminarToolStripMenuItem3.Text = "Eliminar";
            this.eliminarToolStripMenuItem3.Click += new System.EventHandler(this.eliminarToolStripMenuItem3_Click);
            // 
            // registrarPrestamoToolStripMenuItem2
            // 
            this.registrarPrestamoToolStripMenuItem2.Name = "registrarPrestamoToolStripMenuItem2";
            this.registrarPrestamoToolStripMenuItem2.Size = new System.Drawing.Size(253, 24);
            this.registrarPrestamoToolStripMenuItem2.Text = "Registrar/Devolver Préstamo";
            this.registrarPrestamoToolStripMenuItem2.Click += new System.EventHandler(this.registrarPrestamoToolStripMenuItem2_Click);
            // 
            // actualizarStockToolStripMenuItem2
            // 
            this.actualizarStockToolStripMenuItem2.Name = "actualizarStockToolStripMenuItem2";
            this.actualizarStockToolStripMenuItem2.Size = new System.Drawing.Size(253, 24);
            this.actualizarStockToolStripMenuItem2.Text = "Actualizar Stock";
            this.actualizarStockToolStripMenuItem2.Click += new System.EventHandler(this.actualizarStockToolStripMenuItem2_Click);
            // 
            // mueblesToolStripMenuItem
            // 
            this.mueblesToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.agregarToolStripMenuItem5,
            this.consultarToolStripMenuItem5,
            this.actualizarToolStripMenuItem4,
            this.eliminarToolStripMenuItem4});
            this.mueblesToolStripMenuItem.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.mueblesToolStripMenuItem.Name = "mueblesToolStripMenuItem";
            this.mueblesToolStripMenuItem.Size = new System.Drawing.Size(73, 23);
            this.mueblesToolStripMenuItem.Text = "Muebles";
            // 
            // agregarToolStripMenuItem5
            // 
            this.agregarToolStripMenuItem5.Name = "agregarToolStripMenuItem5";
            this.agregarToolStripMenuItem5.Size = new System.Drawing.Size(137, 24);
            this.agregarToolStripMenuItem5.Text = "Agregar";
            this.agregarToolStripMenuItem5.Click += new System.EventHandler(this.agregarToolStripMenuItem5_Click);
            // 
            // consultarToolStripMenuItem5
            // 
            this.consultarToolStripMenuItem5.Name = "consultarToolStripMenuItem5";
            this.consultarToolStripMenuItem5.Size = new System.Drawing.Size(137, 24);
            this.consultarToolStripMenuItem5.Text = "Consultar";
            this.consultarToolStripMenuItem5.Click += new System.EventHandler(this.consultarToolStripMenuItem5_Click);
            // 
            // actualizarToolStripMenuItem4
            // 
            this.actualizarToolStripMenuItem4.Name = "actualizarToolStripMenuItem4";
            this.actualizarToolStripMenuItem4.Size = new System.Drawing.Size(137, 24);
            this.actualizarToolStripMenuItem4.Text = "Actualizar";
            this.actualizarToolStripMenuItem4.Click += new System.EventHandler(this.actualizarToolStripMenuItem4_Click);
            // 
            // eliminarToolStripMenuItem4
            // 
            this.eliminarToolStripMenuItem4.Name = "eliminarToolStripMenuItem4";
            this.eliminarToolStripMenuItem4.Size = new System.Drawing.Size(137, 24);
            this.eliminarToolStripMenuItem4.Text = "Eliminar";
            this.eliminarToolStripMenuItem4.Click += new System.EventHandler(this.eliminarToolStripMenuItem4_Click);
            // 
            // menuStrip1
            // 
            this.menuStrip1.BackColor = System.Drawing.SystemColors.MenuHighlight;
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.herramientasToolStripMenuItem,
            this.elementosDibujoToolStripMenuItem,
            this.consumiblesToolStripMenuItem,
            this.informáticaToolStripMenuItem,
            this.máquinasToolStripMenuItem,
            this.mueblesToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(800, 27);
            this.menuStrip1.TabIndex = 0;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // frmPrincipal
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackgroundImage = global::Para_inventario.Properties.Resources.images;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Center;
            this.ClientSize = new System.Drawing.Size(800, 510);
            this.Controls.Add(this.menuStrip2);
            this.Controls.Add(this.dataConsumiblesConsultar);
            this.Controls.Add(this.btnCerrar);
            this.Controls.Add(this.menuStrip1);
            this.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MainMenuStrip = this.menuStrip1;
            this.Name = "frmPrincipal";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Principal";
            this.TransparencyKey = System.Drawing.Color.Black;
            this.Load += new System.EventHandler(this.frmPrincipal_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataConsumiblesConsultar)).EndInit();
            this.menuStrip2.ResumeLayout(false);
            this.menuStrip2.PerformLayout();
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private Button btnCerrar;
        private DataGridView dataConsumiblesConsultar;
        private DataGridViewTextBoxColumn nro;
        private DataGridViewTextBoxColumn nombre;
        private DataGridViewTextBoxColumn cantidadDisponible;
        private DataGridViewTextBoxColumn cantidadComprada;
        private MenuStrip menuStrip2;
        private ToolStripMenuItem usuarioToolStripMenuItem;
        private ToolStripMenuItem crearUsuarioToolStripMenuItem;
        private ToolStripMenuItem eliminarUsuariosToolStripMenuItem;
        private ToolStripMenuItem herramientasToolStripMenuItem;
        private ToolStripMenuItem agregarToolStripMenuItem;
        private ToolStripMenuItem consultarToolStripMenuItem;
        private ToolStripMenuItem reportarProblemaToolStripMenuItem;
        private ToolStripMenuItem eliminarToolStripMenuItem;
        private ToolStripMenuItem registrarPrestamoToolStripMenuItem;
        private ToolStripMenuItem actualizarStockToolStripMenuItem1;
        private ToolStripMenuItem elementosDibujoToolStripMenuItem;
        private ToolStripMenuItem agregarToolStripMenuItem1;
        private ToolStripMenuItem consultarToolStripMenuItem1;
        private ToolStripMenuItem reportarProblema;
        private ToolStripMenuItem eliminarToolStripMenuItem1;
        private ToolStripMenuItem registrarPrestamoToolStripMenuItem1;
        private ToolStripMenuItem actualizarStockToolStripMenuItem;
        private ToolStripMenuItem consumiblesToolStripMenuItem;
        private ToolStripMenuItem agregarToolStripMenuItem2;
        private ToolStripMenuItem consultarToolStripMenuItem2;
        private ToolStripMenuItem reponerToolStripMenuItem;
        private ToolStripMenuItem registrarConsumosToolStripMenuItem;
        private ToolStripMenuItem informáticaToolStripMenuItem;
        private ToolStripMenuItem agregarToolStripMenuItem3;
        private ToolStripMenuItem consultarToolStripMenuItem3;
        private ToolStripMenuItem reportarProblemaToolStripMenuItem2;
        private ToolStripMenuItem eliminarToolStripMenuItem2;
        private ToolStripMenuItem registrarDevolverPréstamoToolStripMenuItem;
        private ToolStripMenuItem máquinasToolStripMenuItem;
        private ToolStripMenuItem agregarToolStripMenuItem4;
        private ToolStripMenuItem consultarToolStripMenuItem4;
        private ToolStripMenuItem reportarProblemaToolStripMenuItem3;
        private ToolStripMenuItem eliminarToolStripMenuItem3;
        private ToolStripMenuItem registrarPrestamoToolStripMenuItem2;
        private ToolStripMenuItem mueblesToolStripMenuItem;
        private ToolStripMenuItem agregarToolStripMenuItem5;
        private ToolStripMenuItem consultarToolStripMenuItem5;
        private ToolStripMenuItem actualizarToolStripMenuItem4;
        private ToolStripMenuItem eliminarToolStripMenuItem4;
        private MenuStrip menuStrip1;
        private ToolStripMenuItem actualizarStockToolStripMenuItem2;
        private ToolStripMenuItem actualizarStockToolStripMenuItem3;
    }
}