import { useEffect, useState } from "react"

function Reservas() {
  const [servicios, setServicios] = useState([])
  const [form, setForm] = useState({
    nombre_cliente: "",
    telefono: "",
    fecha: "",
    hora: "",
    servicio_id: ""
  })
  const [mensaje, setMensaje] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("https://peluqueria-backend-98zw.onrender.com")
      .then(res => res.json())
      .then(data => setServicios(data))
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMensaje(null)
    setError(null)

    const cita = {
      nombre_cliente: form.nombre_cliente,
      telefono: form.telefono,
      fecha_hora: `${form.fecha}T${form.hora}:00`,
      servicio_id: parseInt(form.servicio_id)
    }

    try {
      const res = await fetch("https://peluqueria-backend-98zw.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cita)
      })

      if (res.ok) {
        setMensaje("¡Cita reservada con éxito! Te esperamos.")
        setForm({ nombre_cliente: "", telefono: "", fecha: "", hora: "", servicio_id: "" })
      } else {
        const data = await res.json()
        setError(data.detail)
      }
    } catch {
      setError("No se pudo conectar con el servidor.")
    }
  }

  return (
    <section id="reservas" className="bg-stone-800 text-amber-100 py-24 px-8">
      <div className="max-w-lg mx-auto">
        <p className="text-amber-500 tracking-widest uppercase text-sm text-center mb-2">
          Tu momento
        </p>
        <h2 className="text-4xl font-bold text-center mb-16">
          Reservar cita
        </h2>

        {mensaje && (
          <div className="bg-green-800 text-green-100 p-4 mb-8 text-center">
            {mensaje}
          </div>
        )}
        {error && (
          <div className="bg-red-900 text-red-100 p-4 mb-8 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            name="nombre_cliente"
            value={form.nombre_cliente}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
            className="bg-stone-700 border border-stone-600 text-amber-100 px-4 py-3 placeholder-stone-400 focus:outline-none focus:border-amber-500"
          />
          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Tu teléfono"
            required
            className="bg-stone-700 border border-stone-600 text-amber-100 px-4 py-3 placeholder-stone-400 focus:outline-none focus:border-amber-500"
          />
          <select
            name="servicio_id"
            value={form.servicio_id}
            onChange={handleChange}
            required
            className="bg-stone-700 border border-stone-600 text-amber-100 px-4 py-3 focus:outline-none focus:border-amber-500"
          >
            <option value="">Selecciona un servicio</option>
            {servicios.map(s => (
              <option key={s.id} value={s.id}>
                {s.nombre} — {s.duracion} min — {s.precio}€
              </option>
            ))}
          </select>
          <input
            name="fecha"
            type="date"
            value={form.fecha}
            onChange={handleChange}
            required
            className="bg-stone-700 border border-stone-600 text-amber-100 px-4 py-3 focus:outline-none focus:border-amber-500"
          />
          <input
            name="hora"
            type="time"
            value={form.hora}
            onChange={handleChange}
            required
            className="bg-stone-700 border border-stone-600 text-amber-100 px-4 py-3 focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            className="bg-amber-700 hover:bg-amber-600 text-amber-100 py-3 uppercase tracking-widest text-sm transition-colors"
          >
            Confirmar reserva
          </button>
        </form>
      </div>
    </section>
  )
}

export default Reservas