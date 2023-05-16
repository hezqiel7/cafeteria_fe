import "./css/App.css";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Login from "./Login";
import Pedidos from "./Pedidos";
import Productos from "./Productos";
import Usuarios from "./Usuarios";
import jwt_decode from "jwt-decode";

function App() {
  const [actualtab, setActualTab] = useState("pedido");

  let accesstokenx = localStorage.getItem("accesstoken");
  let refreshtokenx = localStorage.getItem("refreshtoken");

  if (!accesstokenx || accesstokenx == "undefined") {
    accesstokenx = sessionStorage.getItem("accesstoken");
    refreshtokenx = sessionStorage.getItem("refreshtoken");
  }

  const [accesstoken, setAccesstoken] = useState(accesstokenx);
  const [refreshtoken, setRefreshtoken] = useState(refreshtokenx);
  const [grupo, setGrupo] = useState(null);

  if (accesstoken) {
    const user_id = jwt_decode(accesstoken).user_id;
    fetch(`http://localhost:8000/usuarios/${user_id}/grupos/`, {
      headers: {
        Authorization: "Bearer " + accesstoken,
      },
    })
      .then((response) => response.json())
      .then((data) => setGrupo(data.name))
      .catch((error) => console.log(error));
  }

  if (accesstoken && accesstoken != "undefined") {
    return (
      <>
        <Navbar
          accesstoken={accesstoken}
          setAccesstoken={setAccesstoken}
          setActualTab={setActualTab}
          grupo={grupo}
          setGrupo={setGrupo}
        />
        {actualtab === "pedido" && (
          <Pedidos accesstoken={accesstoken} grupo={grupo} />
        )}
        {actualtab === "productos" && (
          <Productos accesstoken={accesstoken} editable={true} />
        )}
      </>
    );
  }

  return (
    <div className="container h-100 d-flex justify-content-center align-items-center">
      <Login setAccesstoken={setAccesstoken} />
    </div>
  );
}

export default App;
