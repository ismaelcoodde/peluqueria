from sqlmodel import Session
from database import engine
from models import Usuario
from auth import hashear_password

with Session(engine) as session:
    admin = Usuario(
        username="admin",
        password_hash=hashear_password("admin1234")
    )
    session.add(admin)
    session.commit()
    print("Usuario admin creado correctamente")