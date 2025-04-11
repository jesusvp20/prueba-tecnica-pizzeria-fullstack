function ResumenPedido({ pizza, cliente, cantidad }) {
  if (!pizza || !cliente) return null;

  return (
    <div className="card bg-dark text-white border-secondary mt-3">
      <div className="card-body">
        <h5 className="card-title">Resumen del Pedido</h5>
        <p className="card-text">
          {cantidad} de {pizza.nombre} para <strong>{cliente}</strong>
        </p>
      </div>
    </div>
  );
}

export default ResumenPedido;
