export let participantes = [];
export let penalizaciones = [];

export function cargarGrupos() {
    const data = localStorage.getItem("grupos");
    if (!data) return;
    const grupos = JSON.parse(data);
    grupos.forEach(grupo => {
        participantes.push(...grupo.participantes.map(nombre => ({
            nombre,
            puntos: grupo.puntos
        })));
    });
}
