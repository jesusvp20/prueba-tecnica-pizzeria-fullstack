import { useEffect, useState } from "react";
import { createOrder, getPizzas } from "../../Services/Api";

function OrdenesConfirmacion() {
  const [pizzas, setPizzas] = useState([]);
  const [pizzaSeleccionada, setPizzaSeleccionada] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState("");

  useEffect(() => {
    //listamos las pizzas
    const fetchPizzas = async () => {
      try {
        const data = await getPizzas();
        setPizzas(data);
      } catch (error) {
        console.error("Error al obtener las pizzas:", error);
      }
    };
    fetchPizzas();
  }, [])

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
            cantidad: parseInt(cantidad)
          }
        ]
      }
     //creamos la confirmacion del pedido
      const response = await createOrder(orderData);
      setMensajeConfirmacion(`Éxito: ${response.message} - Orden #${response.orderSummary.id} a nombre de ${response.orderSummary.cliente}.`);
      
      // Resetear formulario
      setPizzaSeleccionada("");
      setClienteSeleccionado("");
      setCantidad(1);
      
    } catch (error) {
      console.error("Error al confirmar la orden:", error);
      setMensajeConfirmacion("Error: No se pudo crear la orden");
    }
  }

  const pizzaSeleccionadaData = pizzas.find(p => p.id === parseInt(pizzaSeleccionada));

  return (
    <div>
      <h2>Confirmar Orden</h2>

      {/* Selector de pizza */}
      <label>Selecciona una pizza:</label>
      <select
        value={pizzaSeleccionada}
        onChange={(e) => setPizzaSeleccionada(e.target.value)}
      >
        <option value="">-- Pizza --</option>
        {pizzas.map((pizza) => (
          <option key={pizza.id} value={pizza.id}>
            {pizza.nombre} - ${pizza.precio}
          </option>
        ))}
      </select>

      {/* Campo para nombre del cliente */}
      <label style={{ marginLeft: "10px" }}>Cliente:</label>
      <input
        type="text"
        value={clienteSeleccionado}
        onChange={(e) => setClienteSeleccionado(e.target.value)}
        placeholder="Nombre del cliente"
        style={{ marginLeft: "5px", width: "150px" }}
      />

      {/* Selector de cantidad */}
      <label style={{ marginLeft: "10px" }}>Cantidad:</label>
      <input
        type="number"
        min="1"
        max="10"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        style={{ 
          marginLeft: "5px",
          width: "60px",
          padding: "3px",
          textAlign: "center"
        }}
      />

      {/* Resumen del pedido */}
      {pizzaSeleccionadaData && clienteSeleccionado && (
        <div style={{ margin: "15px 0", padding: "10px", border: "1px solid #ddd" }}>
          <strong>Resumen del pedido:</strong><br />
          {cantidad} x {pizzaSeleccionadaData.nombre} para {clienteSeleccionado}
        </div>
      )}

      <button 
        onClick={handleConfirmarOrden}
        style={{ 
          marginLeft: "10px", 
          padding: "5px 15px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Confirmar Orden
      </button>

      {mensajeConfirmacion && (
        <div style={{ 
          marginTop: "20px", 
          color: mensajeConfirmacion.startsWith("Éxito") ? "green" : "red",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "4px"
        }}>
          {mensajeConfirmacion}
        </div>
      )}
    </div>
  )
}

export default OrdenesConfirmacion;