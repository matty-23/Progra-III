import { useEffect, useState } from "react";
import FileCard from "./FileCard";
import "./FileGrid.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function FileGrid({ data}) {

  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    if (data?.children) {
      setFiles(data.children);
    }
  }, [data]);

  const handleClick = (file) => {

    if (file.type === "folder") {
      const newPath = `${currentPath}/${file.name}`.replace("//", "/");
      navigate(newPath);
    }

    if (file.type === "document") {
      window.open(`/document/${file.documentId}`, "_blank");
      
    }
  };

  return (
    <div className="grid-container">
      <div className="grid">
        {files.map((file, i) => (
          <FileCard key={i} file={file} onClick={handleClick} />
        ))}
      </div>

    </div>
  );
}