export function exportarTablaComoImagen() {
    html2canvas(document.getElementById("resultado")).then(canvas => {
        const link = document.createElement("a");
        link.download = "distribucion_propinas.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}
