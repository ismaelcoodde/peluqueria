function Navbar() {
  return (
    <nav className="bg-stone-900 text-amber-100 py-4 px-8 flex justify-between items-center sticky top-0 z-50 border-b border-amber-800">
      <h1 className="text-2xl font-bold tracking-widest uppercase">
        ✂ Mi Peluquería
      </h1>
      <ul className="flex gap-8 text-sm tracking-wider uppercase">
        <li><a href="#servicios" className="hover:text-amber-400 transition-colors">Servicios</a></li>
        <li><a href="#reservas" className="hover:text-amber-400 transition-colors">Reservar</a></li>
        <li><a href="#contacto" className="hover:text-amber-400 transition-colors">Contacto</a></li>
      </ul>
    </nav>
  )
}

export default Navbar