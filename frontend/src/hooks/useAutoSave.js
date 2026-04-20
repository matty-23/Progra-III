import { useEffect, useState, useRef } from 'react';

export const useAutoSave = (datosGuardar, funcionGuardado, tiempoEspera = 3000) => {
  const [estadoGuardado, setEstadoGuardado] = useState('guardado'); // 'guardado', 'escribiendo', 'guardando'
  
  // Usamos useRef para recordar la última versión que guardamos en la BD
  // y no hacer peticiones a la base de datos si no ha cambiado nada.
  const esPrimerRender = useRef(true);
  const datosAnteriores = useRef(datosGuardar);

  useEffect(() => {
    if (esPrimerRender.current) {
      esPrimerRender.current = false;
      return;
    }
    // Si los datos son exactamente iguales a la última vez, no hacemos nada
    if (datosAnteriores.current === datosGuardar) return;

    setEstadoGuardado('escribiendo');

    // Iniciamos una cuenta regresiva
    const temporizador = setTimeout(async () => {
      setEstadoGuardado('guardando');
      
      try {
        // Ejecutamos tu función de guardado real (ej: fetch, axios, o localStorage)
        await funcionGuardado(datosGuardar);
        
        // Actualizamos nuestra memoria para saber que esta versión ya está a salvo
        datosAnteriores.current = datosGuardar;
        setEstadoGuardado('guardado');
      } catch (error) {
        console.error("Falló el autoguardado:", error);
        setEstadoGuardado('error');
      }
    }, tiempoEspera);

    // 🔴 LA MAGIA DE REACT: Si el usuario presiona otra tecla ANTES de que pasen 
    // los 3 segundos, React ejecuta este 'return' y cancela el temporizador anterior.
    // Así evitamos guardar 50 veces por minuto.
    return () => clearTimeout(temporizador);
    
  }, [datosGuardar, funcionGuardado, tiempoEspera]);

  // Devolvemos el estado para poder mostrar un mensajito en la pantalla
  return estadoGuardado;
};