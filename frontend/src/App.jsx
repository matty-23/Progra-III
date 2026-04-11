import { useEffect, useState } from "react";
import "./App.css";
import DocumentPage from "./features/documents/DocumentPage.jsx";
import arbolBloques from "./localStorage/arbolBloques.json";

function App() {
  const [documentId, setDocumentId] = useState("doc-1");

  useEffect(() => {
    const saved = localStorage.getItem("documents");
    if (!saved) {
      localStorage.setItem("documents", JSON.stringify(arbolBloques));
    }
  }, []);

  return (
    <div style={{ backgroundColor: "#f5f5f7", minHeight: "100vh" }}>
      <p>ID hardcodeado: {documentId}</p>
      <DocumentPage defaultDocumentId={documentId} />
    </div>
  );
}

export default App;