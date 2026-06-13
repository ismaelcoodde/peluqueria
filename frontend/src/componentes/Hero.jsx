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
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white animate-fadeInUp">
        <img className="w-100 md:w-150 max-w-full" src="/banner.png"></img>
        <a href="#reservas" className="border border-white px-8 py-3 mt-8 bg-black/30 hover:bg-white hover:text-black transition duration-500 animate-fadeIn">Reservar Cita</a>
      </div>
    </header>
  );
}

export default Hero;
