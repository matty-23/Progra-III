import './App.css'
import PageInicio from "./pages/PageInicio.jsx";
import {DocumentPageWrapper, MiAreaWrapper} from "./pages/DocumentPageWrapper.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReadMe from "./components/ReadMe.jsx";
import MiArea from './pages/MiArea.jsx';
import Login from "./pages/Login.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/document/:id" element={<DocumentPageWrapper />} />
        <Route path="/readme" element={<ReadMe />} />

<Route path="/:nameUser/:UserId" element={<PageInicio />}>
  <Route path=":seccion/*" element={<MiAreaWrapper />} />
</Route>
      </Routes>
    </BrowserRouter>
  )
}

