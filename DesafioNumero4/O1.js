"use strict";

// Realizar un documento web que contenga un elemento input
document.getElementById(
  "Contenido"
).innerHTML = `  <h1>Consigna 1 - observable</h1>
                                                      <p>
                                                        <input type="text" id="texto"></input>
                                                        <span id="espejo"></span>
                                                      </p>
                                                `;

document.addEventListener("DOMContentLoaded", () => {
  const { fromEvent } = rxjs;
  let _texto = document.getElementById("texto");
  let _espejo = document.getElementById("espejo");

  // a medida de que escribo,
  // se vaya mostrando a su derecha el texto en forma espejada. Utilizar un Observable para realizar esa función.
  const observable$ = fromEvent(_texto, "keyup");
  let suscriptor = observable$.subscribe((e) => {
    let str = e.target.value;

    let strInvertido = str.split("").reverse().join(""); //aqui solo habia que cambiar " " por ""

    let textoValor = _texto.value;
    // Si en el lapso de tiempo activo se escribe ‘error’, el Observable terminará por error.
    //aqui hubo que hacer unas correcciones
    if (textoValor === "error" || textoValor === "complete") {
      //Indicar por la consola la razón del cierre de la función.
      limpiarfunciones(textoValor); // es necesario que se ejecute antes de pasar a error o complete
      //Si se ingresa ‘complete’, el Observable terminará en forma normal.
      if (textoValor === "complete") suscriptor.complete();
      else suscriptor.error("Error :c");
    } else _espejo.innerText = strInvertido;
  });
  suscriptor;

  // Este comportamiento estará disponible por 30 segundos. Luego de ese tiempo,
  //se realizará la desuscripción automática.
  setTimeout(() => {
    console.log("Desucripcion automatica");
    suscriptor.unsubscribe(limpiarfunciones("desuscripcion"));
  }, 30000);

  // Una vez que el Observable no esté más operativo, desregistrar el evento de entrada,
  //deshabilitar la escritura en el input y borrar el resultado de la operación.
  const limpiarfunciones = (motivo) => {
    console.log(
      `el obserbable no se encuentra operativo debido a: '${motivo}' `
    );
    //aqui hacia falta cambiar el orden
    _texto.value = "";
    _texto.disabled = true; // esto para que quede mas bonito
    _espejo.innerText = "";
    _texto.addEventListener("keydown", (e) => {
      e.preventDefault();
    });
  };
});
