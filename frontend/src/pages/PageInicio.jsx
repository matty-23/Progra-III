import { useState, useEffect } from 'react'
import '../styles/pageInicio.css';
import BackButton from "../components/BackButton.jsx";
import Sidebar from "../components/sidebar.jsx";
import Header from "../components/Header.jsx";
import { useNavigate, Outlet } from "react-router-dom";
import FileGrid from "../components/FileGrid.jsx";
import Route from "../components/Route.jsx";
import ReadMe from "../components/ReadMe.jsx";

export default function PageInicio() {
    const [filesData, setFilesData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/localStorage/arbolArchivos.json")
            .then(res => res.json())
            .then(data => {
                setFilesData(data);
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/"); // Expulsa al usuario al login
        }
    }, [navigate]);

    const [currentPath, setCurrentPath] = useState("/");
    const handlePathUpdate = (newPath) => {
        setCurrentPath(newPath);
    };


    return (
        <div className="app">
            <Sidebar />
            <div className="main">
                <Header />
                <div className="content-area">  
                    <div className="route">
                        <Route path={currentPath} />
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}