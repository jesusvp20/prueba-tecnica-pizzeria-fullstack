import React from "react";
import "./MensajeConfirmacion.css";

function MensajeConfirmacion({ mensaje }) {
  return (
    <div className="mensaje-exito">
      {mensaje}
    </div>
  );
}

export default MensajeConfirmacion;

