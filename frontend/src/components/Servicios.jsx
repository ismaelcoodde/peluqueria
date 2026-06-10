import { useEffect, useState } from "react"

function Servicios() {
  const [servicios, setServicios] = useState([])

  useEffect(() => {
    fetch("https://peluqueria-backend-98zw.onrender.com")
      .then(res => res.json())
      .then(data => setServicios(data))
  }, [])

  return (
    <section id="servicios" className="bg-stone-900 text-amber-100 py-24 px-8">
      <div className="max-w-4xl mx-auto">
        <p className="text-amber-500 tracking-widest uppercase text-sm text-center mb-2">
          Lo que ofrezco
        </p>
        <h2 className="text-4xl font-bold text-center mb-16">
          Servicios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicios.map(servicio => (
            <div
              key={servicio.id}
              className="border border-amber-800 p-8 text-center hover:border-amber-500 transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">{servicio.nombre}</h3>
              <p className="text-stone-400 text-sm mb-4">{servicio.duracion} minutos</p>
              <p className="text-amber-500 text-2xl font-bold">{servicio.precio}€</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Servicios