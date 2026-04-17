import { useLocation, useNavigate } from "react-router-dom";
import './backButton.css';

export default function BackButton() {
    const location = useLocation();
    const navigate = useNavigate();

    const MIN_SEGMENTS = 3; 

    const handleBack = () => {
        const pathParts = location.pathname.split("/").filter(Boolean);

        if (pathParts.length > MIN_SEGMENTS) {
            pathParts.pop();
            navigate("/" + pathParts.join("/"));
        } else {
            console.warn("Llegaste al límite, no podés subir más");
        }
    };

    return (
        <button className="back-button" onClick={handleBack}>
            Volver
        </button>
    );
}