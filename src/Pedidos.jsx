import { useState } from "react";
import Pedido from "./Pedido";

function Pedidos({accesstoken}) {
  const [pedidos, setPedidos] = useState(null);
  const [mostrarlistos, setMostrarListos] = useState(null)

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
    <>
      <div className="form-check form-switch mt-3 ms-3 display-6 fs-5">
          <input className="form-check-input" type="checkbox" role="switch" id="chkMostrarListos" onChange={e => setMostrarListos(e.target.checked)}/>
          <label className="form-check-label" htmlFor="chkMostrarListos">Mostrar pedidos listos</label>
      </div>
      <div className="d-flex gap-3 justify-content-center flex-wrap mt-3">
        {pedidos && pedidos.map(pedido => (
            mostrarlistos ?
              <Pedido
                key={pedido.id}
                accesstoken={accesstoken}
                id={pedido.id}
                fecha={pedido.fecha_pedido}
                mesa={pedido.mesa}
                precio={pedido.total_precio}
              />
            :
              !pedido.listo ?
                <Pedido
                  key={pedido.id}
                  accesstoken={accesstoken}
                  id={pedido.id}
                  fecha={pedido.fecha_pedido}
                  mesa={pedido.mesa}
                  precio={pedido.total_precio}
                  listo={pedido.listo}
                /> 
              :
                null
        ))}
      </div>
    </>
  )
}

export default Pedidos;
