import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import '../styles/pageInicio.css';
import FileGrid from "../components/FileGrid.jsx";
import ReadMe from "../components/ReadMe.jsx";
import { useArea } from "../hooks/useArea.js";
import CreateButton from "../components/CreateButton.jsx";
import CrearElemento from "../modals/CrearElemento.jsx";
import EditElemento from "../modals/EditElemento.jsx";
import DeleteElemento from "../modals/DeleteElemento.jsx";
import { cacheService } from "../services/cacheService.js"; // Añadido para guardar docs
import { documentoApiService } from "../services/documentoApiService.js";
export default function MiArea() {
  const { UserId, seccion, '*': subRuta } = useParams();
  const carpetaActualId = subRuta ? subRuta.split('/').pop() : null;

  const [modalCrear, setModalCrear] = useState({ abierto: false, tipo: 'carpeta' });
  const [modalEdit, setModalEdit] = useState({ abierto: false, elemento: null });
  const [modalDelete, setModalDelete] = useState({ abierto: false, elemento: null });

  const SECCIONES_VALIDAS = ["mi-area", "compartidos-conmigo", "recientes", "destacados"];

  if (!SECCIONES_VALIDAS.includes(seccion)) { return <div className="General">Sección no encontrada</div>; }

  const { carpetaActual, componentes, cargando, error, crearCarpeta, actualizarCarpeta, eliminarCarpeta, cargar } = useArea(UserId, seccion, carpetaActualId);
  if (cargando) return <div className="General">Cargando...</div>;
  if (error) return <div className="General">Error: {error}</div>;

  const datos = {
    name: carpetaActual?.nombre || seccion,
    children: componentes,
  };

  const handleAbrirCrear = (tipo) => { setModalCrear({ abierto: true, tipo }); };

  const handleConfirmarCrear = async (tipo, nombre) => {
    setModalCrear({ abierto: false, tipo: 'carpeta' });
    if (!carpetaActual?.id) return console.error("Falta identificador de carpeta raíz.");

    try {
      if (tipo === 'carpeta') {
        await crearCarpeta(carpetaActual.id, nombre);
      } else {
        const docBackend = await documentoApiService.create(carpetaActual.id, nombre, UserId);
        const nuevoDocId = docBackend?.id || docBackend?.idDocumento || crypto.randomUUID();

        const nuevoDocumento = {
          id: nuevoDocId,
          title: nombre,
          createdAt: Date.now(),
          blocks: [
            {
              id: crypto.randomUUID(),
              type: 'paragraph',
              content: '',
              metadata: {}
            }
          ]
        };
        await cacheService.save(nuevoDocumento);
        await cargar();
        window.open(`/document/${nuevoDocId}`, "_blank");
      }
    } catch (err) {
      console.error("Error en persistencia de creación:", err.message);
    }
  };

  const handleAbrirEditar = (file) => { setModalEdit({ abierto: true, elemento: file }); };


  const handleAbrirEliminar = (file) => { setModalDelete({ abierto: true, elemento: file }); };

const handleConfirmarEliminar = async (file) => {
    const idElemento = file.id ?? file.documentId;
    setModalDelete({ abierto: false, elemento: null });

    if (!idElemento) return;

    try {
      // 1. Identificamos si es una carpeta o un documento
      const tipo = String(file.tipo ?? file.type ?? "folder").toLowerCase();
      
      if (tipo === "documento" || tipo === "document") {
        await documentoApiService.eliminar(idElemento, UserId);
        await cargar(); 
      } else {
        await eliminarCarpeta(idElemento);
      }
    } catch (err) {
      console.error("Error en eliminación:", err.message);
    }
  };

  const handleConfirmarEditar = async (file, nuevoNombre) => {
    const idElemento = file.id ?? file.documentId;
    setModalEdit({ abierto: false, elemento: null });

    if (!idElemento) return;

    const nombreActual = file.nombre ?? file.name ?? "";
    if (nuevoNombre !== nombreActual) {
      try {
        const tipo = String(file.tipo ?? file.type ?? "folder").toLowerCase();
        
        if (tipo === "documento" || tipo === "document") {
          alert("Para cambiar el nombre de un documento, haz clic en él para abrirlo y modifícalo directamente en el editor superior.");
        } else {
          await actualizarCarpeta(idElemento, nuevoNombre, file.ReadMe || file.readme || "");
        }
      } catch (err) {
        console.error("Error en actualización de nombre:", err.message);
      }
    }
  };

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
          <p>Cuando agregues archivos o carpetas aparecerán en esta sección.</p>
        </div>
      ) : (
        <FileGrid
          data={datos}
          onEdit={handleAbrirEditar}
          onDelete={handleAbrirEliminar}
        />
      )}

      <CreateButton onAbrirCreacion={handleAbrirCrear} />

      <CrearElemento
        isOpen={modalCrear.abierto}
        tipoInicial={modalCrear.tipo}
        onClose={() => setModalCrear({ abierto: false, tipo: 'carpeta' })}
        onCreate={handleConfirmarCrear}
      />

      <EditElemento
        isOpen={modalEdit.abierto}
        elemento={modalEdit.elemento}
        onClose={() => setModalEdit({ abierto: false, elemento: null })}
        onConfirm={handleConfirmarEditar}
      />

      <DeleteElemento
        isOpen={modalDelete.abierto}
        elemento={modalDelete.elemento}
        onClose={() => setModalDelete({ abierto: false, elemento: null })}
        onConfirm={handleConfirmarEliminar}
      />
    </div>
  );
}