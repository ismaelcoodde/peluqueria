from email_service import enviar_email_cita
from datetime import datetime

enviar_email_cita(
    nombre_cliente="Test Cliente",
    telefono="600000000",
    fecha_hora=datetime(2026, 6, 15, 10, 30),
    nombre_servicio="Corte de caballero"
)