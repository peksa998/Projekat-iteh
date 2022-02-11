import React, { Component } from "react";
import { variables } from "./Variables.js";

export class Ugovor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ugovori: [],

      UgovorID: 0,
      KorisnickoIme: "",
      TrajanjeUgovora: 12,
      Popust: 0,
      GratisPeriod: 0,
      Aktivnost: "aktivan",
      DatumPocetka: "",
      Suma: 0,

      SumaUgovor: 0,

      izmeneUgovora: [],
      PromenaID: 0,
      Datum: "",
      iuAktivan: "",

      paketi: [],

      PaketID: 0,
      NazivPaketa: "",
      OpisPaketa: "",
      Cena: 0,
      Kategorija: "",

      paketiZaUgovor: [],
      paketIDNET: 0,
      paketIDIPTV: 0,
      paketIDVOICE: 0,

      modal: 0,
      pomocna: 1,
      pomStatus: "aktivan",
    };
  }

  refreshList() {
    fetch(variables.API_URL + "ugovor")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ ugovori: data });
      });

    fetch(variables.API_URL + "IstorijaPromeneUgovora")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ izmeneUgovora: data });
      });

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

  changeKorisnickoIme = (e) => {
    this.setState({ KorisnickoIme: e.target.value });
  };

  changeTrajanjeUgovora = (e) => {
    this.setState({ TrajanjeUgovora: e.target.value });
  };

  changePopust = (e) => {
    this.setState({ Popust: e.target.value });
  };

  changeGratisPeriod = (e) => {
    this.setState({ GratisPeriod: e.target.value });
  };

  changeAktivnost = (e) => {
    this.setState({ Aktivnost: e.target.value });
  };

  changePaketIDNET = (e) => {
    this.setState({ paketIDNET: e.target.value });
  };

  changePaketIDIPTV = (e) => {
    this.setState({ paketIDIPTV: e.target.value });
    console.log(this.state.paketIDIPTV);
  };

  changePaketIDVOICE = (e) => {
    this.setState({ paketIDVOICE: e.target.value });
  };

  // TREBA JOS DODATI FUNKCIJE ZA DATUM KREIRANJA/DATUM IZMENE I SUMA

  provera() {
    if (!this.proveraPopunjenost()) {
      return false;
    }
    this.proveraUsername();
    if (this.state.pomocna == -1) {
      if (this.state.pomStatus == "neaktivan") {
        return true;
      }
      alert(
        "Vec postoji korisnik sa unetim korisnickim imenom, mozete nastaviti sa izmenom postojeceg ugovora!"
      );

      {
        this.state.ugovori.map((ugo) => {
          return this.state.KorisnickoIme == ugo.KorisnickoIme &&
            "aktivan" == ugo.Aktivnost
            ? this.editClick(ugo)
            : null;
        });
      }

      return false;
    }
    return true;
  }

  proveraUsername() {
    {
      this.state.ugovori.map((ugo) => {
        return this.state.KorisnickoIme == ugo.KorisnickoIme
          ? ((this.state.pomocna = -1), (this.state.pomStatus = ugo.Aktivnost))
          : null;
      });
    }
  }

  proveraPopunjenost() {
    if (this.state.KorisnickoIme == "") {
      alert("Niste uneli korisnicko ime!");
      return false;
    }

    if (this.state.TrajanjeUgovora == "") {
      alert("Niste oznacili trajanje ugovora!");
      return false;
    }

    if (this.state.Aktivnost == "") {
      alert("Niste izabrali status!");
      return false;
    }

    if (this.state.Popust < 0 || this.state.Popust > 100) {
      alert("Popust moze da bude u rasponu od 0 do 100%!");
      return false;
    }

    if (
      this.state.paketIDNET == 0 &&
      this.state.paketIDIPTV == 0 &&
      this.state.paketIDVOICE == 0
    ) {
      alert("Niste odabrali paket!");
      return false;
    }
    return true;
  }

  clearClick() {
    this.setState({
      UgovorID: 0,
      KorisnickoIme: "",
      TrajanjeUgovora: 12,
      Popust: 0,
      GratisPeriod: 0,
      Aktivnost: "aktivan",
      DatumPocetka: "",
      Suma: 0,
      SumaUgovor: 0,
      paketIDNET: 0,
      paketIDIPTV: 0,
      paketIDVOICE: 0,
    });
  }

  editClick(ugo) {
    this.setState({
      UgovorID: ugo.UgovorID,
      KorisnickoIme: ugo.KorisnickoIme,
      TrajanjeUgovora: ugo.TrajanjeUgovora,
      Popust: ugo.Popust,
      GratisPeriod: ugo.GratisPeriod,
      Aktivnost: ugo.Aktivnost,
      DatumPocetka: ugo.DatumPocetka,
      SumaUgovor: ugo.Suma,
    });
  }

  snimiUgovor() {
    this.refreshList();
    {
      this.state.ugovori.map((ugo) => {
        return this.state.KorisnickoIme == ugo.KorisnickoIme
          ? (this.state.UgovorID = ugo.UgovorID)
          : null;
      });
    }

    this.createPaketZaUgovor();
    // this.createIstorijaPromeneUgovora();
  }

  createIstorijaPromeneUgovora() {
    fetch(variables.API_URL + "IstorijaPromeneUgovora", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Datum: this.state.Datum,
        Suma: this.state.Suma,
        UgovorID: this.state.UgovorID,
        iuAktivan: this.state.Aktivnost,
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
  }

  createPaketZaUgovor() {
    if (
      this.state.paketIDNET != 0 ||
      this.state.paketIDIPTV != 0 ||
      this.state.paketIDVOICE != 0
    ) {
      if (this.state.paketIDNET != 0) {
        this.createPaketZaUgovorPom(this.state.paketIDNET);
      }

      if (this.state.paketIDIPTV != 0) {
        this.createPaketZaUgovorPom(this.state.paketIDIPTV);
      }

      if (this.state.paketIDVOICE != 0) {
        this.createPaketZaUgovorPom(this.state.paketIDVOICE);
      }
    }
  }

  createPaketZaUgovorPom(pom) {
    console.log("usao");
    console.log(pom);
    console.log(this.state.UgovorID);
    fetch(variables.API_URL + "PaketZaUgovor", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PaketID: pom,
        UgovorID: this.state.UgovorID,
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
  }

  suma() {
    {
      this.state.paketiZaUgovor.map((pzu) => {
        return this.state.UgovorID == pzu.UgovorID
          ? this.state.paketi.map((pak) => {
              return pak.PaketID == pzu.PaketID
                ? ((this.state.Suma = this.state.Suma + pak.Cena),
                  console.log(pak.Cena))
                : null;
            })
          : null;
      });
    }

    this.state.SumaUgovor = this.state.Suma * this.state.TrajanjeUgovora;

    if (this.state.GratisPeriod != 0) {
      this.state.SumaUgovor =
        this.state.SumaUgovor - this.state.GratisPeriod * this.state.Suma;
    }

    if (this.state.Popust != 0) {
      this.state.SumaUgovor =
        this.state.SumaUgovor -
        (this.state.SumaUgovor * this.state.Popust) / 100;
    }

    console.log(this.state.Suma);
    console.log("Ispisao sumu");
  }

  uradiSumu() {
    this.refreshList();

    this.suma();

    this.createIstorijaPromeneUgovora();

    this.updateUgovor();
    console.log("prosao");
    this.clearClick();
  }

  createClick() {
    if (!this.provera()) {
      return;
    }
    this.state.DatumPocetka = new Date();
    this.state.Datum = new Date();
    fetch(variables.API_URL + "ugovor", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        KorisnickoIme: this.state.KorisnickoIme,
        TrajanjeUgovora: this.state.TrajanjeUgovora,
        Popust: this.state.Popust,
        GratisPeriod: this.state.GratisPeriod,
        Aktivnost: this.state.Aktivnost,
        DatumPocetka: this.state.DatumPocetka,
        Suma: this.state.SumaUgovor,
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
  }

  updateClick() {
    if (!this.proveraPopunjenost()) {
      return;
    }
    this.state.Datum = new Date();
    // this.updateUgovor();
    // // uradi sumu
    // this.createIstorijaPromeneUgovora();
    this.updatePaketZaUgovor();

    this.uradiSumu();
    this.clearClick();
  }

  updatePaketZaUgovor() {
    this.state.paketiZaUgovor.map((ugo) => {
      return this.state.UgovorID == ugo.UgovorID
        ? this.deletePaketZaUgovor(ugo.rb)
        : null;
    });

    this.createPaketZaUgovor();
  }

  deletePaketZaUgovor(id) {
    if (true) {
      fetch(variables.API_URL + "PaketZaUgovor/" + id, {
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

  updateUgovor() {
    fetch(variables.API_URL + "ugovor", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UgovorID: this.state.UgovorID,
        KorisnickoIme: this.state.KorisnickoIme,
        TrajanjeUgovora: this.state.TrajanjeUgovora,
        Popust: this.state.Popust,
        GratisPeriod: this.state.GratisPeriod,
        Aktivnost: this.state.Aktivnost,
        DatumPocetka: this.state.DatumPocetka,
        Suma: this.state.SumaUgovor,
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
  }

  preBrisanjaUgovora() {
    this.state.paketiZaUgovor.map((ugo) => {
      return this.state.UgovorID == ugo.UgovorID
        ? this.deletePaketZaUgovor(ugo.rb)
        : null;
    });

    this.state.izmeneUgovora.map((ugo) => {
      return this.state.UgovorID == ugo.UgovorID
        ? this.deleteIstorijuIzmeneUgovora(ugo.PromenaID)
        : null;
    });
  }

  deleteIstorijuIzmeneUgovora(id) {
    if (true) {
      fetch(variables.API_URL + "IstorijaPromeneUgovora/" + id, {
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

  deleteClick(id) {
    this.state.UgovorID = id;
    this.preBrisanjaUgovora();
    if (window.confirm("Za nastavak brisanja pritisnite OK.")) {
      fetch(variables.API_URL + "ugovor/" + id, {
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
    this.clearClick();
  }

  render() {
    const {
      ugovori,
      modalTitle,
      UgovorID,
      KorisnickoIme,
      TrajanjeUgovora,
      Popust,
      GratisPeriod,
      Aktivnost,
      DatumPocetka,
      Suma,

      izmeneUgovora,
      PromenaID,
      Datum,
      iuAktivan,

      paketi,
      PaketID,
      NazivPaketa,
      OpisPaketa,
      Cena,
      Kategorija,

      paketIDNET,
      paketIDIPTV,
      paketIDVOICE,
      modal,
    } = this.state;

    return (
      <>
        {UgovorID != 0 ? (
          <>
            <h4 className="mt-4">Edit mode</h4>
            <div className="input-group mb-3 mt-5">
              <span className="input-group-text">Broj ugovora</span>
              <span className="input-group-text">{UgovorID}</span>
            </div>
          </>
        ) : null}

        {/* --------------------------------------------------------- */}
        <div className="input-group mb-4 mt-4">
          <span className="input-group-text">Korisnicko Ime</span>
          <input
            type="text"
            className="form-control"
            value={KorisnickoIme}
            onChange={this.changeKorisnickoIme}
          />
        </div>

        <div className="input-group mb-4">
          <label className="input-group-text" for="inputGroupSelect04">
            Trajanje ugovorne obaveze (meseci)
          </label>
          <select
            className="form-select"
            id="inputGroupSelect04"
            value={TrajanjeUgovora}
            onChange={this.changeTrajanjeUgovora}
          >
            <option value="12">12</option>
            <option value="24">24</option>
          </select>
        </div>

        <div className="input-group mb-4">
          <span className="input-group-text">Popust (%)</span>
          <input
            type="text"
            className="form-control"
            value={Popust}
            onChange={this.changePopust}
          />
        </div>

        <div className="input-group mb-4">
          <label className="input-group-text" for="inputGroupSelect03">
            Gratis period (meseci)
          </label>
          <select
            className="form-select"
            id="inputGroupSelect03"
            value={GratisPeriod}
            onChange={this.changeGratisPeriod}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-sm">
              <div className="input-group mb-3">
                <span className="input-group-text">Izbor NET paketa </span>
                <select
                  className="form-select"
                  onChange={this.changePaketIDNET}
                  value={paketIDNET}
                >
                  <option value="0">/</option>
                  {paketi.map((pak) => {
                    return pak.Kategorija == "NET" ? (
                      <option key={pak.PaketID} value={pak.PaketID}>
                        {pak.NazivPaketa}
                      </option>
                    ) : null;
                  })}
                </select>
              </div>
            </div>
            <div className="col-sm">
              <div className="input-group mb-3">
                <span className="input-group-text">Izbor IPTV paketa </span>
                <select
                  className="form-select"
                  onChange={this.changePaketIDIPTV}
                  value={paketIDIPTV}
                >
                  <option value="0">/</option>
                  {paketi.map((pak) => {
                    return pak.Kategorija == "IPTV" ? (
                      <option key={pak.PaketID} value={pak.PaketID}>
                        {pak.NazivPaketa}
                      </option>
                    ) : null;
                  })}
                </select>
              </div>
            </div>
            <div className="col-sm">
              <div className="input-group mb-3">
                <span className="input-group-text">Izbor VOICE paketa </span>
                <select
                  className="form-select"
                  onChange={this.changePaketIDVOICE}
                  value={paketIDVOICE}
                >
                  <option value="0">/</option>
                  {paketi.map((pak) => {
                    return pak.Kategorija == "VOICE" ? (
                      <option key={pak.PaketID} value={pak.PaketID}>
                        {pak.NazivPaketa}
                      </option>
                    ) : null;
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>

        {UgovorID == 0 ? (
          <div className="input-group mb-4">
            <label className="input-group-text" for="inputGroupSelect01">
              Status
            </label>
            <select
              className="form-select"
              id="inputGroupSelect01"
              value={Aktivnost}
              onChange={this.changeAktivnost}
            >
              <option value="aktivan">aktivan</option>
            </select>
          </div>
        ) : null}

        {UgovorID != 0 ? (
          <div className="input-group mb-4">
            <label className="input-group-text" for="inputGroupSelect02">
              Status
            </label>
            <select
              className="form-select"
              id="inputGroupSelect02"
              value={Aktivnost}
              onChange={this.changeAktivnost}
            >
              <option value="aktivan">aktivan</option>
              <option value="neaktivan">neaktivan</option>
            </select>
          </div>
        ) : null}

        {UgovorID == 0 ? (
          <button
            type="button"
            className="btn btn-success float-start mb-5"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => this.createClick()}
          >
            Create
          </button>
        ) : null}

        {UgovorID != 0 ? (
          <button
            type="button"
            className="btn btn-success float-start mb-5"
            onClick={() => this.updateClick()}
          >
            Update
          </button>
        ) : null}

        {/* Izmeni na != */}
        {UgovorID != 0 ? (
          <>
            <h4 className="mt-5">Istorija izmene ugovora</h4>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Datum</th>
                  <th>Status</th>
                  <th>Suma (RSD)</th>
                </tr>
              </thead>

              <tbody>
                {izmeneUgovora.map((iu) => {
                  return iu.UgovorID == UgovorID ? (
                    <tr key={iu.PromenaID}>
                      <td>{iu.Datum}</td>
                      <td>{iu.iuAktivan}</td>
                      <td>{iu.Suma}</td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
          </>
        ) : null}

        <h4 className="mt-5 mb-4">Poslednjih 5 ugovora</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Broj ugovora</th>
              <th>Korisnicko ime</th>
              <th>Trajanje (meseci)</th>
              <th>Datum kreiranja</th>
              <th colspan="2">Akcija</th>
            </tr>
          </thead>

          <tbody>
            {
              ((this.state.brojac = 0),
              ugovori
                .slice(0)
                .reverse()
                .map((ugo) => {
                  return this.state.brojac++ < 5 ? (
                    <tr key={ugo.UgovorID}>
                      <td>{ugo.UgovorID}</td>
                      <td>{ugo.KorisnickoIme}</td>
                      <td>{ugo.TrajanjeUgovora}</td>
                      <td>{ugo.DatumPocetka}</td>

                      <td>
                        <button
                          type="button"
                          className="btn btn-light mr-1"
                          onClick={() => this.editClick(ugo)}
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
                          onClick={() => this.deleteClick(ugo.UgovorID)}
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
                  ) : null;
                }))
            }
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Potvrda unosa</h5>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <p>Potvrdi cuvanje ugovora.</p>
                </div>

                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal2"
                  className="btn btn-primary float-start"
                  onClick={() => this.snimiUgovor()}
                  data-bs-dismiss="modal"
                >
                  Potvrdi
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL ZA SUMU */}

        <div
          className="modal fade"
          id="exampleModal2"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ugovor je sacuvan</h5>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3"></div>
              </div>

              <button
                type="button"
                className="btn btn-primary float-start"
                onClick={() => this.uradiSumu()}
                data-bs-dismiss="modal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
