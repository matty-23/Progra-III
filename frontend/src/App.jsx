import './App.css'
import PageInicio from "./pages/pageInicio.jsx";
import DocumentPageWrapper from "./pages/DocumentPageWrapper.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageInicio />} />
        <Route path="/document/:id" element={<DocumentPageWrapper />} />
      </Routes>
    </BrowserRouter>
    )
}

