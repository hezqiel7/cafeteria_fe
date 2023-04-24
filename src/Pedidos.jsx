import { useState } from "react"

function Pedidos(props) {
    
    const [pedidos, setPedidos] = useState(null)

    if(!pedidos) {
        fetch("http://localhost:8000/pedidos/", {
            headers : {
                'Authorization': 'Bearer ' + props.accesstoken
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.code == "token_not_valid") {
                sessionStorage.clear()
                // Renovar token
            }
            setPedidos(data)
            // pedidos = data
        })
    }
    
    
    return(
        <div className="d-flex justify-content-center gap-5">
            {pedidos && pedidos.map(pedido => (
                <div key={pedido.id}>
                    <p>Mesa: {pedido.mesa}</p>
                    <p>Fecha: {new Date(pedido.fecha_pedido).toLocaleString("Es-es")}</p>
                    <p>Precio: {pedido.total_precio}</p>
                    <p>Listo: {pedido.listo.toString()}</p>
                    <ul>
                        {pedido.lista_productos.map(producto => (
                            <div key={producto.producto_id}>
                                <li>Producto id: {producto.producto_id}</li>
                                <li>Cantidad: {producto.cantidad}</li>
                            </div>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default Pedidos