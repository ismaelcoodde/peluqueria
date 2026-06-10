from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from auth import verificar_password, crear_token, verificar_token
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from datetime import datetime, timedelta
from database import engine
from models import Servicio, Cita, Usuario
from email_service import enviar_email_cita


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://peluqueria-rust.vercel.app"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def inicio():
    return {"mensaje": "¡Hola desde la peluquería!"}

@app.get("/servicios")
def listar_servicios():
    with Session(engine) as session:
        servicios = session.exec(select(Servicio)).all()
        return servicios
    
@app.post("/citas")
def crear_cita(cita: Cita):
    if isinstance(cita.fecha_hora, str):
        cita.fecha_hora = datetime.fromisoformat(cita.fecha_hora)

    # Quitar zona horaria si la tiene
    if cita.fecha_hora.tzinfo is not None:
        cita.fecha_hora = cita.fecha_hora.replace(tzinfo=None)

    with Session(engine) as session:
        # 1. Buscar el servicio para saber su duración
        servicio = session.get(Servicio, cita.servicio_id)
        if not servicio:
            raise HTTPException(
                status_code=404,
                detail="El servicio no existe."
            )

        # 2. Calcular cuándo termina la nueva cita
        nueva_fin = cita.fecha_hora + timedelta(minutes=servicio.duracion)

        # 3. Buscar citas que se solapen
        citas_existentes = session.exec(select(Cita)).all()
        for c in citas_existentes:
            srv = session.get(Servicio, c.servicio_id)
            if srv is None:
                continue
            existente_fin = c.fecha_hora + timedelta(minutes=srv.duracion)

            # ¿Se solapan?
            if cita.fecha_hora < existente_fin and nueva_fin > c.fecha_hora:
                raise HTTPException(
                    status_code=409,
                    detail=f"Horario ocupado. Hay una cita de {c.fecha_hora.strftime('%H:%M')} a {existente_fin.strftime('%H:%M')}."
                )

        session.add(cita)
        session.commit()
        session.refresh(cita)

        # Enviar email
        enviar_email_cita(
            nombre_cliente=cita.nombre_cliente,
            telefono=cita.telefono,
            fecha_hora=cita.fecha_hora,
            nombre_servicio=servicio.nombre
        )

        return cita