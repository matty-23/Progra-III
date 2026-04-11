
import './App.css'; // Si tenés estilos globales
import DocumentPage from "./features/documents/DocumentPage.jsx";

function App() {
  return (
    // Este div actúa como el fondo de toda tu pantalla
    <div style={{ backgroundColor: '#f5f5f7', minHeight: '100vh' }}>
      <DocumentPage />
    </div>
  );
}

export default App;