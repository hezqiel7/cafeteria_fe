function Login() {

    const handleSubmit = (e) => {
        event.preventDefault();

        // Lee los datos del formulario
        const form = e.target;
        const formData = new FormData(form);

        fetch('http://localhost:8000/api/token/', { method: form.method, body: formData })
        .then(response => response.json())
        .then(data => {
            // Guardar el token JWT en el Local Storage
            localStorage.setItem('accesstoken', data.access);
            localStorage.setItem('refreshtoken', data.refresh);
        })
        .catch(error => console.error(error));

    }

    return (
        <div className="container-login">
            <form method="post" onSubmit={handleSubmit}>
                {/* Email input */}
                <div className="form-floating mb-4">
                    <input type="text" className="form-control" id="floatingUsername" name="username"/>
                    <label htmlFor="floatingUsername">Email</label>
                </div>

                {/* Password input */}
                <div className="form-floating mb-4">
                    <input type="password" className="form-control" id="floatingPassword" name="password"/>
                    <label htmlFor="floatingPassword">Contraseña</label>
                </div>

                {/* 2 column grid layout for inline styling */}
                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                        {/* Checkbox */}
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="form2Example31"/>
                            <label className="form-check-label" htmlFor="form2Example31">Recuérdame</label>
                        </div>
                    </div>

                    <div className="col fw-light">
                        {/* Simple link */}
                        <a href="#!">Se olvidó la contraseña?</a>
                    </div>
                </div>

                {/* Submit button */}
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-block mb-4">Iniciar sesión</button>
                </div>
            </form>
        </div>
    )
}

export default Login