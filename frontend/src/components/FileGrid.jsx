import { useEffect, useState } from "react";
import FileCard from "./FileCard";
import "./FileGrid.css";

export default function FileGrid() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("files"));

    if (data && data.children) {
      setFiles(data.children);
    }
  }, []);

  const handleClick = (file) => {
    if (file.type === "folder") {
      // 📁 navegar
      setFiles(file.children || []);
    }

    if (file.type === "document") {
      // 📄 abrir documento
      const docsData = JSON.parse(localStorage.getItem("documents"));

      const doc = docsData.documents.find(
        (d) => d.id === file.documentId
      );

      console.log("Documento abierto:", doc);
    }
  };

  return (
    <div className="grid">
      {files.map((file, i) => (
        <FileCard key={i} file={file} onClick={handleClick} />
      ))}
    </div>
  );
}