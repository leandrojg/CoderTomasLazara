//Al finalizar el la operación completa debe imprimir:
//‘proceso completo’ y también mostrar la cantidad de palabras totales
function terminar(i, length){
    console.log("proceso completo");
    console.log(`el total de palabras fue ${length}`)
    clearInterval(i);
}

//Desarrollar una función que permita recorrer un texto que se le pase como parámetro
// y muestre cada una de sus palabras en un tiempo estipulado. 
// Al finalizar debe ejecutar una función que se le pasa como callback.
function barridoDeLetras({texto, iteracion= 0, intervalo= 1000, callback}) {
//Hacer configurable el tiempo de representación de palabras mediante un parámetro opcional.
//Si este no se define será cada un segundo.
      return new Promise((res) => {

          let segmentoDePalabras = texto.split(' ');
          let PalabrasTotales = segmentoDePalabras.length;

          let interval = setInterval( ()=>{
           if(PalabrasTotales == iteracion)
           {
             res(callback(interval, PalabrasTotales)); 
           }
           else
           {
               console.log(segmentoDePalabras[iteracion])
               iteracion++
           }},intervalo);
        }) 
  }

// Realizar tres llamadas a la función con porciones de texto 
//que tienen que ser representados en forma ordenada. Inicialmente todas las palabras del primero,
//luego las del segundo y finalmente las del tercero. 
(async ()=>{
    let primerLlamado = {texto:"primer llamado", intervalo:2000, callback:terminar}
    await barridoDeLetras(primerLlamado);

    let segundoLlamado = {texto:"segundo llamado", intervalo:5000, callback:terminar}
    await barridoDeLetras(segundoLlamado);

    let tercerLlamado = {texto:"tercer llamado", callback:terminar}
    await barridoDeLetras(tercerLlamado);
})()



