import { useParams } from "react-router-dom";
import DocumentPage from "./DocumentPage.jsx";
export  function DocumentPageWrapper() {
  const { id } = useParams(); 
  return <DocumentPage documentId={id} />;
}
// MiAreaWrapper.jsx
import { useLocation } from 'react-router-dom';
import MiArea from './MiArea';

export  function MiAreaWrapper() {
  const { pathname } = useLocation();
  return <MiArea key={pathname} />;
}