from sqlmodel import Session
from database import engine
from models import Servicio

servicios = [
    Servicio(nombre="Corte de caballero", duracion=30, precio=12.0),
    Servicio(nombre="Corte de señora", duracion=45, precio=18.0),
    Servicio(nombre="Tinte", duracion=90, precio=35.0),
]

with Session(engine) as session:
    for s in servicios:
        session.add(s)
    session.commit()

print("¡Servicios añadidos!")