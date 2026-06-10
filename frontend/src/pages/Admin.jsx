import { useState } from 'react'

function Admin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)
  const [citas, setCitas] = useState([])
  const [error, setError] = useState(null)

  async function handleLogin(e) {
    e.preventDefault()
    setError(null)

    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    const res = await fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      body: formData
    })

    if (res.ok) {
      const data = await res.json()
      setToken(data.access_token)
      cargarCitas(data.access_token)
    } else {
      setError('Usuario o contraseña incorrectos.')
    }
  }

  async function cargarCitas(t) {
    const res = await fetch('http://127.0.0.1:8000/admin/citas', {
      headers: { Authorization: `Bearer ${t}` }
    })
    const data = await res.json()
    setCitas(data)
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center px-4">
        <div className="bg-stone-800 border border-amber-800 p-10 w-full max-w-sm">
          <h1 className="text-amber-100 text-2xl font-bold text-center mb-8 tracking-widest uppercase">
            Panel Admin
          </h1>
          {error && (
            <div className="bg-red-900 text-red-100 p-3 mb-6 text-center text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="bg-stone-700 border border-stone-600 text-amber-100 px-4 py-3 placeholder-stone-400 focus:outline-none focus:border-amber-500"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="bg-stone-700 border border-stone-600 text-amber-100 px-4 py-3 placeholder-stone-400 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="bg-amber-700 hover:bg-amber-600 text-amber-100 py-3 uppercase tracking-widest text-sm transition-colors mt-2"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-900 text-amber-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold tracking-widest uppercase">
            ✂ Panel de citas
          </h1>
          <button
            onClick={() => setToken(null)}
            className="text-stone-400 hover:text-amber-500 text-sm uppercase tracking-widest transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

        {citas.length === 0 ? (
          <p className="text-stone-400 text-center py-20">No hay citas registradas.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {citas.map(cita => (
              <div
                key={cita.id}
                className="bg-stone-800 border border-stone-700 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <p className="text-lg font-bold">{cita.nombre_cliente}</p>
                  <p className="text-stone-400 text-sm">{cita.telefono}</p>
                </div>
                <div className="text-center">
                  <p className="text-amber-500 font-bold">
                    {new Date(cita.fecha_hora).toLocaleDateString('es-ES', {
                      weekday: 'long', day: 'numeric', month: 'long'
                    })}
                  </p>
                  <p className="text-amber-300 text-sm">
                    {new Date(cita.fecha_hora).toLocaleTimeString('es-ES', {
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
                <div>
                  <span className="bg-amber-900 text-amber-200 px-4 py-1 text-sm uppercase tracking-widest">
                    {cita.estado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin