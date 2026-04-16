import { useEffect, useState } from "react";
import traerJson from "../domain/archivoService.js";

export default async function buscarArchivosporRuta(ruta) {
  const archivos = buscarElementoPorRuta(await traerJson(), ruta);
  const matty=archivos.map(el => ({
    name: el.name,
    type: el.type
  }));
  
  return archivos.map(el => ({
    name: el.name,
    type: el.type
  }));
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