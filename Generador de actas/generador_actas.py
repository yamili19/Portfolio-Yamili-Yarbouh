from clases.main_app import MainApp
# Agrega estas importaciones al inicio del archivo
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from modelos.init import Base
def main():
    # Configurar SQLAlchemy
    DATABASE_URL = "mysql+mysqlconnector://sql10763670:ZLADxTPaZh@sql10.freesqldatabase.com:3306/sql10763670"
    engine = create_engine(DATABASE_URL)
    Base.metadata.create_all(engine)  # Crear tablas si no existen
    Session = sessionmaker(bind=engine)
    session = Session()

    app = MainApp(session)
    app.mainloop()
    
    session.close()

if __name__ == "__main__":
    main()