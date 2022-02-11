import React, { Component } from "react";
import { variables } from "./Variables.js";

export class Paket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paketi: [],
      modalTitle: "",
      PaketID: 0,
      NazivPaketa: "",
      OpisPaketa: "",
      Cena: 0,
      Kategorija: "NET",
      proveraDel: 1,

      paketiZaUgovor: [],
    };
  }

  refreshList() {
    fetch(variables.API_URL + "paket")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ paketi: data });
      });

    fetch(variables.API_URL + "paketZaUgovor")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ paketiZaUgovor: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changeNazivPaketa = (e) => {
    this.setState({ NazivPaketa: e.target.value });
  };

  changeOpisPaketa = (e) => {
    this.setState({ OpisPaketa: e.target.value });
  };

  changeCena = (e) => {
    this.setState({ Cena: e.target.value });
  };

  changeKategorija = (e) => {
    this.setState({ Kategorija: e.target.value });
  };

  clearClick() {
    this.setState({
      PaketID: 0,
      NazivPaketa: "",
      OpisPaketa: "",
      Cena: 0,
      Kategorija: "NET",
    });
  }

  editClick(pak) {
    this.setState({
      PaketID: pak.PaketID,
      NazivPaketa: pak.NazivPaketa,
      OpisPaketa: pak.OpisPaketa,
      Cena: pak.Cena,
      Kategorija: pak.Kategorija,
    });
  }

  createClick() {
    if (!this.provera()) {
      alert("Niste popunili sva polja ili su pogresno popunjena!");
      return;
    }

    fetch(variables.API_URL + "paket", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        NazivPaketa: this.state.NazivPaketa,
        OpisPaketa: this.state.OpisPaketa,
        Cena: this.state.Cena,
        Kategorija: this.state.Kategorija,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );

    this.clearClick();
  }

  proveraPreBrisanja(pakId) {
    {
      this.state.paketiZaUgovor.map((ugo) => {
        return pakId == ugo.PaketID ? (this.state.proveraDel = -1) : null;
      });
    }
  }

  provera() {
    if (this.state.NazivPaketa == "") {
      return false;
    }

    if (this.state.OpisPaketa == "") {
      return false;
    }

    if (this.state.Cena < 1) {
      return false;
    }

    if (this.state.Kategorija == "") {
      return false;
    }
    return true;
  }

  updateClick() {
    if (!this.provera()) {
      alert("Niste popunili sva polja ili su pogresno popunjena!");
      return;
    }

    fetch(variables.API_URL + "paket", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PaketID: this.state.PaketID,
        NazivPaketa: this.state.NazivPaketa,
        OpisPaketa: this.state.OpisPaketa,
        Cena: this.state.Cena,
        Kategorija: this.state.Kategorija,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );

    this.clearClick();
  }

  deleteClick(id) {
    this.proveraPreBrisanja(id);
    if (this.state.proveraDel == -1) {
      this.state.proveraDel = 1;
      alert("Ovaj paket ne moze da bude obrisan jer je u upotrebi");
      return;
    }
    if (window.confirm("Za nastavak brisanja pritisnite OK.")) {
      fetch(variables.API_URL + "paket/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }

  render() {
    const {
      paketi,
      modalTitle,
      PaketID,
      NazivPaketa,
      OpisPaketa,
      Cena,
      Kategorija,
    } = this.state;

    return (
      <>
        <div className="input-group mb-5 mt-5">
          <span className="input-group-text">Naziv paketa</span>
          <input
            type="text"
            className="form-control"
            value={NazivPaketa}
            onChange={this.changeNazivPaketa}
          />
        </div>

        <div className="input-group mb-5 mt-5">
          <span className="input-group-text">Opis</span>
          <input
            type="text"
            className="form-control"
            value={OpisPaketa}
            onChange={this.changeOpisPaketa}
          />
        </div>

        <div className="input-group mb-5 mt-5">
          <span className="input-group-text">Cena (RSD)</span>
          <input
            type="text"
            className="form-control"
            value={Cena}
            onChange={this.changeCena}
          />
        </div>

        <div className="input-group mb-3">
          <label className="input-group-text" for="inputGroupSelect01">
            Kategorija
          </label>
          <select
            className="form-select"
            id="inputGroupSelect01"
            value={Kategorija}
            onChange={this.changeKategorija}
          >
            <option value="NET">NET</option>
            <option value="IPTV">IPTV</option>
            <option value="VOICE">VOICE</option>
          </select>
        </div>

        {PaketID == 0 ? (
          <button
            type="button"
            className="btn btn-success float-start mb-5"
            onClick={() => this.createClick()}
          >
            Create
          </button>
        ) : null}

        {PaketID != 0 ? (
          <button
            type="button"
            className="btn btn-success float-start mb-5"
            onClick={() => this.updateClick()}
          >
            Update
          </button>
        ) : null}

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Naziv</th>
              <th>Opis</th>
              <th>Cena(RSD)</th>
              <th>Kategorija</th>
              <th colspan="2">Akcija</th>
            </tr>
          </thead>

          <tbody>
            {paketi.map((pak) => (
              <tr key={pak.PaketID}>
                <td>{pak.NazivPaketa}</td>
                <td>{pak.OpisPaketa}</td>
                <td>{pak.Cena}</td>
                <td>{pak.Kategorija}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(pak)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(pak.PaketID)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}
