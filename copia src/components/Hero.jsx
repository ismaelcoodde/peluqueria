function Hero() {
  return (
    <section className="bg-stone-800 text-amber-100 min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="text-amber-500 tracking-widest uppercase text-sm mb-4">
        Bienvenido
      </p>
      <h2 className="text-6xl font-bold mb-6 leading-tight">
        El arte del<br />buen corte
      </h2>
      <p className="text-stone-400 text-lg max-w-md mb-10">
        Tradición, estilo y precisión. Reserva tu cita y déjate cuidar por manos expertas.
      </p>
      
        <a href="#reservas"
        className="bg-amber-700 hover:bg-amber-600 text-amber-100 px-8 py-3 uppercase tracking-widest text-sm transition-colors"
      >
        Reservar cita
      </a>
    </section>
  )
}

export default Hero