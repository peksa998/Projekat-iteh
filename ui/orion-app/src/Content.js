import "./App.css";
import { Home } from "./Home";
import { Paket } from "./Paket";
import { Ugovor } from "./Ugovor";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";

const BASE_URL =
  "http://api.exchangeratesapi.io/v1/latest?access_key=8f288df2d2522afbcda642e64bba683b";

export const Content = (props) => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[121];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}&base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <h5>{props.name ? "Hi " + props.name : "You are not logged in!"}</h5>
      <BrowserRouter>
        <div className="App container">
          <h3 className="d-flex justify-content-center m-3">Orion app</h3>

          <nav className="navbar navbar-expand-sm bg-light navbar-dark">
            <ul className="navbar-nav">
              <li className="nav-item- m-1">
                <NavLink
                  className="btn btn-light btn-outline-primary"
                  to="/home"
                >
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

      <div className="m-5">
        <h4>Convert</h4>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <div className="equals">=</div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
      </div>
    </>
  );
};
