import { useState } from "react";

const servicios = [
  {
    id: 1,
    nombre: "Corte de pelo",
    descripcion: "Corte clásico o moderno adaptado a tu estilo.",
    precio: 15,
    duracion: "30 min",
    imagen:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800",
  },
  {
    id: 2,
    nombre: "Arreglo de barba",
    descripcion: "Perfilado y definición para una barba perfecta.",
    precio: 10,
    duracion: "20 min",
    imagen:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800",
  },
  {
    id: 3,
    nombre: "Corte + Barba",
    descripcion: "El pack completo para verte impecable.",
    precio: 22,
    duracion: "45 min",
    imagen:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800",
  },
  {
    id: 4,
    nombre: "Tinte",
    descripcion: "Coloración profesional para un look renovado.",
    precio: 35,
    duracion: "60 min",
    imagen: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800",
  },
  {
    id: 5,
    nombre: "Mechas",
    descripcion: "Técnicas modernas para dar luz y volumen.",
    precio: 45,
    duracion: "90 min",
    imagen:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
  },
  {
    id: 6,
    nombre: "Afeitado clásico",
    descripcion: "Afeitado tradicional con navaja y toalla caliente.",
    precio: 18,
    duracion: "30 min",
    imagen:
      "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=800",
  },
];

function Servicios() {
  const [actual, setActual] = useState(0);

  function siguiente() {
    setActual((actual + 1) % servicios.length);
  }

  function anterior() {
    setActual((actual - 1 + servicios.length) % servicios.length);
  }

  const servicio = servicios[actual];

  return (
    <section className="animate-fadeInUp bg-stone-900 text-white py-20 px-8">
      <h2 className="animate-fadeIn text-center text-4xl font-bold mb-12">
        Nuestros Servicios
      </h2>
      <div className="relative">
        <img
          src={servicio.imagen}
          alt={servicio.nombre}
          className="w-full h-80 object-cover animate-fadeInUp"
        />
        <button
          onClick={anterior}
          className="absolute left-0 top-1/3 bg-black/50 hover:bg-black/80 text-white px-4 py-6 transition duration-300"
        >
          ‹
        </button>
        <button
          onClick={siguiente}
          className="absolute right-0 top-1/3 bg-black/50 hover:bg-black/80 text-white px-4 py-6 transition duration-300"
        >
          ›
        </button>
        <div className="bg-stone-800 p-8">
          <h3 className="text-2xl font-bold mb-2">{servicio.nombre}</h3>
          <p className="text-stone-400 mb-4">{servicio.descripcion}</p>
          <div className="flex justify-between">
            <span>{servicio.duracion}</span>
            <span className="font-bold text-xl">{servicio.precio}€</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Servicios;
