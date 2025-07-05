import { participantes, penalizaciones } from "./datos.js";
import { actualizarTabla } from "./tabla.js";

function obtenerTotalPropina() {
    const input = document.getElementById("propinaTotal");
    if (!input) {
        console.error("Input con ID 'propinaTotal' no encontrado");
        return null;
    }

    const total = parseFloat(input.value);
    if (isNaN(total)) {
        alert("Ingresá un número válido.");
        return null;
    }

    console.log("Total de propina ingresado:", total);
    return total;
}

function calcularPuntosTotales() {
    return participantes.reduce((acum, p) => {
        const penalizado = penalizaciones.some(x => x.nombre === p.nombre);
        const puntos = p.puntos - (penalizado ? 1 : 0);
        console.log(`Puntos de ${p.nombre}: ${puntos}`);
        return acum + puntos;
    }, 0);
}

export function calcularPropina() {
    const total = obtenerTotalPropina();
    if (total === null) return;

    const puntosTotales = calcularPuntosTotales();
    if (puntosTotales === 0) {
        console.error("Total de puntos es 0, no se puede calcular la propina por punto.");
        return;
    }

    const propinaPorPunto = total / puntosTotales;
    console.log("Propina por punto:", propinaPorPunto);

    // Actualiza la tabla con valores sin redondear
    actualizarTabla(propinaPorPunto);

    // Actualizar DOM (sin calcular propina sobrante todavía)
    document.getElementById("propinaSobrante").textContent = `$0.00`;
    document.getElementById("totalPuntos").textContent = puntosTotales;
    document.getElementById("propinaPorPunto").textContent = `$${propinaPorPunto.toFixed(2)}`;
}

export function redondearPropinas() {
    const celdas = document.querySelectorAll("#tablaParticipantes td:nth-child(3)");
    let sumaRedondeada = 0;

    celdas.forEach(td => {
        const valor = parseFloat(td.textContent.replace("$", ""));
        const redondeado = Math.floor(valor / 50) * 50;
        sumaRedondeada += redondeado;
        td.textContent = `$${redondeado}`;
    });

    const totalPropina = obtenerTotalPropina();
    if (totalPropina === null) return;

    const propinaSobrante = totalPropina - sumaRedondeada;

    // Truncar a 2 decimales sin redondear
    const truncado = Math.floor(propinaSobrante * 100) / 100;

    document.getElementById("propinaSobrante").textContent = `$${truncado.toFixed(2)}`;
}


