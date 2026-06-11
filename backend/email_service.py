import os
import resend
from dotenv import load_dotenv

load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")
EMAIL_DESTINO = os.getenv("GMAIL_USER")  # te sigues mandando el aviso a ti mismo

def enviar_email_cita(nombre_cliente, telefono, fecha_hora, nombre_servicio):
    try:
        cuerpo = (
            f"Nueva reserva recibida:\n\n"
            f"Cliente: {nombre_cliente}\n"
            f"Telefono: {telefono}\n"
            f"Fecha y hora: {fecha_hora.strftime('%d/%m/%Y a las %H:%M')}\n"
            f"Servicio: {nombre_servicio}\n\n"
            f"Esta cita esta pendiente de confirmacion."
        )

        params: resend.Emails.SendParams = {
            "from": "Peluqueria <onboarding@resend.dev>",
            "to": [EMAIL_DESTINO],
            "subject": f"Nueva cita - {nombre_cliente}",
            "text": cuerpo,
        }

        email = resend.Emails.send(params)
        print(f"Email enviado correctamente: {email}")

    except Exception as e:
        print(f"Error al enviar email: {e}")