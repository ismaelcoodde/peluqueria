function Servicios() {
  return (
    <section className="bg-black text-white py-20 px-8">
      <h1 className="text-center text-4xl font-bold mb-12">
        Nuestros Servicios
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="border border-gray-700 border-t-2 border-t-red-500 hover:border-t-white hover:scale-105 transition-all duration-300 p-8 flex-1">
          <h2 className="text-2xl font-bold mb-4">Corte + Barba</h2>
          <p>15 minutos</p>
          <p className="text-red-500 font-bold mt-4">18€</p>
        </div>
      
            
        <div className="border border-gray-700 border-t-2 border-t-red-500 hover:border-t-white hover:scale-105 transition-all duration-300 p-8 flex-1">
          <h2 className="text-2xl font-bold mb-4">Corte Señora</h2>
          <p>30 minutos</p>
          <p className="text-red-500 font-bold mt-4">25€</p>
        </div>
      
           
        <div className="border border-gray-700 border-t-2 border-t-red-500 hover:border-t-white hover:scale-105 transition-all duration-300 p-8 flex-1">
          <h2 className="text-2xl font-bold mb-4">Tinte</h2>
          <p>45 minutos</p>
          <p className="text-red-500 font-bold mt-4">40€</p>
        
      </div>
      </div>
    </section>
  );
}

export default Servicios;
