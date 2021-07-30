"use strict";

// Realizar un documento web que contenga un elemento input 
document.getElementById("Contenido").innerHTML = `  <h1>Consigna 1 - observable</h1>
                                                      <p>
                                                        <input type="text" id="texto"></input>
                                                        <span id="espejo"></span>
                                                      </p>
                                                `

document.addEventListener("DOMContentLoaded",()=>{
    
  const {fromEvent} = rxjs;
  const _texto = document.getElementById('texto');
  let _espejo = document.getElementById("espejo");
    
// a medida de que escribo, 
// se vaya mostrando a su derecha el texto en forma espejada. Utilizar un Observable para realizar esa función.
   const observable$ = fromEvent(_texto, "keyup");
   let suscriptor =  observable$.subscribe((e)=>{

       let str = e.target.value;
       let strInvertido = str.split(" ").reverse().join(" ")
       let textoValor = _texto.value;
// Si en el lapso de tiempo activo se escribe ‘error’, el Observable terminará por error. 
       if(textoValor === "error")
       {
         suscriptor.error(
          limpiarfunciones("error")
          )
         //Indicar por la consola la razón del cierre de la función.
       }
//Si se ingresa ‘complete’, el Observable terminará en forma normal. 
       else if(textoValor == "complete")
       {
        suscriptor.complete(
          limpiarfunciones("complete")
         )
       }
       _espejo.innerText = strInvertido;
        
      })
    suscriptor;

// Este comportamiento estará disponible por 30 segundos. Luego de ese tiempo, 
//se realizará la desuscripción automática. 
  setTimeout(()=>{
    console.log("Desucripcion automatica");  
    suscriptor.unsubscribe(limpiarfunciones("desuscripcion"))
},30000)

// Una vez que el Observable no esté más operativo, desregistrar el evento de entrada, 
//deshabilitar la escritura en el input y borrar el resultado de la operación.
const limpiarfunciones =(motivo)=>{
    console.log(`el obserbable no se encuentra operativo debido a: '${motivo}' `)
    _texto.addEventListener("keydown", e=>{
      e.preventDefault()}
    ) 
    _texto.value = " ";
    _espejo.innerText = " ";  
}

})

