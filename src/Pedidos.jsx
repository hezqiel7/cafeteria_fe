import { useEffect, useState } from "react";
import Pedido from "./Pedido";
import Productos from "./Productos";

function Pedidos({accesstoken}) {
  const [pedidos, setPedidos] = useState(null);
  const [mostrarlistos, setMostrarListos] = useState(null)
  const [mostrarNuevo, setMostrarNuevo] = useState(false);
  const [productosElegidos, setProductosElegidos] = useState([])

  useEffect(() => {
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
  }, [])

  const handleClickNuevo = () => {
    setMostrarNuevo(!mostrarNuevo);
  };

  const handleCLickQuitar = (e) => {
    const producto_id = e.target.parentElement.getAttribute("data-producto-id")
    let arr = [...productosElegidos]
    const indice = arr.findIndex(p => p.id == producto_id)
    arr.splice(indice, 1)
    setProductosElegidos(arr)
  }

  const handleEnviarPedido = () => {

  }

  return (
    <div className="container">
      <div className="d-flex py-2 justify-content-between align-items-center">
        {!mostrarNuevo ?
          <>
            <div className="form-check form-switch display-6 fs-5">
              <input className="form-check-input" type="checkbox" role="switch" id="chkMostrarListos" onChange={e => setMostrarListos(e.target.checked)}/>
              <label className="form-check-label" htmlFor="chkMostrarListos">Mostrar pedidos listos</label>
            </div>
            <button className="btn btn-primary" onClick={handleClickNuevo}>Nuevo</button>    
          </>
        :
          <>
            <button className="btn btn-success" onClick={handleEnviarPedido}>Enviar pedido</button>
            <button className="btn btn-secondary" onClick={handleClickNuevo}>Cancelar</button>
          </>
        }
      </div>
        {!mostrarNuevo ?
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
        :
          <div className="d-flex justify-content-between flex-column flex-md-row">
            {productosElegidos.length > 0 &&
              <div className="w-100 p-3">
                <div className="list-group list-group-flush">
                  {productosElegidos.map(producto => {
                    return(
                      <a className="list-group-item px-4" key={producto.id}>
                        <div className="d-flex w-100 justify-content-between align-items-center">
                          <h6 className="m-0 p-0">{producto.nombre}</h6>
                          <div className="d-flex justify-content-between w-25 gap-3 align-items-center">
                            <input type="number" className="form-control"/>
                            <div id="botonQuitar" onClick={handleCLickQuitar} data-producto-id={producto.id}><i className="fa-solid fa-trash-can" style={{color: "#931515"}}></i></div>
                          </div>
                        </div>
                      </a>
                    )    
                    })}
                </div>
              </div>
            }
              <div className="py-3 w-100 p-3">
                {/* <div className="form-floating mb-4">
                  <input type="text" className="form-control" id="nombre" placeholder="Nombre"/>
                  <label htmlFor="nombre" className="form-label-sm text-secondary">Nombre</label>
                </div> */}
                <Productos
                  accesstoken={accesstoken}
                  productosElegidos={productosElegidos}
                  setProductosElegidos={setProductosElegidos}
                />
              </div>
          </div>
        }
    </div>
  )
}

export default Pedidos;
