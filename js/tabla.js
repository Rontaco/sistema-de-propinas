import { participantes, penalizaciones } from "./datos.js";

export function actualizarTabla(propinaPorPunto) {
    const cuerpoTabla = document.getElementById("tablaParticipantes");
    cuerpoTabla.innerHTML = participantes.map(p => {
        const penalizado = penalizaciones.some(x => x.nombre === p.nombre);
        const puntos = p.puntos - (penalizado ? 1 : 0);
        const propina = propinaPorPunto * puntos;
        return `
            <tr>
                <td>${p.nombre}</td>
                <td>${puntos}</td>
                <td>$${propina.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-outline-success" onclick="toggleEntregado(this)">No entregado</button>
                </td>
            </tr>
        `;
    }).join("");
}
