import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Notification from "./components/notification.jsx";

function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <Notification message="Hola, esto es una notificación!" />
    </div>
  );
}

export default App
