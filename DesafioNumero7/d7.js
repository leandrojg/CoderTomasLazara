const express = require("express");
const fs = require("fs");
const session = require("express-session");



// Realizar un proyecto de servidor basado en node.js que utilice el middleware express 
// e implemente tres endpoints en el puerto 8080
const App = express();
const server = App.listen(8080,()=>{
    console.log(`Puerto de escucha seteado: 8080`)
})

App.use(session({
    secret: 'session',
    resave:true,
    saveUninitialized: true
}))

let visitasItems = [];
let VisitasRandom = []; 

// Ruta get '/items' que responda un objeto con todos los productos 
// y su cantidad total en el siguiente formato: { items: [productos], cantidad: (cantidad productos)}
App.get("/items",(req, res)=>{
     
    req.session.visitas = req.session.visitas ? ++ req.session.visitas: 1 ;
    visitasItems.push(req.session.visitas);

  const Archivo = fs.promises.readFile("productos.txt"); 
  Archivo.then(productos => {
     let ArregloProductos = JSON.parse(productos)
     let largoArreglo = JSON.parse(productos).length;
        res.json({Items: ArregloProductos, cantidad: largoArreglo});

    })
})

// Ruta get '/item-random' que devuelva un producto elegido al azar desde un array de productos que se encuentran 
// en el archivo 'productos.txt'. El formato de respuesta será: { item: {producto} }
App.get("/item-random",(req, res)=>{
    
    req.session.visitas = req.session.visitas ? ++ req.session.visitas: 1 ;
    VisitasRandom.push(req.session.visitas);


  const random = (min, max)=> { 
    let rangoAleatorio = Math.floor(Math.random() * (max-min))
    return rangoAleatorio;
    }

    const Archivo = fs.promises.readFile("productos.txt"); 
    Archivo.then(productos => {
        let Productos = JSON.parse(productos)
        let largoArreglo = JSON.parse(productos).length;
        res.json({Item:Productos[random(0, largoArreglo)]});
    })
})

// La ruta get '/visitas' devuelve un objeto que indica cuantas veces se visitó la ruta del punto 1 
// y cuantas la ruta del punto 2. Contestar con el formato:  { visitas : { items: cantidad, item: cantidad } }
App.get("/visitas",(req, res)=>{

    res.json({"Visitas a item random": VisitasRandom.length, "Visitas a items": visitasItems.length} )
})
