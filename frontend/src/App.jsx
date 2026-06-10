import { Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Servicios from './components/Servicios'
import Reservas from './components/Reservas'
import Footer from './components/Footer'



function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div>
          <Navbar />
          <Hero />
          <Servicios />
          <Reservas />
          <Footer />
        </div>
      } />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App