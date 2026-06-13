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

  return logueado ? (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Teléfono</th>
          <th>Fecha y hora</th>
          <th>Servicio</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {citas.map((cita) => (
          <tr key={cita.id}>
            <td>{cita.id}</td>
            <td>{cita.nombre_cliente}</td>
            <td>{cita.telefono}</td>
            <td>
              {new Date(cita.fecha_hora).toLocaleDateString("es-ES")} a las{" "}
              {new Date(cita.fecha_hora).toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </td>{" "}
            <td>{servicios.find((s) => s.id === cita.servicio_id)?.nombre}</td>
            <td>
              <td>
                <select
                  value={cita.estado}
                  onChange={(e) => cambiarEstado(cita.id, e.target.value)}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="confirmada">Confirmada</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </td>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <>
      <input
        type="text"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" onClick={handleLogin}>
        Entrar
      </button>
    </>
  );
}

export default Admin;
