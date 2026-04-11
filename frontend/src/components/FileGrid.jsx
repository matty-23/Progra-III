import FileCard from "./FileCard";

const files = [
  { name: "Curriculum", type: "pdf" },
  { name: "Proyecto Q2", type: "folder" },
  { name: "Imagen.png", type: "image" },
];

export default function FileGrid() {
  return (
    <div className="grid">
      {files.map((file, i) => (
        <FileCard key={i} file={file} />
      ))}
    </div>
  );
}