import { cargarGrupos } from "./datos.js";
import { procesarParticipantes } from "./participantes.js";
import { aplicarPenalizacion, actualizarListaPenalizaciones, eliminarPenalizacion } from "./penalizaciones.js";
import { calcularPropina, redondearPropinas } from "./propinas.js";
import { toggleEntregado } from "./entregado.js";
import { exportarTablaComoImagen } from "./exportar.js";
import "./tema.js"; // solo ejecuta, no exporta
import html2canvas from "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm";

// Asignar funciones a window si las necesita el HTML (por ejemplo desde onclick)
window.aplicarPenalizacion = aplicarPenalizacion;
window.eliminarPenalizacion = eliminarPenalizacion;
window.calcularPropina = calcularPropina;
window.redondearPropinas = redondearPropinas;
window.toggleEntregado = toggleEntregado;
window.exportarTablaComoImagen = exportarTablaComoImagen;

window.addEventListener("DOMContentLoaded", () => {
    sessionStorage.removeItem("penalizaciones");
    cargarGrupos();
    procesarParticipantes();
    actualizarListaPenalizaciones();
});

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector("button.btn-primary");
    btn.addEventListener("click", procesarParticipantes);
});