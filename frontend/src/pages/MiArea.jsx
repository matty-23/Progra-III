import { useLocation, useParams } from "react-router-dom";
import '../styles/pageInicio.css';
import FileGrid from "../components/FileGrid.jsx";
import ReadMe from "../components/ReadMe.jsx";
import { useArea } from "../hooks/useArea.js";

function resolverSeccion(pathname) {
  const segmentos = pathname.split("/").filter(Boolean);
  const seccion = segmentos[2] ?? "mi-area";
  const secciones = ["mi-area", "compartidos-conmigo", "recientes", "destacados"];
  return secciones.includes(seccion) ? seccion : "mi-area";
}

export default function MiArea() {
  const location = useLocation();
  const { UserId } = useParams();

  const seccion = resolverSeccion(location.pathname);
  const { elementos, cargando, error } = useArea(UserId, seccion);

  if (cargando) return <div className="General">Cargando...</div>;
  if (error)    return <div className="General">Error: {error}</div>;

  const carpetaRaiz = elementos[0];
  const datos = {
    name: carpetaRaiz?.nombre ?? seccion,
    children: carpetaRaiz?.componentes ?? [],
  };

  return (
    <div className="General">
      <div className="title-row">
        <ReadMe />
      </div>
      <FileGrid data={datos} />
    </div>
  );
}