import { useState, useEffect } from "react";
import '../styles/pageInicio.css';
import Sidebar from "../components/sidebar.jsx";
import Header from "../components/Header.jsx";
import FileGrid from "../components/FileGrid.jsx";
import Route from "../components/Route.jsx";     
import ReadMe from "../components/ReadMe.jsx";

export default function MiArea(){
    const [filesData, setFilesData] = useState({ children: [] });
    
        useEffect(() => {
            fetch("/localStorage/arbolArchivos.json")
                .then(res => res.json())
                .then(data => {
                setFilesData(data);
            });
        }, []);
    
        const [currentPath, setCurrentPath] = useState("/");
        const handlePathUpdate = (newPath) => {
        setCurrentPath(newPath);
      };
    
    
        return (
                    <div>
    
                        <div className="title-row">
                            <ReadMe />
                        </div>
    
                        <FileGrid 
                        data={filesData} 
                        currentPath={currentPath}
                        onPathUpdate={handlePathUpdate}/> 
                    </div>
        );
}