//Desarrollar un servidor en node.js
const http = require("http");

const random = (min, max)=> { 
  let rangoAleatorio = Math.floor(Math.random() * (max-min))
  return rangoAleatorio;
}

let ob = {
  id: random(1,20),
  producto: `Producto: ${random(1,100)}`,
  precio: `${random(0.00, 9999.99)}`,
    thumbnail: `Foto: ${random(1,10)}`
}

let conversion = JSON.stringify(ob);
// que con cada requerimiento devuelva como resultado un objeto
const server = http.createServer((peticion, respuesta)=>{
  respuesta.end(` CoderHouse - Tomas Lazara 
  objeto requerido :  ${conversion}`  )
})

const Port = process.env.Port || 3000;

server.listen(Port, ()=>{
  console.log(`servidor seteado en el puerto ${Port}`)
})
