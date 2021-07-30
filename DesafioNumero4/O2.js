"use strict";

// Realizar un documento web que contenga un elemento input 
document.getElementById("Contenido").innerHTML = `  <h1>Consigna 2 - observable con pipe</h1>
                                                      <p>
                                                        <input type="text" id="texto"></input>
                                                        <span id="espejo"></span>
                                                      </p>
                                                `

document.addEventListener("DOMContentLoaded",()=>{
    
  const {fromEvent} = rxjs;
  const {map} = rxjs.operators;
  const _texto = document.getElementById('texto');
  let _espejo = document.getElementById("espejo");
    
// a medida de que escribo, 
// se vaya mostrando a su derecha el texto en forma espejada. Utilizar un Observable para realizar esa función.
   const observable$ = fromEvent(_texto, "keyup").pipe(
                       map(e=>{ 
                          let str = e.target.value.split("").reverse().join("");

                          let textoValor = _texto.value;
                          if(textoValor === "error")
                          {
                            suscriptor.error(
                                limpiarfunciones("error")
                            )
                        } 
                        else if(textoValor === "complete")
                        {
                            suscriptor.complete(
                            limpiarfunciones("complete")
                            )
                        }
                        return str ;                        
                    }))                                 

   let suscriptor =  observable$.subscribe((e)=>{
       _espejo.innerText = e
      })
    suscriptor;

// Este comportamiento estará disponible por 30 segundos. Luego de ese tiempo, 
//se realizará la desuscripción automática. 
  setTimeout(()=>{
    console.log("Desucripcion automatica");  
    suscriptor.unsubscribe(limpiarfunciones("Desuscripcion"))
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

