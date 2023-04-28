import { useEffect, useState } from "react";

const Pedido = ({accesstoken, id, fecha, mesa, precio}) => {

    let aux = 0;
    const [productos, setProductos] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:8000/pedidos/${id}/productos/`, {
			headers: {
				Authorization: "Bearer " + accesstoken
			}
		})
		.then(response => response.json())
        .then(data => setProductos(data))
    }, [])

    return(
        <div className="card" style={{width: "300px"}}>
            <div className="card-header">
                <h5 className="card-title fs-6 lh-base mb-0 fw-normal text-end">{new Date(fecha).toLocaleString("Es-es")}</h5>
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-between px-1">
                    <h6 className="card-subtitle mb-2 text-body-secondary fw-normal mb-3">Mesa {mesa}</h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary fw-normal mb-3">₲ {precio}</h6>
                </div>
                <ul className="list-group">
                    {productos ?
                        productos.map(prod => {
                            return(
                                <li className="list-group-item d-flex justify-content-between align-items-center" key={aux+=1}>
                                    <span className="badge bg-success rounded-pill">{prod.cantidad}</span>
                                    {prod.producto.nombre}
                                </li>
                            )
                        })
                    :
                        <p class="card-text placeholder-glow text-center">
                            <span class="placeholder col-6 mx-1"></span>
                            <span class="placeholder col-4 mx-1"></span>
                            <span class="placeholder col-4 mx-1"></span>
                            <span class="placeholder col-6 mx-1"></span>
                            <span class="placeholder col-8 mx-1"></span>
                            <span class="placeholder col-2 mx-1"></span>
                        </p>
                    }
                </ul> 
            </div>
            <div className="card-footer d-grid">
                <button className="btn btn-success fw-bold" type="button">✓</button>
            </div>
        </div> 
    )
}

export default Pedido