from datetime import datetime
from sqlmodel import SQLModel, Field

class Servicio(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nombre: str
    duracion: int      # en minutos
    precio: float
    
class Cita(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nombre_cliente: str
    telefono: str
    fecha_hora: datetime
    servicio_id: int = Field(foreign_key="servicio.id")
    estado: str = "pendiente"    
    
class Usuario(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str
    password_hash: str    