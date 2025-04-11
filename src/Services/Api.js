import axios from "axios";

// Crea una instancia de axios con la URL base
const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// Obtiene todas las pizzas
export const getPizzas = async () => {
    const response = await api.get('/pizzas');
    return response.data;
  };
  
  // Crea una nueva orden (debe recibir los datos)
  export const createOrder = async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  };