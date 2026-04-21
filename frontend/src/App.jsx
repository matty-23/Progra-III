import './App.css'
import PageInicio from "./pages/PageInicio.jsx";
import Login from "./pages/Login.jsx";
import DocumentPageWrapper from "./pages/DocumentPageWrapper.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReadMe from "./components/ReadMe.jsx";
import MiArea from './pages/MiArea.jsx';
import {Login} from "./pages/Login.jsx";

export default function App() {
    return (
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/document/:id" element={<DocumentPageWrapper />} />
        <Route path="/readme" element={<ReadMe />} />
        
        {/* Tengo entendido que aca solo dejamos definido las rutas generales.
        Obvio que la primera ruta va a ser la que conduzca al login
        En el login vamos a obtener las cosas y usar navigate() de esta manera
        
        const handleLogin = () => {
        const nameUser = "maria";
        const UserId = 123;

        navigate(`/${nameUser}/${UserId}`);
        };

        return <button onClick={handleLogin}>Ingresar</button>;
        Y lo mismo para cuando queremos navegar dentro de rutas del navegador
        Voy a hacer una ruta de prueba que conduzca a Login con 
        credenciales predefinidas
        */}

        <Route path="/:nameUser/:UserId" element={<PageInicio/>}>
            <Route path="mi-area" element={<MiArea />} >
              <Route path="*" element={<MiArea />} />
            </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    )
}

