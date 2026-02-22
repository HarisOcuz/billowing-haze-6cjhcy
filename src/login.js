import { useState } from "react";
import { Updates } from "./Updates";

export default Login;

function Login({ authStatus, setAuthStatus }) {
  return (
    <div className="container">
      {/* {alert(
        "Optimiert für Desktop-Workflows: Aufgrund der Komplexität des PMS ist keine Responsivität für Mobilgeräte geplant.",
      )} */}
      <LoginForm authStatus={authStatus} setAuthStatus={setAuthStatus} />
    </div>
  );
}

function LoginForm({ authStatus, setAuthStatus }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  function handleUser(e) {
    setUser(e.target.value);
    setUserError(user === "Haris" ? true : false);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    if (user !== "Haris") {
      setUserError(true);
    } else setUserError(false);

    if (Number(password) !== 1846) {
      setPasswordError(true);
    } else setPasswordError(false);

    if (user === "Haris" && Number(password) === 1846) {
      setAuthStatus(true);
    }

    e.target.querySelectorAll("input").forEach((input) => input.blur());

    setUser("");
    setPassword("");
    console.log(typeof password);
  }

  function handleAutoComplete() {
    setUser("Haris");
    setPassword(1846);
  }

  return (
    <>
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <img
          className="logo-login"
          src="/Hotel_Flow__1_-removebg-preview.png"
          alt="App Logo"
          loading="eager"
        />
        {/* <h3 className="login-title">Login</h3> */}
        <input
          className="input-field"
          type="text"
          placeholder="Benutzername"
          value={user}
          onChange={handleUser}
          style={userError ? { border: "1.5px solid red" } : {}}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Kenwort"
          value={password}
          onChange={handlePassword}
          style={passwordError ? { border: "1.5px solid red" } : {}}
        />
        <button className="btn btn-login">Anmelden</button>
        <div className="user-data-login-container">
          <ul className="user-data-login">
            <li>Bitte folgende Daten verwenden:</li>
            <li>Haris</li>
            <li>1846</li>
            <li>
              oder
              <strong className="redirection" onClick={handleAutoComplete}>
                {" "}
                hier{" "}
              </strong>
              klicken
            </li>
          </ul>
        </div>
      </form>

      <Updates />
    </>
  );
}
