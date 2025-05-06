export function toggleEntregado(boton) {
    const entregado = boton.classList.contains("btn-success");
    if (entregado) {
        boton.textContent = "No entregado";
        boton.classList.remove("btn-success");
        boton.classList.add("btn-outline-success");
    } else {
        boton.textContent = "Entregado";
        boton.classList.remove("btn-outline-success");
        boton.classList.add("btn-success");
    }
}
