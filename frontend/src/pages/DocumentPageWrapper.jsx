import { useParams } from "react-router-dom";
import DocumentPage from "./DocumentPage.jsx";
export default function DocumentPageWrapper() {
  const { id } = useParams(); // 👈 acá leés la ruta

  return <DocumentPage documentId={id} />;
}