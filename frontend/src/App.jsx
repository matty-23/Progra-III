import './App.css'
import PageInicio from "./pages/PageInicio.jsx";
import DocumentPageWrapper from "./pages/DocumentPageWrapper.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReadMe from "./components/ReadMe.jsx";
import MiArea from './pages/MiArea.jsx';
import Login from "./pages/LoginPage.jsx";
import LoginForm from "./pages/LoginPage.jsx";

export default function App() {
    return (
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/document/:id" element={<DocumentPageWrapper />} />
      

        <Route path="/:nameUser/:UserId" element={<PageInicio/>}>
            <Route path="mi-area" element={<MiArea />} >
              <Route path="*" element={<MiArea />} />
              </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    )
}

