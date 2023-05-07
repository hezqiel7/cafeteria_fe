import "./css/App.css";
import { useState } from "react";
import Navbar from "./Navbar";
import Login from "./Login";
import Pedidos from "./Pedidos";

function App() {
  const [actualtab, setActualTab] = useState("inicio");

  let accesstokenx = localStorage.getItem("accesstoken");
  let refreshtokenx = localStorage.getItem("refreshtoken");

  if (!accesstokenx || accesstokenx == "undefined") {
    accesstokenx = sessionStorage.getItem("accesstoken");
    refreshtokenx = sessionStorage.getItem("refreshtoken");
  }

  const [accesstoken, setAccesstoken] = useState(accesstokenx);
  const [refreshtoken, setRefreshtoken] = useState(refreshtokenx);

  if (accesstoken && accesstoken != "undefined") {
    return (
      <>
        <Navbar setAccesstoken={setAccesstoken} setActualTab={setActualTab} />
        {actualtab === "pedido" && <Pedidos accesstoken={accesstoken} />}
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
