import { useEffect, useState } from "react";
import traerJson from "../services/archivoService.js";
import { documentService } from "../services/documentService.js";

export default async function buscarArchivosporRuta(ruta) {
  const archivos = buscarElementoPorRuta(await traerJson(), ruta);
  const store = documentService.getStore();
  const documentosGuardados = store.documents || [];
 return archivos.map(el => {
    if (el.type === "document") {
      const guardado = documentosGuardados.find(d => d.id === el.documentId);
      return {
        ...el,
        name: guardado ? guardado.title : el.name // Si existe, usamos el título nuevo
      };
    }
    return el;
  });
}

function buscarElementoPorRuta(root, path) {
  if (!path) return root.children || [];
  const segments = path.split("/").filter(Boolean);
  let current = root;
  for (let segment of segments) {
    const children = current.children || [];
    const found = children.find(el => el.name === segment);
    if (!found) return [];
    current = found;
  }

  return current.children || [];
}