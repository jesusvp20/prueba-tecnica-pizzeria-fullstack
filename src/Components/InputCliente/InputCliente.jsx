import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function InputCliente({ value, onChange }) {
  return (
    <div className="mb-3">
      <input
        id="inputCliente"
        type="text"
        className="form-control bg-dark text-white border-secondary"
        placeholder="Nombre del cliente"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default InputCliente;
