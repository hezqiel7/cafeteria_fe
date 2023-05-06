import { useEffect, useState, useRef } from "react";

function Productos({
  accesstoken,
  productosElegidos,
  setProductosElegidos,
  totalPrecio,
  setTotalPrecio,
}) {
  const productos = useRef(null);
  const [listaProductos, setListaProductos] = useState(null);
  const [buscar, setBuscar] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/productos/", {
      headers: {
        Authorization: "Bearer " + accesstoken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        productos.current = data;
        setListaProductos(data);
      });
  }, []);

  const handleClickProducto = (producto) => {
    let arr = [...productosElegidos];
    arr.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
    });
    setProductosElegidos(arr);
    setTotalPrecio(totalPrecio + producto.precio);
  };

  const handleChangeBuscar = (e) => {
    const data = e.target.value;
    setBuscar(data);
    let lista_productos = productos.current.filter((p) => {
      // Normalizar para ignorar cualquier tilde
      let nombre = p.nombre
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      let buscado = data
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      return nombre.includes(buscado);
    });

    setListaProductos(lista_productos);
  };

  return (
    <>
      <div className="input-group rounded mb-2">
        <input
          type="search"
          className="form-control"
          placeholder="Buscar"
          onChange={handleChangeBuscar}
        />
        <span className="input-group-text border-0">
          <i className="fas fa-search"></i>
        </span>
      </div>
      <ul className="list-group gap">
        {listaProductos &&
          listaProductos.map((producto) => (
            <li
              className={"list-group-item list-group-item-action list-group-item-info ".concat(
                productosElegidos.find((p) => p.id === producto.id)
                  ? "disabled"
                  : ""
              )}
              key={producto.id}
              onClick={() => handleClickProducto(producto)}
            >
              {producto.nombre}
            </li>
          ))}
      </ul>
    </>
  );
}

export default Productos;
