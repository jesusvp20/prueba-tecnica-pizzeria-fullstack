
import express from 'express';
import { orderValidationRules, validateOrder } from '../validation/OrdenAdmin.js';
import { readData, writeData } from '../utils/DataUtils.js';
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

// Ruta para listar pizzas
app.get('/api/pizzas', (req, res) => {
  const data = readData("./src/data/Pizza.json"); 
  res.json(data);
})

//Ruta para listar ordenes
app.get('/api/orders', (req, res) => {
  const data = readData("./src/data/Ordenes.json");
  res.json(data);
})

//Busqueda de ordenes por id
app.get('/api/orders/:id', (req, res) => {
  const orders = readData("./src/data/Ordenes.json");
  const pizzas = readData("./src/data/Pizza.json");
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
    }
  })

  const respuesta = {
    id: order.id,
    cliente: order.cliente,
    items: itemsConDetalle
  };

  res.json(respuesta);
})

// Endpoint POST para crear  nueva orden
app.post('/api/orders', orderValidationRules, validateOrder, (req, res) => {
  const orders = readData("./src/data/Ordenes.json");
  const newOrder = {
    id: orders.length + 1,
    cliente: req.body.cliente,
    items: req.body.items  // Sin fecha
  }

  orders.push(newOrder);
  writeData("./src/data/Ordenes.json", orders); 

  res.status(201).json({
    message: "Tu orden ha sido confirmada.",
    orderSummary: newOrder
  })
})
export default app;
