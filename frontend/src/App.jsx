import Navbar from "./componentes/Navbar";
import Hero from "./componentes/Hero";
import Servicios from "./componentes/Servicios";
import Reservas from "./componentes/Reservas";
import Admin from "./pages/Admin";
import { Routes, Route } from "react-router-dom"
function App() {
return (
  <Routes>
    <Route path="/" element={
        <>
    <Navbar />
    <Hero />
    <Servicios />
    <Reservas />
  </>
    } />
    <Route path="/admin" element={<Admin/>} />
  </Routes>
)
}

export default App;
