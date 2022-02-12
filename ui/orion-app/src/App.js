import logo from "./logo.svg";
import "./App.css";
import { Home } from "./Home";
import { Paket } from "./Paket";
import { Ugovor } from "./Ugovor";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
import { Content } from "./Content";

function App() {
  return (
    // <Content />

    <>
      <div className="App">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Home
            </a>

            <div>
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    Login
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    Register
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="form-signin">
          <form>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              required
            />

            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Sign in
            </button>
            <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
          </form>
        </main>
      </div>
    </>
  );
}

export default App;
