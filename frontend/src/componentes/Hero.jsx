function Hero() {
  return (
    <header className="h-screen relative">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
      ></video>
      <div className="bg-black absolute inset-0 opacity-60"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-bold mb-2">Barber Ismael</h1>
        <p className="text-gray-300 text-1xl">Te corto el pelo a puñetazos</p>
        <a href="#reservas" className="border border-white px-8 py-3 mt-8 bg-black/30 hover:bg-white hover:text-black transition duration-500">Reservar Cita</a>
      </div>
    </header>
  );
}

export default Hero;
