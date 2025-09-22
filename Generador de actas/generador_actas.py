from pathlib import Path

from clases.main_app import MainApp
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from modelos.init import Base


def main():
    db_path = Path(__file__).resolve().parent / "actas.db"
    database_url = f"sqlite:///{db_path.as_posix()}"
    engine = create_engine(database_url, connect_args={"check_same_thread": False})
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()

    app = MainApp(session)
    app.mainloop()

    session.close()


if __name__ == "__main__":
    main()
