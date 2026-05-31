import { useState } from "react";
import "./CreateButton.css";

export default function CreateButton() {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [type, setType] = useState("folder");
    const [documentType, setDocumentType] = useState("txt");

    const handleCreate = async () => {
    if (!name.trim()) return;

    try {
        if (type === "folder") {
            return;
        } else {
            return;
        }

        setName("");
        setType("folder");
        setDocumentType("txt");
        setShowModal(false);
    } catch (error) {
        console.error(error);
    }
};

    return (
        <>
            <button className="create-button" onClick={() => setShowModal(true)}>
                + Crear
            </button>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Crear elemento</h3>

                        <input
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="folder">Carpeta</option>
                            <option value="document">Documento</option>
                        </select>

                        {type === "document" && (
                            <select
                                value={documentType}
                                onChange={(e) => setDocumentType(e.target.value)}
                            >
                                <option value="txt">TXT</option>
                            </select>
                        )}

                        <div className="modal-buttons">
                            <button
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>

                            <button onClick={handleCreate}>
                                Crear
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}