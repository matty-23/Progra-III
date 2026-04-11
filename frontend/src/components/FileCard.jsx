import './FileCard.css';
export default function FileCard({ file }) {
  const getIcon = () => {
    if (file.type === "folder") return "📁";
    if (file.type === "pdf") return "📄";
    return "🖼";
  };

  return (
    <div className="card">
      <div className="icon">{getIcon()}</div>
      <p>{file.name}</p>
    </div>
  );
}