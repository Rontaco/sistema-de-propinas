import html2canvas from "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm";

export function exportarTablaComoImagen() {
    const tablaOriginal = document.querySelector(".table");
    if (!tablaOriginal) return alert("No se encontró la tabla");

    const tablaClonada = tablaOriginal.cloneNode(true);

    // Eliminar columna "Entregado"
    const eliminarUltimaColumna = (fila) => {
        if (fila.cells.length > 0) fila.deleteCell(fila.cells.length - 1);
    };
    for (let fila of tablaClonada.rows) {
        eliminarUltimaColumna(fila);
    }

    // Crear un contenedor temporal oculto
    const contenedor = document.createElement("div");
    contenedor.style.position = "fixed";
    contenedor.style.top = "-9999px";
    contenedor.style.width = "fit-content";
    contenedor.style.padding = "20px";
    contenedor.style.background = "white";
    contenedor.style.textAlign = "center";

    // Info adicional
    const fecha = new Date().toLocaleDateString("es-AR");
    const total = document.getElementById("propinaTotal").value || 0;

    contenedor.innerHTML = `
        <h2>Distribución de Propinas</h2>
        <div><strong>Fecha:</strong> ${fecha}</div>
        <div><strong>Total Propina:</strong> $${parseFloat(total).toFixed(2)}</div>
    `;
    tablaClonada.classList.remove("w-75", "mx-auto");
    tablaClonada.style.margin = "20px auto";
    tablaClonada.style.width = "600px";
    tablaClonada.style.border = "1px solid #000";
    contenedor.appendChild(tablaClonada);

    document.body.appendChild(contenedor);

    html2canvas(contenedor).then((canvas) => {
        const link = document.createElement("a");
        link.download = `propinas_${fecha.replaceAll("/", "-")}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        document.body.removeChild(contenedor);
    });
}
