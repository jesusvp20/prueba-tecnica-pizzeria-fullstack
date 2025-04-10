import express from 'express'

import fs, { read } from 'fs'

//creamos una instancia del objeto de la aplicacion 
const app = express()

app.use(express.json());

const readData = () => {
    try {
      const data = fs.readFileSync("./Models/PizzaModel.json");
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
      return [] 
    }
  };
  
  readData()

const WriteData = (data) =>{
   try{
    fs.writeFile("./Models/PizzaModel.json", JSON.stringify(data))
   }catch (error){
       console.log(e)
   } 
   
    
    
}

//levantamos el servidor y pasamos un puerto 
app.listen(3000, () =>{
    console.log("Servidor esta funcionando en el puerto 3600")
})

app.get('/api/pizzas', (req, res) => {
    const data = readData();
    res.json(data); 
  });
  
  
