import { participantes } from "./datos.js";

// Función para procesar los participantes
export function procesarParticipantes() {
    let grupos = {
        4: document.getElementById("grupo4").value.split("\n").map(n => n.trim()).filter(n => n !== ""),
        3: document.getElementById("grupo3").value.split("\n").map(n => n.trim()).filter(n => n !== ""),
        2: document.getElementById("grupo2").value.split("\n").map(n => n.trim()).filter(n => n !== "")
    };

    // Guardar en localStorage
    localStorage.setItem("grupo4", grupos[4].join("\n"));
    localStorage.setItem("grupo3", grupos[3].join("\n"));
    localStorage.setItem("grupo2", grupos[2].join("\n"));

    // Limpiar el array de participantes antes de llenarlo
    participantes.length = 0;

    // Cargar participantes con sus puntos
    for (let puntos in grupos) {
        grupos[puntos].forEach(nombre => {
            participantes.push({
                nombre,
                puntos: parseInt(puntos)
            });
        });
    }

    console.log("Participantes procesados:", participantes);
}

