import { useState } from "react";
function Admin() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [logueado, setLogueado] = useState(false);
  const [citas, setCitas] = useState([]);
  const [servicios, setServicios] = useState([]);

  async function handleLogin() {
    const body = new URLSearchParams();
    body.append("username", usuario);
    body.append("password", password);

    const res = await fetch(
      "https://peluqueria-backend-98zw.onrender.com/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      },
    );

    if (res.ok) {
      const data = await res.json();
      sessionStorage.setItem("token", data.access_token);
      setLogueado(true);
      cargarCitas();
      cargarServicios();
    } else {
      console.log("usuario o contraseña incorrectos");
    }
  }

  async function cargarCitas() {
    const token = sessionStorage.getItem("token");
    const res = await fetch(
      "https://peluqueria-backend-98zw.onrender.com/admin/citas",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    if (res.ok) {
      const data = await res.json();
      setCitas(data);
    }
  }

  async function cargarServicios() {
    const res = await fetch(
      "https://peluqueria-backend-98zw.onrender.com/servicios",
    );
    if (res.ok) {
      const data = await res.json();
      setServicios(data);
    }
  }

  async function cambiarEstado(citaId, nuevoEstado) {
    const token = sessionStorage.getItem("token");
    const res = await fetch(
      `https://peluqueria-backend-98zw.onrender.com/admin/citas/${citaId}/estado`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      },
    );
    if (res.ok) {
      cargarCitas();
    }
  }

  function cerrarSesion() {
    sessionStorage.removeItem("token");
    setLogueado(false);
  }

  function colorEstado(estado) {
  if (estado === "confirmada") return "bg-green-700 border-green-500"
  if (estado === "cancelada") return "bg-red-800 border-red-600"
  return "bg-yellow-700 border-yellow-500"
}

  return logueado ? (
  <div className="min-h-screen bg-stone-900 text-white p-8">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Panel de reservas</h1>
      <button
        onClick={cerrarSesion}
        className="border border-stone-500 text-stone-400 hover:border-white hover:text-white px-4 py-2 text-sm transition duration-300"
      >
        Cerrar sesión
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-stone-800 text-stone-400 text-left">
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Cliente</th>
            <th className="px-4 py-3">Teléfono</th>
            <th className="px-4 py-3">Fecha y hora</th>
            <th className="px-4 py-3">Servicio</th>
            <th className="px-4 py-3">Estado</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id} className="border-t border-stone-700 hover:bg-stone-800 transition duration-200">
              <td className="px-4 py-4 text-stone-400">{cita.id}</td>
              <td className="px-4 py-4 font-medium">{cita.nombre_cliente}</td>
              <td className="px-4 py-4 text-stone-300">{cita.telefono}</td>
              <td className="px-4 py-4 text-stone-300">
                {new Date(cita.fecha_hora).toLocaleDateString("es-ES")} a las{" "}
                {new Date(cita.fecha_hora).toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="px-4 py-4 text-stone-300">
                {servicios.find((s) => s.id === cita.servicio_id)?.nombre}
              </td>
              <td className="px-4 py-4">
                <select
                  className={`${colorEstado(cita.estado)} border text-white px-3 py-1 focus:outline-none`}
                  value={cita.estado}
                  onChange={(e) => cambiarEstado(cita.id, e.target.value)}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="confirmada">Confirmada</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
) : (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center">
      <div className="bg-stone-800 p-10 w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-white text-3xl font-bold text-center mb-4">
          Admin
        </h1>
        <input
          className="bg-stone-700 border border-stone-500 text-white px-4 py-3 focus:outline-none focus:border-white"
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Usuario"
        />
        <input
          className="bg-stone-700 border border-stone-500 text-white px-4 py-3 focus:outline-none focus:border-white"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button
          className="bg-stone-700 border border-white text-white px-8 py-3 hover:bg-white hover:text-black transition duration-300"
          type="button"
          onClick={handleLogin}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Admin;
