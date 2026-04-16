export default function traerJson(){
    return fetch("/localStorage/arbolArchivos.json")
        .then(res => res.json());
}