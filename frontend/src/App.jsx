import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Notification from "./components/notification.jsx";
import Sidebar from "./components/sidebar.jsx";
import Header from "./components/Header";
import FileGrid from "./components/FileGrid";
export default function App() {
  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        <Header />
        
        <div className="content-area">
            {/* Breadcrumbs */}
            <div className="breadcrumbs">
                Archivo principal <span>›</span> Proyectos <span>›</span> App web Q2
            </div>

            {/* Título y Botones */}
            <div className="title-row">
                <div className="project-title">
                    <h1>App web Q2</h1>
                    <div style={{color: '#6b7280', fontSize: '0.9rem', maxWidth: '600px'}}>
                        Contiene todos los recursos del proyecto web para el segundo trimestre: diseños, requisitos y código fuente.
                    </div>
                    <div className="tags-row">
                        <span className="tag">Q2-2026</span>
                        <span className="tag">web</span>
                        <span className="tag">activo</span>
                    </div>
                </div>
                <div className="action-buttons">
                    <button className="btn btn-ghost">Compartir</button>
                    <button className="btn btn-primary">+ Nuevo</button>
                </div>
            </div>

            {/* Grid de Archivos */}
            <div className="files-section-header">8 ELEMENTOS</div>
            <FileGrid />
        </div>
      </div>
    </div>
  );
}
