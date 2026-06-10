import os
import smtplib
from dotenv import load_dotenv
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

load_dotenv()

GMAIL_USER = os.getenv("GMAIL_USER")
GMAIL_PASSWORD = os.getenv("GMAIL_PASSWORD")
EMAIL_DESTINO = os.getenv("GMAIL_USER")

def enviar_email_cita(nombre_cliente, telefono, fecha_hora, nombre_servicio):
    try:
        msg = MIMEMultipart()
        msg["From"] = GMAIL_USER
        msg["To"] = EMAIL_DESTINO
        msg["Subject"] = f"Nueva cita - {nombre_cliente}"

        cuerpo = (
            f"Nueva reserva recibida:\n\n"
            f"Cliente: {nombre_cliente}\n"
            f"Telefono: {telefono}\n"
            f"Fecha y hora: {fecha_hora.strftime('%d/%m/%Y a las %H:%M')}\n"
            f"Servicio: {nombre_servicio}\n\n"
            f"Esta cita esta pendiente de confirmacion."
        )

        msg.attach(MIMEText(cuerpo, "plain", "utf-8"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(GMAIL_USER, GMAIL_PASSWORD)
            server.sendmail(GMAIL_USER, EMAIL_DESTINO, msg.as_string())

        print("Email enviado correctamente")

    except Exception as e:
        print(f"Error al enviar email: {e}")