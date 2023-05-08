import { useState, useEffect } from "react";

function ListaProductos({ accesstoken }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/productos/", {
      headers: {
        Authorization: "Bearer " + accesstoken,
      },
    })
      .then((response) => response.json())
      .then((data) => setProductos(data));
  }, []);

  return (
    <div className="d-flex">
      {productos &&
        productos.map((prod) => {
          return (
            <div key={prod.id} className="p-3 m-2 border">
              <h6>{prod.nombre}</h6>
              <p>{prod.precio}</p>
            </div>
          );
        })}
    </div>
  );
}

export default ListaProductos;
