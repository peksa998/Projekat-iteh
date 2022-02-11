import logo from "./logo.svg";
import "./App.css";
import { Home } from "./Home";
import { Paket } from "./Paket";
import { Ugovor } from "./Ugovor";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">Orion app</h3>

        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Pocetna
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/ugovor"
              >
                Ugovor
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/paket"
              >
                Paket
              </NavLink>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/ugovor" component={Ugovor} />
          <Route path="/paket" component={Paket} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
