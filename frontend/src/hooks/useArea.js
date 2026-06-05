import { useState, useEffect } from "react";
import { archivoService } from "../domain/archivoService.js";

/**
 * Hook que carga las carpetas principales del usuario desde el BFF.
 * Retorna el array correspondiente a la sección activa del sidebar.
 *
 * @param {string} idUsuario
 * @param {string} seccion  - "mi-area" | "compartidos" | "recientes" | "destacados"
 */
export function useArea(idUsuario, seccion = "mi-area") {
  const [elementos, setElementos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idUsuario) return;

    const cargar = async () => {
      setCargando(true);
      setError(null);

      try {
        const data = await archivoService.obtenerCarpetasPrincipales(idUsuario);

        // Mapeamos la sección del sidebar a la clave que devuelve el BFF
        const mapa = {
          "mi-area":             data.MiArea             || [],
          "compartidos-conmigo": data.CompartidosConmigo || [],
          "recientes":           data.Recientes          || [],
          "destacados":          data.Destacados         || [],
        };

        setElementos(mapa[seccion] ?? data.MiArea ?? []);
      } catch (err) {
        console.error("Error cargando área:", err);
        setError(err.message);
        setElementos([]);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, [idUsuario, seccion]);

  return { elementos, cargando, error };
}