import { useEffect, useState, useRef } from 'react';

export const useAutoSave = (datosGuardar, funcionGuardado, tiempoEspera = 3000) => {
  const [estadoGuardado, setEstadoGuardado] = useState('guardado'); // 'guardado', 'escribiendo', 'guardando'

  const datosAnteriores = useRef(datosGuardar);

  useEffect(() => {
    if (datosAnteriores.current === datosGuardar) return;

    setEstadoGuardado('escribiendo');


    const temporizador = setTimeout(async () => {
      setEstadoGuardado('guardando');

      try {
        await funcionGuardado(datosGuardar);

        datosAnteriores.current = datosGuardar;
        setEstadoGuardado('guardado');
      } catch (error) {
        console.error("Falló el autoguardado:", error);
        setEstadoGuardado('error');
      }
    }, tiempoEspera);

    return () => clearTimeout(temporizador);

  }, [datosGuardar, funcionGuardado, tiempoEspera]);

  return estadoGuardado;
};