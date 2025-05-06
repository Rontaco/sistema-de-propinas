// Agregar botón al body al cargar el documento
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

    // Agregar el botón al body
    document.body.appendChild(toggleThemeBtn);

    // Alternar el tema al hacer clic
    toggleThemeBtn.addEventListener("click", () => {
        document.body.classList.toggle("alt-theme");

        // Cambiar el fondo del botón según el tema
        if (document.body.classList.contains("alt-theme")) {
            toggleThemeBtn.style.backgroundColor = "transparent"; // Sin fondo en tema alternativo
        } else {
            toggleThemeBtn.style.backgroundColor = "#000000"; // Fondo negro en el modo estándar
        }
    });

    // Revisar si ya está guardado el estado del tema
    const temaOscuro = localStorage.getItem("temaOscuro") === "true";
    if (temaOscuro) {
        document.body.classList.add("alt-theme");
        toggleThemeBtn.style.backgroundColor = "transparent"; // Fondo transparente en tema alternativo
    }

    // Guardar el estado del tema en el localStorage
    toggleThemeBtn.addEventListener("click", () => {
        const esTemaOscuro = document.body.classList.contains("alt-theme");
        localStorage.setItem("temaOscuro", esTemaOscuro.toString());
    });
});

