import { useLocation, useParams } from "react-router-dom";
import '../styles/pageInicio.css';
import FileGrid from "../components/FileGrid.jsx";
import ReadMe from "../components/ReadMe.jsx";
import { useArea } from "../hooks/useArea.js";


export default function MiArea() {
  const location = useLocation();
  const { UserId, seccion } = useParams();
  console.log(seccion);
  const SECCIONES_VALIDAS = ["mi-area","compartidos-conmigo","recientes","destacados"];
  if (!SECCIONES_VALIDAS.includes(seccion)) {
  return <NotFound />;
  }

  const { elementos, cargando, error } = useArea(UserId, seccion);

  if (cargando) return <div className="General">Cargando...</div>;
  if (error)    return <div className="General">Error: {error}</div>;

  const carpetaRaiz = elementos[0];
  const datos = {
    name: carpetaRaiz?.nombre ?? seccion,
    children: carpetaRaiz?.componentes ?? [],
  };

   if (!carpetaRaiz || carpetaRaiz.componentes?.length === 0) {
    return (
      <div className="General empty-state">
        <div className="title-row">
          <ReadMe />
        </div>

        <div className="empty-content">
          <h2>📂 Todavía no hay contenido aquí</h2>
          <p>
            Cuando agregues archivos o carpetas aparecerán en esta sección.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="General">
      <div className="title-row">
        <ReadMe />
      </div>
      <FileGrid data={datos} />
    </div>
  );
}