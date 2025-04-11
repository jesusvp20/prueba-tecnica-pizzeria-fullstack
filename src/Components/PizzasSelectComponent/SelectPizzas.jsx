function SelectPizzas({ pizzas, value, onChange }) {
  return (
    <div className="mb-3">
      <select
        className="form-control bg-dark text-white border-secondary"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Nuestras Opciones</option>
        {pizzas.map((pizza) => (
          <option key={pizza.id} value={pizza.id}>
            {pizza.nombre} - ${pizza.precio}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectPizzas;
