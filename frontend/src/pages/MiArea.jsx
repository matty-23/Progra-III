import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import '../styles/pageInicio.css';
import FileGrid from "../components/FileGrid.jsx";
import ReadMe from "../components/ReadMe.jsx";
import { useArea } from "../hooks/useArea.js";

export default function MiArea() {
  const location = useLocation();
  const { UserId, seccion, '*': subRuta } = useParams();
  const carpetaActualId = subRuta ? subRuta.split('/').pop() : null;
  
  const [menuOpen, setMenuOpen] = useState(false);
  
  const SECCIONES_VALIDAS = ["mi-area","compartidos-conmigo","recientes","destacados"];
  if (!SECCIONES_VALIDAS.includes(seccion)) {
    return <div className="General">Sección no encontrada</div>;
  }

  const { carpetaActual, componentes, cargando, error, crearCarpeta, actualizarCarpeta, eliminarCarpeta } = 
    useArea(UserId, seccion, carpetaActualId);

  if (cargando) return <div className="General">Cargando...</div>;
  if (error)    return <div className="General">Error: {error}</div>;

  const datos = {
    name: carpetaActual?.nombre || seccion,
    children: componentes,
  };

const handleCrearCarpeta = async () => {
  setMenuOpen(false);
  if (!carpetaActual?.id) return alert("Error: No se encontró la carpeta padre.");
  const nombre = prompt("Ingresa el nombre de la nueva carpeta:");
  if (nombre && nombre.trim() !== "") {
    try {
      await crearCarpeta(carpetaActual.id, nombre); // ← await
    } catch (err) {
      alert("Error al crear la carpeta: " + err.message);
    }
  }
};

  const handleCrearDocumento = () => {
    setMenuOpen(false);
    if (!carpetaActual?.id) return alert("Error: No se encontró la carpeta padre.");
    const nombre = prompt("Ingresa el nombre del nuevo documento:");
    if (nombre && nombre.trim() !== "") {
      alert(`Lógica para crear documento '${nombre}' pendiente de conectar al backend`);
    }
  };

const handleEliminar = async (file) => {
    // Normalizamos los datos por si es carpeta o documento
    const nombre = file.nombre ?? file.name ?? "este elemento";
    const idElemento = file.id ?? file.documentId;

    if (!idElemento) {
      return alert("Error: No se encontró el ID para eliminar.");
    }

    const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar '${nombre}'?`);
    if (confirmar) {
      try {
        await eliminarCarpeta(idElemento);
      } catch (err) {
        alert("Error al eliminar: " + err.message);
      }
    }
  };

  const handleEditar = async (file) => {
    // Normalizamos también para la edición
    const nombreActual = file.nombre ?? file.name ?? "";
    const idElemento = file.id ?? file.documentId;

    if (!idElemento) {
      return alert("Error: No se encontró el ID para editar.");
    }

    const nuevoNombre = prompt("Ingresa el nuevo nombre:", nombreActual);
    if (nuevoNombre && nuevoNombre.trim() !== "" && nuevoNombre !== nombreActual) {
      try {
        await actualizarCarpeta(idElemento, nuevoNombre, file.ReadMe || "");
      } catch (err) {
        alert("Error al editar: " + err.message);
      }
    }
  };

  const BotonFlotante = () => (
    <div className="floating-container">
      {menuOpen && (
        <div className="floating-menu">
          <button onClick={handleCrearCarpeta}>
            <span className="icon">📁</span> Nueva Carpeta
          </button>
          <div className="menu-divider"></div>
          <button onClick={handleCrearDocumento}>
            <span className="icon">📄</span> Nuevo Documento
          </button>
        </div>
      )}
      <button 
        onClick={() => setMenuOpen(!menuOpen)} 
        className={`btn-floating-action ${menuOpen ? 'active' : ''}`}
      >
        <span className="icon-plus">+</span> Crear
      </button>
    </div>
  );

  return (
  <div className="General">

    {seccion === "mi-area" && (
      <div className="title-row">
        <ReadMe
          carpetaId={carpetaActual?.id}
          nombreCarpeta={carpetaActual?.nombre}
        />
      </div>
    )}

    {componentes.length === 0 ? (
      <div className="empty-content">
        <h2>📂 Todavía no hay contenido aquí</h2>
        <p>
          Cuando agregues archivos o carpetas aparecerán en esta sección.
        </p>
      </div>
    ) : (
      <FileGrid
        data={datos}
        onEdit={handleEditar}
        onDelete={handleEliminar}
      />
    )}

    <BotonFlotante />

  </div>
);
}