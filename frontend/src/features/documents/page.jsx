import { useState } from "react";
import DocumentPage from "./features/documents/DocumentPage.jsx";
import documentsData from "./localStorage/arbolBloques.json";

if (!localStorage.getItem("documents")) {
  localStorage.setItem("documents", JSON.stringify(documentsData));
}

function App() {
  const [documentId] = useState("doc-1");

  return (
    <div style={{ backgroundColor: "#f5f5f7", minHeight: "100vh" }}>
      <DocumentPage defaultDocumentId={documentId} />
    </div>
  );
}

export default App;