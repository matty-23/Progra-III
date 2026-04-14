import MiArea from "../pages/MiArea";
import PageInicio from "../pages/pageInicio";

export function abrirSection({activeSection}){
    switch (activeSection) {
    case "Mi Area":
      return <MiArea />;
    case "Compartidos Conmigo":
      return <PageInicio />;
    case "Recientes":
      return <MiArea />;
    case "Destacados":
      return <PageInicio />;
    default:
      return <PageInicio />;
  }
}