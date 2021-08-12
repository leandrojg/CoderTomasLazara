const fs = require("fs");
const ArrayProductos = [];

// implementar programa que contenga una clase llamada Archivo que reciba
//  el nombre del archivo con el que va a trabajar e implemente los métodos leer,
//  guardar, borrar.
class Archivo 
{
  constructor(archivo)
  {
    this.archivo = archivo;
  }
// Utilizar guardar para incorporar productos al archivo "productos.txt"
// La función guardar incorporará al producto un id, 
// el cual se obtendrá de la longitud total del array actual más 1.
async Guardar(producto) {
    try {
      ArrayProductos.push({ ...producto, id: ArrayProductos.length + 1 });
      await fs.promises.writeFile(
        this.archivo,
        JSON.stringify(ArrayProductos, null, "\t")
      );
    }
    catch (err) 
    {
      console.log(err);
    }
}
// Con el método leer se mostrará en consola el listado total
// (si el archivo existe) como un array de productos.
async Leer() {
  let comprobacion = fs.existsSync(this.archivo);
  if (comprobacion)
   {
    await fs.promises.readFile(this.archivo, "utf-8").then((data) => {
      console.log(data);
    });
  }
   else 
   {
    console.log(ArrayProductos);
   }
}

//El método borrar elimina el archivo completo.
// Implementar el manejo de archivos con el módulo fs de node.js,
//  utilizando promesas con async await y manejo de errores.
  async Borrar()
  {
    try
    {
      try
      {
       await fs.promises.unlink(this.archivo)
      }
      catch
      {
       throw new Error("el archivo que se quiere borrar es inexistente")
      }
        
    }
    catch(err)
    {
      console.log(err)
    }
  }
}

const random = (min, max)=> { 
  let rangoAleatorio = Math.floor(Math.random() * (max-min))
  return rangoAleatorio;
}

let obProducto1 = {
  producto: `Banana`,
  precio: `${random(0.00, 9999.99)}`,
  thumbnail: `Foto: ${random(1,10)}`
}

let obProducto2 = {
  producto: `Tomate`,
  precio: `${random(0.00, 9999.99)}`,
  thumbnail: `Foto: ${random(1,10)}`
}

let nuevoArchivo = new Archivo("productos.txt");
nuevoArchivo.Leer();
nuevoArchivo.Guardar(obProducto1);
nuevoArchivo.Guardar(obProducto2);

//dejo la funcion borrar en un timeOut para remarcar la diferencia
//setTimeout(()=>nuevoArchivo.Borrar(), 5000)