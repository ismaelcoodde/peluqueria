import os
from dotenv import load_dotenv
from sqlmodel import SQLModel, create_engine
from models import Servicio, Cita, Usuario

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL, echo=True)

def crear_tablas():
    SQLModel.metadata.create_all(engine)

if __name__ == "__main__":
    crear_tablas()