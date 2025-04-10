import express from 'express';
import fs from 'fs';

const app = express()

const readData = () => {
    try {
      const data = fs.readFileSync("./src/data/Pizza.json");
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
      return [] 
    }
  };
  
  readData()


  const read_data = () => {
    try {
      const data = fs.readFileSync("./src/data/Ordenes.json");
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
      return [] 
    }
  };
  
  read_data()



app.get('/api/pizzas', (req,res) => {
    const data = readData()
    res.json(data)
  });
  

app.get('/api/orders',(req,res) =>{
    const data = read_data()
    res.json(data)
})

  app.get('/api/orders/:id', (req, res) => {
    const orders = read_data();
    const pizzas = readData();
    const id = parseInt(req.params.id);

    const order = orders.find(o => o.id === id);

    if (!order) {
        return res.status(404).json({ message: "Orden no encontrada" });
    }

    const itemsConDetalle = order.items.map(item => {
        const pizza = pizzas.find(p => p.id === item.pizzaId);
        return {
            pizza: pizza ? pizza.nombre : "Pizza no encontrada",
            cantidad: item.cantidad,
            precioUnitario: pizza ? pizza.precio : 0,
            subtotal: pizza ? pizza.precio * item.cantidad : 0
        };
    });

    const respuesta = {
        id: order.id,
        cliente: order.cliente,
        fecha: order.fecha,
        items: itemsConDetalle
    };

    res.json(respuesta);
});
export default app