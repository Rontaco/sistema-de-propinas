import { penalizaciones } from "./datos.js";
import { participantes } from "./datos.js";

export function aplicarPenalizacion() {
    const nombre = document.getElementById("selectPenalizados").value;
    if (!nombre || penalizaciones.find(p => p.nombre === nombre)) return;
    penalizaciones.push({ nombre });
    sessionStorage.setItem("penalizaciones", JSON.stringify(penalizaciones));
    actualizarListaPenalizaciones();
    actualizarSelectPenalizados();
}

export function eliminarPenalizacion(nombre) {
    const index = penalizaciones.findIndex(p => p.nombre === nombre);
    if (index !== -1) {
        penalizaciones.splice(index, 1);
        sessionStorage.setItem("penalizaciones", JSON.stringify(penalizaciones));
        actualizarListaPenalizaciones();
        actualizarSelectPenalizados();
    }
}

export function actualizarListaPenalizaciones() {
    const lista = document.getElementById("listaPenalizaciones");
    lista.innerHTML = penalizaciones.map(p => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            ${p.nombre}
            <button class="btn btn-danger btn-sm" onclick="eliminarPenalizacion('${p.nombre}')">Eliminar</button>
        </li>
    `).join("");
}

export function togglePenalizacion() {
    const modulo = document.getElementById("moduloPenalizacion");
    modulo.style.display = modulo.style.display === "none" ? "block" : "none";
}

export function actualizarSelectPenalizados() {
    const select = document.getElementById("selectPenalizados");
    select.innerHTML = participantes
        .filter(p => !penalizaciones.some(x => x.nombre === p.nombre))
        .map(p => `<option value="${p.nombre}">${p.nombre} (${p.puntos})</option>`)
        .join("");
}
