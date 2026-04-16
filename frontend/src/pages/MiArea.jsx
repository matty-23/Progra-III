import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import '../styles/pageInicio.css';
import FileGrid from "../components/FileGrid.jsx";
import ReadMe from "../components/ReadMe.jsx";
import buscarArchivosporRuta from "/src/hooks/useArea.js";

export default function MiArea({route="mi-area"}) {

    // const segments = route.split("/").filter(Boolean);
    // const currentFolder = segments[segments.length - 1];
    // const elementos=await buscarArchivosporRuta(route);

    const location = useLocation();
    const [elementos, setElementos] = useState([]);
    useEffect(() => {
        const cargar = async () => {
            
        const fullPath = location.pathname;

        const pathAfter = fullPath.split("mi-area/")[1] || "";

        const res = await buscarArchivosporRuta(pathAfter);
        setElementos(res);
    };

    cargar();
    }, [location.pathname]);
    const segments = location.pathname.split("/").filter(Boolean);
    const currentFolder = segments[segments.length - 1] || "mi-area";

    const datos = {
        name: currentFolder,
        children: elementos
    }

    return (
        <div>
            <div className="title-row">
                <ReadMe />
            </div>

            <FileGrid data={datos}/>
        </div>
    );
}