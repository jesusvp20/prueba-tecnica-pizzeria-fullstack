// src/components/PizzaList.jsx
import { useState, useEffect } from 'react';
import { getPizzas } from '../../Services/Api';

function PizzaList() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const data = await getPizzas();
        setPizzas(data);
      } catch (error) {
        console.error("Error al obtener las pizzas:", error);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Lista de Pizzas</h2>
      <div className="row">
        {pizzas.map(pizza => (
          <div className="col-md-4 mb-3" key={pizza.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{pizza.nombre}</h5>
                <p className="card-text">Ingredientes: {pizza.ingredientes.join(', ')}</p>
                <p className="card-text">Precio: ${pizza.precio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PizzaList;
