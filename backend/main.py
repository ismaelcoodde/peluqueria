from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from auth import verificar_password, crear_token, verificar_token
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from datetime import datetime, timedelta
from database import engine
from models import Servicio, Cita, Usuario
from email_service import enviar_email_cita
from pydantic import BaseModel


app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

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

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    with Session(engine) as session:
        usuario = session.exec(
            select(Usuario).where(Usuario.username == form_data.username)
        ).first()
        if not usuario or not verificar_password(form_data.password, usuario.password_hash):
            raise HTTPException(status_code=401, detail="Usuario o contraseña incorrectos")
        token = crear_token({"sub": usuario.username})
        return {"access_token": token, "token_type": "bearer"}

@app.get("/admin/citas")
def listar_citas_admin(token: str = Depends(oauth2_scheme)):
    usuario = verificar_token(token)
    if not usuario:
        raise HTTPException(status_code=401, detail="Token inválido")
    with Session(engine) as session:
        citas = session.exec(select(Cita)).all()
        return citas

@app.get("/servicios")
def listar_servicios():
    with Session(engine) as session:
        servicios = session.exec(select(Servicio)).all()
        return servicios

@app.post("/citas")
def crear_cita(cita: Cita):
    if isinstance(cita.fecha_hora, str):
        cita.fecha_hora = datetime.fromisoformat(cita.fecha_hora)

    if cita.fecha_hora.tzinfo is not None:
        cita.fecha_hora = cita.fecha_hora.replace(tzinfo=None)

    with Session(engine) as session:
        servicio = session.get(Servicio, cita.servicio_id)
        if not servicio:
            raise HTTPException(
                status_code=404,
                detail="El servicio no existe."
            )

        nueva_fin = cita.fecha_hora + timedelta(minutes=servicio.duracion)

        citas_existentes = session.exec(select(Cita)).all()
        for c in citas_existentes:
            srv = session.get(Servicio, c.servicio_id)
            if srv is None:
                continue
            existente_fin = c.fecha_hora + timedelta(minutes=srv.duracion)

            if cita.fecha_hora < existente_fin and nueva_fin > c.fecha_hora:
                raise HTTPException(
                    status_code=409,
                    detail=f"Horario ocupado. Hay una cita de {c.fecha_hora.strftime('%H:%M')} a {existente_fin.strftime('%H:%M')}."
                )

        session.add(cita)
        session.commit()
        session.refresh(cita)

        enviar_email_cita(
            nombre_cliente=cita.nombre_cliente,
            telefono=cita.telefono,
            fecha_hora=cita.fecha_hora,
            nombre_servicio=servicio.nombre
        )

        return cita
    


class CambioEstado(BaseModel):
    estado: str

@app.patch("/admin/citas/{cita_id}/estado")
def cambiar_estado_cita(cita_id: int, body: CambioEstado, token: str = Depends(oauth2_scheme)):
    usuario = verificar_token(token)
    if not usuario:
        raise HTTPException(status_code=401, detail="Token inválido")

    estados_validos = {"pendiente", "confirmada", "cancelada"}
    if body.estado not in estados_validos:
        raise HTTPException(status_code=400, detail="Estado no válido")

    with Session(engine) as session:
        cita = session.get(Cita, cita_id)
        if not cita:
            raise HTTPException(status_code=404, detail="Cita no encontrada")
        cita.estado = body.estado
        session.add(cita)
        session.commit()
        session.refresh(cita)
        return cita   