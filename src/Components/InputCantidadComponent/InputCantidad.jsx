import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function InputCantidad({ value, onChange }) {
  const handleChange = (e) => {
    let newValue = parseInt(e.target.value, 10) || 1;
    if (newValue > 10) {
      newValue = 10;
    }
    onChange(newValue);
  };

  return (
    <div className="mb-3">
 
      <input
        id="inputCantidad"
        type="number"
        min="1"
        max="10"
        className="form-control bg-dark text-white border-secondary"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default InputCantidad;
