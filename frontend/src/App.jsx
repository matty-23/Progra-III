import './App.css'
import PageInicio from "./pages/pageInicio.jsx";
import DocumentPageWrapper from "./pages/DocumentPageWrapper.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReadMe from "./components/ReadMe.jsx";

export default function App() {
    return (
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageInicio />} />
        <Route path="/document/:id" element={<DocumentPageWrapper />} />
        <Route path="/readme" element={<ReadMe />} />
        
        <Route path="/nameUser/:UserId" element={<PageInicio/>} />
      </Routes>
    </BrowserRouter>
    )
}

