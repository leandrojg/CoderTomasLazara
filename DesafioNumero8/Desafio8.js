// Realizar un proyecto de servidor basado en node.js que permita listar e incorporar ítems 
// dentro de un array de productos en memoria.
const express = require("express");
const App = express();
App.use(express.urlencoded({extended: false}));
App.use(express.json());

const dameId = ()=>
    {
        let idPosible = ArrayProductos.length + 1;
        return idPosible;
    }

const ArrayProductos= []

const server = App.listen(8080,()=>{
    console.log(`Puerto de escucha seteado: 8080`)
})


// Las rutas propuestas serían las siguientes:
// A. Listar en forma total (get) : '/api/productos/listar' -> devuelve array de productos
App.get("/api/productos/listar",(req, res)=>{
// En caso de no haber productos en el listado total, se retornará el objeto: {error : 'no hay productos cargados'}
// Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman.

    if(!ArrayProductos.length)
    {
      res.json({error : 'no hay productos cargados'});
    } 
    else
    {
      res.json({ArrayProductos})
    }
})
// B. Listar en forma individual (get) (por id): '/api/productos/listar/:id' -> devuelve producto listado
App.get("/api/productos/listar/:id",(req, res)=>{

    let productoId = req.params.id;
    let productoEncontrado = ArrayProductos.find(producto => producto.id == productoId);

    if(productoEncontrado == null)
    {
// Para el caso de que se liste en forma individual un producto que no exista, se devolverá el objeto:
      res.json({error : 'producto no encontrado'});
    }
    else
    {  
     res.json({productoEncontrado});
    }
})
// C. Almacenar un producto (post) : '/api/productos/guardar/' -> devuelve producto incorporado
App.post("/api/productos/guardar/",(req, res)=>{

    let oProducto = {
        "id": dameId(),
       "producto" : req.body.producto
     }
     ArrayProductos.push(oProducto);
    res.status(200).send(oProducto);
})


