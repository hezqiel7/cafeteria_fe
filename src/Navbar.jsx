function Navbar({ setAccesstoken, setActualTab }) {
  const handleLogOut = (e) => {
    localStorage.clear();
    sessionStorage.clear();
    setAccesstoken(null);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          App Cafetería
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                onClick={() => setActualTab("inicio")}
                href="#"
              >
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => setActualTab("pedido")}
                href="#"
              >
                Pedidos
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => setActualTab("productos")}
                href="#"
              >
                Productos
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => setActualTab("usuarios")}
                href="#"
              >
                Usuarios
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={handleLogOut} href="#">
                Cerrar sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
