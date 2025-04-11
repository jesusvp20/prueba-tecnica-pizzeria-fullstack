import axios from "axios";

// Crea una instancia de axios con la URL base
const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// Obtenemos todas las pizzas
export const getPizzas = async () => {
    const response = await api.get('/pizzas');
    return response.data;
  };
  

//Obtenemos las ordenes


  // Creamos una nueva orden para confirmar la orden
  export const createOrder = async (orderData) => {
    const res = await axios.post("http://localhost:3000/api/orders", orderData);
    return res.data; 
  };