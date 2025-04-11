// PizzasList.jsx
import { useState, useEffect } from 'react';
import { getPizzas } from '../../Services/Api';
import './PizzasList.css';

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
    }
    fetchPizzas();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  return (
    <div className="container-fluid">
      <div className="row g-4">
        {pizzas.map(pizza => (
          <div className="col-12 col-sm-6 col-xl-4" key={pizza.id}>
            <div className="card pizza-card h-100 border-warning bg-gray-800">
              {pizza.imagen && (
                <img
                  src={pizza.imagen}
                  alt={pizza.nombre}
                  className="card-img-top pizza-img"
                  loading="lazy"
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-warning mb-3">{pizza.nombre}</h5>
                <div className="mb-3 flex-grow-1">
                  <p className="text-light mb-2">
                    <strong className="text-warning">Ingredientes:</strong><br/>
                    {pizza.ingredientes.join(', ')}
                  </p>
                </div>
                <p className="card-text h5 text-warning mt-auto">
                  {formatPrice(pizza.precio)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PizzaList;