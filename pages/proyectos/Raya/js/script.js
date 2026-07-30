let tablero = ["", "", "", "", "", "", "", "", ""];
let jugadorActual = "X";
let juegoActivo = true;


const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const celdas = document.querySelectorAll(".celda");
const mensajeElemento = document.getElementById("mensaje");

celdas.forEach((celda) => {
    celda.addEventListener("click", manejarClick);
});

function manejarClick(evento) {
    const celda = evento.target;
    const posicion = parseInt(celda.getAttribute("data-posicion"));

    if (tablero[posicion] === "" && juegoActivo) {
        tablero[posicion] = jugadorActual;
        celda.textContent = jugadorActual;

        if (verificarGanador()) {
            mensajeElemento.textContent = `¡${jugadorActual} ha ganado!`;
            juegoActivo = false;
            return;
        }

        if (verificarEmpate()) {
            mensajeElemento.textContent = "¡Empate!";
            juegoActivo = false;
            return;
        }

        jugadorActual = jugadorActual === "X" ? "O" : "X";
        mensajeElemento.textContent = `Turno de: ${jugadorActual}`;
    }
}




function verificarGanador() {
    for (let combinacion of combinacionesGanadoras) {
        const [a, b, c] = combinacion;
        if (
            tablero[a] &&
            tablero[a] === tablero[b] &&
            tablero[a] === tablero[c]
        ) {
            return true;


        }
    }
    return false;
}

function verificarEmpate() {
    return tablero.every((celda) => celda !== "");


}

function reiniciarJuego() {
    tablero = ["", "", "", "", "", "", "", "", ""];

    jugadorActual = "X";
    juegoActivo = true;

    mensajeElemento.textContent = "Turno de: X";

    celdas.forEach((celda) => {
        celda.textContent = "";

        
    });
}
