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
  return (
    // <Content />

    <>
      <div className="App">
        <BrowserRouter>
          <Nav />

          <main className="form-signin">
            <Route path="/" exact component={Content} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </main>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
