import { useEffect, useState } from "react";
import { createOrder, getPizzas } from "../../Services/Api";
import SelectPizzas from "../PizzasSelectComponent/SelectPizzas";
import InputCliente from "../InputCliente/InputCliente";
import InputCantidad from "../InputCantidadComponent/InputCantidad";
import MensajeConfirmacion from "../MensajeComponent/MensajeConfirm";
import ResumenPedido from "../ResumenPedidoComponent/ResumenPedido";

import "./OrdenesConfirmacion.css";

function OrdenesConfirmacion() {
  const [pizzas, setPizzas] = useState([]);
  const [pizzaSeleccionada, setPizzaSeleccionada] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState("");

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

  const handleConfirmarOrden = async () => {
    if (!pizzaSeleccionada || !clienteSeleccionado || !cantidad) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const orderData = {
        cliente: clienteSeleccionado,
        items: [
          {
            pizzaId: parseInt(pizzaSeleccionada),
            cantidad: parseInt(cantidad),
          },
        ],
      };

      const response = await createOrder(orderData);
      setMensajeConfirmacion(
        `Éxito: ${response.message} - Orden #${response.orderSummary.id} a nombre de ${response.orderSummary.cliente}.`
      );
      setPizzaSeleccionada("");
      setClienteSeleccionado("");
      setCantidad(1);
    } catch (error) {
      console.error("Error al confirmar la orden:", error);
      setMensajeConfirmacion("Error: No se pudo crear la orden");
    }
  };

  const pizzaSeleccionadaData = pizzas.find(
    (p) => p.id === parseInt(pizzaSeleccionada)
  );

  return (
    <div className="ordenes-confirmacion-container container">
      <h2 className="text-center">Confirmar Orden</h2>
      
      {/* Fila para inputs y resumen */}
      <div className="row g-3">
        
        {/* Columna con inputs */}
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Selecciona tu Pizza</label>
            <SelectPizzas
              pizzas={pizzas}
              value={pizzaSeleccionada}
              onChange={setPizzaSeleccionada}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nombre del Cliente</label>
            <InputCliente
              value={clienteSeleccionado}
              onChange={setClienteSeleccionado}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Cantidad</label>
            <InputCantidad value={cantidad} onChange={setCantidad} />
          </div>
        </div>

        {/* Columna con el resumen del pedido */}
        <div className="col-md-6">
        <label className="form-label">Resumen del pedido </label>
          <div className="resumen-pedido-card">
         
            <ResumenPedido
              pizza={pizzaSeleccionadaData}
              cliente={clienteSeleccionado}
              cantidad={cantidad}
            />
          </div>
        </div>
      </div>

      <button className="btn btn-confirmar w-100" onClick={handleConfirmarOrden}>
        Confirmar Orden
      </button>

      {mensajeConfirmacion && (
        <div className="mensaje-confirmacion">
          <MensajeConfirmacion mensaje={mensajeConfirmacion} />
        </div>
      )}
    </div>
  );
}

export default OrdenesConfirmacion;
