import { useState } from "react";
function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-7 fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between">
        <div>Logo</div>
        <div className="gap-4 hidden md:flex">
          <a className="hover:text-gray-300 transition  duration-500" href="">
            Inicio
          </a>
          <a className="hover:text-gray-300 transition duration-500" href="">
            Servicios
          </a> 
          <a className="hover:text-gray-300 transition duration-500" href="">
            Reservas
          </a>
          <a className="hover:text-gray-300 transition duration-500" href="">
            Contacto
          </a>
        </div>
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="md:hidden text-3xl"
        >
          {menuAbierto ? "X" : "☰"}
        </button>
      </div>

      
        <div className={`${menuAbierto ? "max-h-96" : "max-h-0"} flex flex-col md:hidden overflow-hidden transition-all duration-400`}>
          <a className="hover:text-gray-300 transition duration-5000 block py-3 border-b border-gray-700 text-center" href="" onClick={() => setMenuAbierto(false)}>
            Inicio
          </a>
          <a className="hover:text-gray-300 transition duration-500 block py-3 border-b border-gray-700 text-center" href="" onClick={() => setMenuAbierto(false)}>
            Servicios
          </a>
          <a className="hover:text-gray-300 transition duration-500 block py-3 border-b border-gray-700 text-center" href="" onClick={() => setMenuAbierto(false)}>
            Reservas
          </a>
          <a className="hover:text-gray-300 transition duration-500 block py-3 border-b border-gray-700 text-center" href="" onClick={() => setMenuAbierto(false)}>
            Contacto
          </a>
        </div>
      
    </nav>
  );
}

export default Navbar;
