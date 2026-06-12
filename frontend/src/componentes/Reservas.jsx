import { useState, useEffect } from "react";

function Reservas() {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    fetch("https://peluqueria-backend-98zw.onrender.com/servicios")
      .then((res) => res.json())
      .then((data) => setServicios(data));
  }, []);

  const [form, setForm] = useState({
    nombre_cliente: "",
    telefono: "",
    fecha: "",
    hora: "",
    servicio_id: "",
  });
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensaje(null);
    setError(null);

    const cita = {
      nombre_cliente: form.nombre_cliente,
      telefono: form.telefono,
      fecha_hora: `${form.fecha}T${form.hora}:00`,
      servicio_id: parseInt(form.servicio_id),
    };

    try {
      const res = await fetch(
        "https://peluqueria-backend-98zw.onrender.com/citas",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cita),
        },
      );
      if (res.ok) {
        setMensaje("¡Cita reservada con éxito! Te esperamos.");
        setForm({
          nombre_cliente: "",
          telefono: "",
          fecha: "",
          hora: "",
          servicio_id: "",
        });
      } else {
        const data = await res.json();
        setError(data.detail);
      }
    } catch {
      setError("No se pudo conectar con el servidor.");
    }
  }
  return (
    <section id="reservas" className="bg-stone-700 text-white py-20 px-8">
      <h1 className="text-4xl font-bold text-center mb-12">Reservar Cita</h1>
      {mensaje && <div>{mensaje}</div>}
      {error && <div>{error}</div>}
      <form
        className="flex flex-col gap-6 mx-auto max-w-lg"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-stone-600 border border-gray-500 text-white px-4 py-3 focus:outline-none focus:border-white"
          name="nombre_cliente"
          value={form.nombre_cliente}
          onChange={handleChange}
          placeholder="Tu nombre"
          required
        />

        <input
          className="bg-stone-600 border border-gray-500 text-white px-4 py-3 focus:outline-none focus:border-white"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="Tu teléfono"
          required
        />

        <select
          className="bg-stone-600 border border-gray-500 text-white px-4 py-3 focus:outline-none focus:border-white"
          name="servicio_id"
          value={form.servicio_id}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un servicio</option>
          {servicios.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nombre} — {s.duracion} min — {s.precio}€
            </option>
          ))}
        </select>
        <label className="text-gray-400 text-sm">Fecha</label>
        <input
          className="bg-stone-600 border border-gray-500 text-white px-4 py-3 focus:outline-none focus:border-white"
          name="fecha"
          type="date"
          value={form.fecha}
          onChange={handleChange}
          required
        />

        <label className="text-gray-400 text-sm">Hora</label>
        <input
          className="bg-stone-600 border border-gray-500 text-white px-4 py-3 focus:outline-none focus:border-white"
          name="hora"
          type="time"
          value={form.hora}
          onChange={handleChange}
          required
        />

        <button
          className="bg-stone-600 border border-white text-white px-8 py-3 hover:bg-white hover:text-black transition duration-300 w-full"
          type="submit"
        >
          Confirmar reserva
        </button>
      </form>
    </section>
  );
}

export default Reservas;
