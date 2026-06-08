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

  const handleCrearCarpeta = () => {
    setMenuOpen(false);
    if (!carpetaActual?.id) return alert("Error: No se encontró la carpeta padre.");
    const nombre = prompt("Ingresa el nombre de la nueva carpeta:");
    if (nombre && nombre.trim() !== "") {
      crearCarpeta(carpetaActual.id, nombre);
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

  const handleEditar = (file) => {
    const nuevoNombre = prompt("Ingresa el nuevo nombre:", file.nombre);
    if (nuevoNombre && nuevoNombre.trim() !== "" && nuevoNombre !== file.nombre) {
      actualizarCarpeta(file.id, nuevoNombre, file.ReadMe || "");
    }
  };

  const handleEliminar = (file) => {
    const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar '${file.nombre}'?`);
    if (confirmar) {
      eliminarCarpeta(file.id);
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

  if (componentes.length === 0) {
    return (
      <div className="General empty-state">
        {seccion === "mi-area" && (
          <div className="title-row">
            <ReadMe carpetaId={carpetaActual?.id} nombreCarpeta={carpetaActual?.nombre} />
          </div>
        )}
        <div className="empty-content">
          <h2>📂 Todavía no hay contenido aquí</h2>
          <p>Cuando agregues archivos o carpetas aparecerán en esta sección.</p>
        </div>
        <BotonFlotante />
      </div>
    );
  }

  return (
    <div className="General">
      {seccion === "mi-area" && (
        <div className="title-row">
          <ReadMe carpetaId={carpetaActual?.id} nombreCarpeta={carpetaActual?.nombre} />
        </div>
      )}
      <FileGrid data={datos} onEdit={handleEditar} onDelete={handleEliminar} />
      <BotonFlotante />
    </div>
  );
}