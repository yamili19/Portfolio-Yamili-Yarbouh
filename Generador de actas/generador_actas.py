from clases.main_app import MainApp
import mysql.connector

def main():
    conexion = mysql.connector.connect(
        host="sql10.freesqldatabase.com",
        user="sql10763670",
        password="ZLADxTPaZh",
        database="sql10763670",
        port=3306
    )
    
    app = MainApp(conexion)
    app.mainloop()
    
    conexion.close()

if __name__ == "__main__":
    main()