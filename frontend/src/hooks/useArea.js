import { useState, useEffect, useCallback } from "react";
import { archivoService } from "../services/archivoService.js";

export function useArea(idUsuario, seccion = "mi-area", carpetaId = null) {
  const [carpetaActual, setCarpetaActual] = useState(null);
  const [componentes, setComponentes] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    if (!idUsuario) return;
    setCargando(true);
    try {
      if (carpetaId) {
        const carpeta = await archivoService.obtenerCarpeta(carpetaId);
        const contenido = await archivoService.obtenerContenidoCarpeta(carpetaId); // ← agregar
        setCarpetaActual(carpeta);
        setComponentes(contenido || []); // ← cambiar esto
      } else {
        const data = await archivoService.obtenerCarpetasPrincipales(idUsuario);
        const mapa = {
          "mi-area": data.MiArea || [],
          "compartidos-conmigo": data.CompartidosConmigo || [],
          "recientes": data.Recientes || [],
          "destacados": data.Destacados || [],
        };

        const raizSeccion = mapa[seccion]?.[0] || null;

        setCarpetaActual(raizSeccion || { nombre: seccion, id: null, ReadMe: "" });
        setComponentes(raizSeccion?.componentes || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, [idUsuario, seccion, carpetaId]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const crearCarpeta = async (idPadre, nombre) => {
    try {
      await archivoService.crearCarpeta(idPadre, nombre, idUsuario);
      await cargar();
    } catch (err) {
      setError(err.message);
    }
  };

  const actualizarCarpeta = async (idCarpeta, nombre, readme = "") => {
    try {
      await archivoService.actualizarCarpeta(idCarpeta, nombre, idUsuario, readme);
      await cargar();
    } catch (err) {
      setError(err.message);
    }
  };

  const eliminarCarpeta = async (idCarpeta) => {
    try {
      await archivoService.eliminarCarpeta(idCarpeta, idUsuario);
      await cargar();
    } catch (err) {
      setError(err.message);
    }
  };

  return { carpetaActual, componentes, cargando, error, crearCarpeta, actualizarCarpeta, eliminarCarpeta };
}