function Footer() {
  return (
    <footer id="contacto" className="bg-stone-900 text-stone-400 py-16 px-8 border-t border-amber-800">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div>
          <h3 className="text-amber-500 uppercase tracking-widest text-sm mb-4">Horario</h3>
          <p>Lunes a Viernes</p>
          <p>9:00 — 20:00</p>
          <p className="mt-2">Sábados</p>
          <p>9:00 — 14:00</p>
        </div>
        <div>
          <h3 className="text-amber-500 uppercase tracking-widest text-sm mb-4">Contacto</h3>
          <p>Tel: 600 000 000</p>
          <p>info@mipeluqueria.com</p>
        </div>
        <div>
          <h3 className="text-amber-500 uppercase tracking-widest text-sm mb-4">Ubicación</h3>
          <p>Calle Mayor, 1</p>
          <p>Palma, Mallorca</p>
        </div>
      </div>
      <p className="text-center text-stone-600 text-sm mt-16">
        © 2026 Mi Peluquería — Todos los derechos reservados
      </p>
    </footer>
  )
}

export default Footer