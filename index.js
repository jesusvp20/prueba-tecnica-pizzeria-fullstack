import express from 'express'

import fs, { read } from 'fs'

//creamos una instancia del objeto de la aplicacion 
const app = express()

// Middleware para parsear cuerpos JSON en las solicitudes
app.use(express.json());

// Función para leer los datos del archivo JSON
const readData = () => {
    try {
      const data = fs.readFileSync("Pizza.json");
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
      return [] 
    }
  };
  
  readData()


 // Función para escribir datos en el archivo JSON
const WriteData = (data) =>{
   try{
    fs.writeFile("./Models/Pizza.json", JSON.stringify(data))
   }catch (error){
       console.log(e)
   } 
   
    
    
}

//levantamos el servidor en el puerto 3000 
app.listen(3000, () =>{
    console.log("Servidor esta funcionando en el puerto 3000")
})

// creamos los endpoints
app.get('/api/pizzas', (req, res) => {
    const data = readData();
    res.json(data); 
  });
  
  
