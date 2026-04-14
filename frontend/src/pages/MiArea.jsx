import { useState, useEffect } from "react";
import '../styles/pageInicio.css';
import Sidebar from "../components/sidebar.jsx";
import Header from "../components/Header.jsx";
import FileGrid from "../components/FileGrid.jsx";
import Route from "../components/Route.jsx";     
import ReadMe from "../components/ReadMe.jsx";
export default function MiArea(){
    const [filesData, setFilesData] = useState(null);
    
        useEffect(() => {
            fetch("../src/localStorage/arbolArchivos.json")
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
    
            <div className="app">
                <Sidebar />
                <div className="main">
                    <Header />
                    <div>
                        <div className="route">
                        <Route path={currentPath} />
                        </div>
    
                        
                        <div className="title-row">
                            <ReadMe />
                        </div>
    
                        <FileGrid 
                        data={filesData} 
                        currentPath={currentPath}
                        onPathUpdate={handlePathUpdate}/> 
                    </div>
                </div>
            </div>
        );
}