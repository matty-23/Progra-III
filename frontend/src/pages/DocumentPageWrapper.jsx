import { useParams } from "react-router-dom";
import DocumentPage from "./DocumentPage.jsx";
export default function DocumentPageWrapper() {
  const { id } = useParams(); 
  return <DocumentPage documentId={id} />;
}