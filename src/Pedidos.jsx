import { useState } from "react";
import Pedido from "./Pedido";

function Pedidos({accesstoken}) {
  const [pedidos, setPedidos] = useState(null);

  if (!pedidos) {
    fetch("http://localhost:8000/pedidos/", {
      headers: {
        Authorization: "Bearer " + accesstoken
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code == "token_not_valid") {
          sessionStorage.clear();
          // Renovar token
        }
        setPedidos(data);
      });
  }

  return (
    <div className="d-flex gap-3 justify-content-center flex-wrap flex-column align-content-center mh-100 mt-3">
      {pedidos && pedidos.map(pedido => (
        <Pedido
          key={pedido.id}
          accesstoken={accesstoken}
          id={pedido.id}
          fecha={pedido.fecha_pedido}
          mesa={pedido.mesa}
          precio={pedido.total_precio}
        />
      ))}
    </div>
  )
}

export default Pedidos;
