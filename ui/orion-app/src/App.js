import logo from "./logo.svg";
import "./App.css";
import { Home } from "./Home";
import { Paket } from "./Paket";
import { Ugovor } from "./Ugovor";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
import { Content } from "./Content";
import { Login } from "./Login";
import { Nav } from "./Nav";
import { Register } from "./Register";

function App() {
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5193/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();

      setName(content.Name);
    })();
  });

  return (
    // <Content />

    <>
      <div className="App">
        <BrowserRouter>
          <Nav name={name} setName={setName} />

          <main className="form-signin">
            <Route path="/" exact component={() => <Content name={name} />} />
            <Route
              path="/login"
              component={() => <Login setName={setName} />}
            />
            <Route path="/register" component={Register} />
          </main>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
