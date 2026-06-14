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

export default function MiArea() {
  const { UserId, seccion, '*': subRuta } = useParams();
  const carpetaActualId = subRuta ? subRuta.split('/').pop() : null;

  const [modalCrear, setModalCrear] = useState({ abierto: false, tipo: 'carpeta' });
  const [modalEdit, setModalEdit] = useState({ abierto: false, elemento: null });
  const [modalDelete, setModalDelete] = useState({ abierto: false, elemento: null });

  const SECCIONES_VALIDAS = ["mi-area", "compartidos-conmigo", "recientes", "destacados"];

  if (!SECCIONES_VALIDAS.includes(seccion)) { return <div className="General">Sección no encontrada</div>; }

  const { carpetaActual, componentes, cargando, error, crearCarpeta, actualizarCarpeta, eliminarCarpeta } = useArea(UserId, seccion, carpetaActualId);

  if (cargando) return <div className="General">Cargando...</div>;
  if (error) return <div className="General">Error: {error}</div>;

  const datos = {
    name: carpetaActual?.nombre || seccion,
    children: componentes,
  };

  const handleAbrirCrear = (tipo) => {setModalCrear({ abierto: true, tipo });};

  const handleConfirmarCrear = async (tipo, nombre) => {
    setModalCrear({ abierto: false, tipo: 'carpeta' });
    if (!carpetaActual?.id) return console.error("Falta identificador de carpeta raíz.");

    try {
      if (tipo === 'carpeta') {
        await crearCarpeta(carpetaActual.id, nombre);
      } else {
        console.log(`Lógica de creación de documento '${nombre}' lista para conectar.`);
      }
    } catch (err) {
      console.error("Error en persistencia de creación:", err.message);
    }
  };

  const handleAbrirEditar = (file) => {setModalEdit({abierto: true,elemento: file});};

  const handleConfirmarEditar = async (file, nuevoNombre) => {
    const idElemento = file.id ?? file.documentId;
    setModalEdit({ abierto: false, elemento: null });

    if (!idElemento) return;

    const nombreActual = file.nombre ?? file.name ?? "";
    if (nuevoNombre !== nombreActual) {
      try {
        await actualizarCarpeta(idElemento, nuevoNombre, file.ReadMe || file.readme || "");
      } catch (err) {
        console.error("Error en actualización de nombre:", err.message);
      }
    }
  };

  const handleAbrirEliminar = (file) => { setModalDelete({ abierto: true, elemento: file }); };

  const handleConfirmarEliminar = async (file) => {
    const idElemento = file.id ?? file.documentId;
    setModalDelete({ abierto: false, elemento: null });

    if (!idElemento) return;

    try {
      await eliminarCarpeta(idElemento);
    } catch (err) {
      console.error("Error en eliminación física:", err.message);
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

      <CreateButton onAbrirCrear={handleAbrirCrear} />

      <CrearElemento
        isOpen={modalCrear.abierto}
        tipoInicial={modalCrear.tipo}
        onClose={() => setModalCrear({ abierto: false, tipo: 'carpeta' })}
        onConfirm={handleConfirmarCrear}
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