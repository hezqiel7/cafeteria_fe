import { useEffect, useState } from "react";
import Pedido from "./Pedido";
import Productos from "./Productos";

function Pedidos({ accesstoken }) {
  const [pedidos, setPedidos] = useState([]);
  const [mostrarlistos, setMostrarListos] = useState(null);
  const [mostrarNuevo, setMostrarNuevo] = useState(false);
  const [productosElegidos, setProductosElegidos] = useState([]);
  const [totalPrecio, setTotalPrecio] = useState(0);
  const [nombreCliente, setNombreCliente] = useState(null);
  const [mesa, setMesa] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/pedidos/", {
      headers: {
        Authorization: "Bearer " + accesstoken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code == "token_not_valid") {
          sessionStorage.clear();
          // Renovar token
        }
        setPedidos(data);
      });
  }, []);

  const handleClickNuevo = () => {
    setMostrarNuevo(!mostrarNuevo);
  };

  const handleCLickQuitar = (e) => {
    const producto_id = e.target.parentElement.getAttribute("data-producto-id");
    let arr = [...productosElegidos];
    const indice = arr.findIndex((p) => p.id == producto_id);
    const precio = arr[indice].precio;
    const cantidad = arr[indice].cantidad;
    setTotalPrecio(totalPrecio - precio * cantidad);
    arr.splice(indice, 1);
    setProductosElegidos(arr);
  };

  const handleChangeCantidad = (e) => {
    const producto_id = e.target.getAttribute("data-producto-id");
    let arr = [...productosElegidos];
    const producto = arr.find((p) => p.id == producto_id);
    producto.cantidad = e.target.value;
    setProductosElegidos(arr);

    setTotalPrecio(calcularPrecioTotal());
  };

  const calcularPrecioTotal = () => {
    let sum = 0;
    productosElegidos.forEach((producto) => {
      sum += producto.precio * producto.cantidad;
    });
    return sum;
  };

  const handleEnviarPedido = () => {
    let lista_productos = [];

    productosElegidos.forEach((producto) => {
      lista_productos.push({
        producto_id: producto.id,
        cantidad: parseInt(producto.cantidad),
      });
    });

    // Buscar el id mas grande actualmente
    const idMasGrande = pedidos.reduce((anterior, actual) => {
      return actual.id > anterior.id ? actual : anterior;
    });

    const data = {
      id: idMasGrande.id + 1,
      mesa: parseInt(mesa),
      listo: false,
      fecha_pedido: new Date(Date.now()).toISOString(),
      lista_productos: lista_productos,
      total_precio: totalPrecio,
      nombre_cliente: nombreCliente,
    };

    console.log(data);

    fetch("http://localhost:8000/pedidos/", {
      headers: {
        Authorization: "Bearer " + accesstoken,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="container">
      <div className="d-flex py-2 justify-content-between align-items-center">
        {!mostrarNuevo ? (
          <>
            <div className="form-check form-switch display-6 fs-5">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="chkMostrarListos"
                onChange={(e) => setMostrarListos(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="chkMostrarListos">
                Mostrar pedidos listos
              </label>
            </div>
            <button className="btn btn-primary" onClick={handleClickNuevo}>
              Nuevo
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-success" onClick={handleEnviarPedido}>
              Enviar pedido
            </button>
            <p>₲ {totalPrecio}</p>
            <button className="btn btn-secondary" onClick={handleClickNuevo}>
              Cancelar
            </button>
          </>
        )}
      </div>
      {!mostrarNuevo ? (
        <div className="d-flex gap-3 justify-content-center flex-wrap mt-3">
          {pedidos &&
            pedidos.map((pedido) =>
              mostrarlistos ? (
                <Pedido
                  key={pedido.id}
                  accesstoken={accesstoken}
                  id={pedido.id}
                  fecha={pedido.fecha_pedido}
                  mesa={pedido.mesa}
                  precio={pedido.total_precio}
                />
              ) : !pedido.listo ? (
                <Pedido
                  key={pedido.id}
                  accesstoken={accesstoken}
                  id={pedido.id}
                  fecha={pedido.fecha_pedido}
                  mesa={pedido.mesa}
                  precio={pedido.total_precio}
                  listo={pedido.listo}
                />
              ) : null
            )}
        </div>
      ) : (
        <div className="d-flex justify-content-between flex-column flex-md-row">
          {productosElegidos.length > 0 && (
            <div className="w-100 p-3">
              <div className="list-group list-group-flush">
                {productosElegidos.map((producto) => {
                  return (
                    <a className="list-group-item px-4" key={producto.id}>
                      <div className="d-flex w-100 justify-content-between align-items-center">
                        <h6 className="m-0 p-0">{producto.nombre}</h6>
                        <div className="d-flex justify-content-between w-25 gap-3 align-items-center">
                          <input
                            type="number"
                            className="form-control"
                            onChange={handleChangeCantidad}
                            value={
                              productosElegidos.find(
                                (p) => p.id === producto.id
                              ).cantidad
                            }
                            data-producto-id={producto.id}
                            min="1"
                          />
                          <div
                            id="botonQuitar"
                            onClick={handleCLickQuitar}
                            data-producto-id={producto.id}
                          >
                            <i
                              className="fa-solid fa-trash-can"
                              style={{ color: "#931515" }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
          <div className="py-3 w-100 p-3">
            <div className="row">
              <div className="form-floating mb-4 col-9">
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  placeholder="Nombre"
                  onChange={(e) => setNombreCliente(e.target.value)}
                />
                <label
                  htmlFor="nombre"
                  className="form-label-sm text-secondary ms-3"
                >
                  Nombre del cliente
                </label>
              </div>
              <div className="form-floating mb-4 col-3">
                <input
                  type="number"
                  id="mesa"
                  className="form-control"
                  placeholder="Mesa"
                  onChange={(e) => setMesa(e.target.value)}
                />
                <label
                  htmlFor="mesa"
                  className="form-label-sm text-secondary ms-3"
                >
                  Mesa
                </label>
              </div>
            </div>
            <Productos
              accesstoken={accesstoken}
              productosElegidos={productosElegidos}
              setProductosElegidos={setProductosElegidos}
              totalPrecio={totalPrecio}
              setTotalPrecio={setTotalPrecio}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Pedidos;
