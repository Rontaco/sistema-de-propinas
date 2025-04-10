let participantes = [];
let penalizaciones = [];

window.addEventListener("load", () => {
    sessionStorage.removeItem("penalizaciones");
    penalizaciones = [];
    cargarGrupos();
    procesarParticipantes();
});

function procesarParticipantes() {
    const grupos = {
        4: document.getElementById("grupo4").value.split("\n").map(n => n.trim()).filter(n => n !== ""),
        3: document.getElementById("grupo3").value.split("\n").map(n => n.trim()).filter(n => n !== ""),
        2: document.getElementById("grupo2").value.split("\n").map(n => n.trim()).filter(n => n !== "")
    };

    localStorage.setItem("grupo4", grupos[4].join("\n"));
    localStorage.setItem("grupo3", grupos[3].join("\n"));
    localStorage.setItem("grupo2", grupos[2].join("\n"));

    participantes = [];
    for (let puntos in grupos) {
        grupos[puntos].forEach(nombre => {
            participantes.push({ nombre, puntos: parseInt(puntos) });
        });
    }

    actualizarSelectPenalizados();
}

function eliminarPenalizacion(nombre) {
    penalizaciones = penalizaciones.filter(p => p.nombre !== nombre);
    sessionStorage.setItem("penalizaciones", JSON.stringify(penalizaciones));
    actualizarListaPenalizaciones();
    calcularPropina();
}

function actualizarSelectPenalizados() {
    const selectPenalizados = document.getElementById("penalizado");
    if (!selectPenalizados) return;

    selectPenalizados.innerHTML = participantes
        .map(p => `<option value="${p.nombre}">${p.nombre}</option>`)
        .join("");
}

function aplicarPenalizacion() {
    const penalizado = document.getElementById("penalizado").value;
    const puntosRestar = parseInt(document.getElementById("puntosPenalizacion").value);
    if (!penalizado || isNaN(puntosRestar)) return;

    let penalizacionExistente = penalizaciones.find(p => p.nombre === penalizado);
    if (penalizacionExistente) {
        penalizacionExistente.puntos += puntosRestar;
    } else {
        penalizaciones.push({ nombre: penalizado, puntos: puntosRestar });
    }

    sessionStorage.setItem("penalizaciones", JSON.stringify(penalizaciones));
    actualizarListaPenalizaciones();
    calcularPropina();
}

function actualizarListaPenalizaciones() {
    let listaPenalizaciones = document.getElementById("listaPenalizaciones");
    let tituloPenalizaciones = document.getElementById("tituloPenalizaciones");

    listaPenalizaciones.innerHTML = penalizaciones.map(p => 
        `<li class="list-group-item d-flex justify-content-between align-items-center">
            ${p.nombre} pierde ${p.puntos} puntos
            <button class="btn btn-sm btn-danger ms-2" onclick="eliminarPenalizacion('${p.nombre}')">❌</button>
        </li>`
    ).join("");

    listaPenalizaciones.classList.toggle("d-none", penalizaciones.length === 0);
    tituloPenalizaciones.classList.toggle("d-none", penalizaciones.length === 0);
}

function calcularPropina() {
    const propinaTotal = parseFloat(document.getElementById("propinaTotal").value) || 0;
    let totalPuntos = participantes.reduce((acc, p) => {
        let penalizacion = penalizaciones.find(pen => pen.nombre === p.nombre);
        let puntosFinales = penalizacion ? Math.max(0, p.puntos - penalizacion.puntos) : p.puntos;
        return acc + puntosFinales;
    }, 0);

    document.getElementById("totalPuntos").textContent = totalPuntos;
    const propinaPorPunto = totalPuntos > 0 ? (propinaTotal / totalPuntos).toFixed(2) : "0.00";
    document.getElementById("propinaPorPunto").textContent = `$${propinaPorPunto}`;
    actualizarTabla(propinaPorPunto);
}

function redondearPropinas() {
    const filas = document.querySelectorAll("#tablaParticipantes tr");
    let sumaRedondeada = 0;

    filas.forEach(fila => {
        const celdaPropina = fila.cells[2];
        const propinaOriginal = parseFloat(celdaPropina.textContent.replace("$", ""));
        const propinaRedondeada = Math.floor(propinaOriginal / 50) * 50;
        celdaPropina.textContent = `$${propinaRedondeada}`;
        sumaRedondeada += propinaRedondeada;
    });

    const totalPropina = parseFloat(document.getElementById("propinaTotal").value);
    const sobrante = totalPropina - sumaRedondeada;
    document.getElementById("propinaSobrante").textContent = `$${sobrante.toFixed(2)}`;
}

function actualizarTabla(propinaPorPunto) {
    let tablaParticipantes = document.getElementById("tablaParticipantes");
    tablaParticipantes.innerHTML = "";
    participantes.forEach(p => {
        let penalizacion = penalizaciones.find(pen => pen.nombre === p.nombre);
        let puntosFinales = penalizacion ? Math.max(0, p.puntos - penalizacion.puntos) : p.puntos;
        let propina = (puntosFinales * propinaPorPunto).toFixed(2);
        let row = `<tr>
            <td>${p.nombre}</td>
            <td>${puntosFinales}</td>
            <td>$${propina}</td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="toggleEntregado(this)">❌ No entregado</button>   
            </td>
        </tr>`;

        tablaParticipantes.innerHTML += row;
    });
}

function toggleEntregado(boton) {
    if (boton.classList.contains("btn-success")) {
        boton.classList.remove("btn-success");
        boton.classList.add("btn-secondary");
        boton.textContent = "❌ No entregado";
    } else {
        boton.classList.remove("btn-secondary");
        boton.classList.add("btn-success");
        boton.textContent = "✅ Entregado";
    }
}

function togglePenalizacion() {
    const habilitado = document.getElementById("activarPenalizacion").checked;
    document.getElementById("penalizacionContainer").classList.toggle("d-none", !habilitado);
}

function cargarGrupos() {
    document.getElementById("grupo4").value = localStorage.getItem("grupo4") || "";
    document.getElementById("grupo3").value = localStorage.getItem("grupo3") || "";
    document.getElementById("grupo2").value = localStorage.getItem("grupo2") || "";
}

// Botón de tema
document.addEventListener("DOMContentLoaded", () => {
    const toggleThemeBtn = document.createElement("button");

    toggleThemeBtn.classList.add("btn", "mt-3");
    toggleThemeBtn.style.position = "fixed";
    toggleThemeBtn.style.bottom = "20px";
    toggleThemeBtn.style.right = "20px";
    toggleThemeBtn.style.width = "40px";
    toggleThemeBtn.style.height = "40px";
    toggleThemeBtn.style.backgroundImage = "url('img/switch.png')";
    toggleThemeBtn.style.backgroundSize = "cover";
    toggleThemeBtn.style.backgroundRepeat = "no-repeat";
    toggleThemeBtn.style.backgroundPosition = "center";
    toggleThemeBtn.style.backgroundColor = "#000000";
    toggleThemeBtn.style.border = "none";
    toggleThemeBtn.style.cursor = "pointer";

    document.body.appendChild(toggleThemeBtn);

    toggleThemeBtn.addEventListener("click", () => {
        document.body.classList.toggle("alt-theme");
        toggleThemeBtn.style.backgroundColor = document.body.classList.contains("alt-theme") ? "transparent" : "#000000";
    });
});
