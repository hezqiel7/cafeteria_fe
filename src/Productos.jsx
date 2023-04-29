import { useEffect, useState } from "react";

function Productos({accesstoken, productosElegidos, setProductosElegidos}) {

    const [productos, setProductos] = useState(null)

    useEffect(() => {
        fetch("http://localhost:8000/productos/", {
            headers: {
                Authorization: "Bearer " + accesstoken
            }
        })
        .then(response => response.json())
        .then(data => {
            setProductos(data)
        })
    }, [])

    const handleClickProducto = (e) => {
        let producto_id = parseInt(e.target.getAttribute("producto_id"))
        let producto_nombre = e.target.innerHTML

        let arr = [...productosElegidos]
        arr.push({id:producto_id, nombre:producto_nombre})
        setProductosElegidos(arr)
    }

    return(
        <ul className="list-group gap">
            {productos && productos.map(producto => (
                <li
                    className={"list-group-item list-group-item-action list-group-item-info "
                                .concat(productosElegidos.find(p => p.id === producto.id) ? "disabled" : "")}
                    key={producto.id}
                    producto_id={producto.id}
                    onClick={handleClickProducto}
                >
                    {producto.nombre}
                </li>
            ))}
        </ul>
    )
}

export default Productos