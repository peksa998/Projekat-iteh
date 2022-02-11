import React, { Component } from "react";
import { variables } from "./Variables.js";
import { Ugovor } from "./Ugovor";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brAktivnih: 0,
      brNeaktivnih: 0,

      ugovori: [],

      UgovorID: 0,
      KorisnickoIme: "",
      TrajanjeUgovora: 12,
      Popust: 0,
      GratisPeriod: 0,
      Aktivnost: "aktivan",
      DatumPocetka: "",
      Suma: 0,

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

      sumaUkupna: 0,
      brojac: 0,
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
    if (window.confirm("Za nastavak brisanja pritisnite OK.")) {
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
  }

  deletePaketZaUgovor(id) {
    if (window.confirm("Za nastavak brisanja pritisnite OK.")) {
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

  //   changeNazivPaketa = (e) => {
  //     this.setState({ NazivPaketa: e.target.value });
  //   };

  //   changeOpisPaketa = (e) => {
  //     this.setState({ OpisPaketa: e.target.value });
  //   };

  //   changeCena = (e) => {
  //     this.setState({ Cena: e.target.value });
  //   };

  //   changeKategorija = (e) => {
  //     this.setState({ Kategorija: e.target.value });
  //   };

  //   clearClick() {
  //     this.setState({
  //       PaketID: 0,
  //       NazivPaketa: "",
  //       OpisPaketa: "",
  //       Cena: 0,
  //       Kategorija: "",
  //     });
  //   }

  //   editClick(pak) {
  //     this.setState({
  //       PaketID: pak.PaketID,
  //       NazivPaketa: pak.NazivPaketa,
  //       OpisPaketa: pak.OpisPaketa,
  //       Cena: pak.Cena,
  //       Kategorija: pak.Kategorija,
  //     });
  //   }

  //   createClick() {
  //     fetch(variables.API_URL + "paket", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         NazivPaketa: this.state.NazivPaketa,
  //         OpisPaketa: this.state.OpisPaketa,
  //         Cena: this.state.Cena,
  //         Kategorija: this.state.Kategorija,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then(
  //         (result) => {
  //           alert(result);
  //           this.refreshList();
  //         },
  //         (error) => {
  //           alert("Failed");
  //         }
  //       );

  //     this.clearClick();
  //   }

  //   updateClick() {
  //     fetch(variables.API_URL + "paket", {
  //       method: "PUT",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         PaketID: this.state.PaketID,
  //         NazivPaketa: this.state.NazivPaketa,
  //         OpisPaketa: this.state.OpisPaketa,
  //         Cena: this.state.Cena,
  //         Kategorija: this.state.Kategorija,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then(
  //         (result) => {
  //           alert(result);
  //           this.refreshList();
  //         },
  //         (error) => {
  //           alert("Failed");
  //         }
  //       );

  //     this.clearClick();
  //   }

  //   deleteClick(id) {
  //     if (window.confirm("Za nastavak brisanja pritisnite OK.")) {
  //       fetch(variables.API_URL + "paket/" + id, {
  //         method: "DELETE",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //       })
  //         .then((res) => res.json())
  //         .then(
  //           (result) => {
  //             alert(result);
  //             this.refreshList();
  //           },
  //           (error) => {
  //             alert("Failed");
  //           }
  //         );
  //     }
  //   }

  render() {
    const {
      ugovori,
      modalTitle,
      UgovorID = this.props.UgovorID,
      KorisnickoIme,
      TrajanjeUgovora,
      Popust,
      GratisPeriod,
      Aktivnost,
      DatumPocetka,
      Suma,
      brAktivnih = 0,
      brNeaktivnih = 0,
      sumaUkupna = 0,
      brojac = 0,
    } = this.state;

    return (
      <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Trenutno aktivnih ugovora</th>
              <th>Trenutno neaktivnih ugovora</th>
            </tr>
          </thead>

          <tbody>
            {
              (((this.state.brAktivnih = 0), (this.state.brNeaktivnih = 0)),
              ugovori.map((ugo) => {
                ugo.Aktivnost == "aktivan"
                  ? (this.state.brAktivnih = this.state.brAktivnih + 1)
                  : (this.state.brNeaktivnih = this.state.brNeaktivnih + 1);
              }))
            }

            <tr>
              <td>{this.state.brAktivnih}</td>
              <td>{this.state.brNeaktivnih}</td>
            </tr>
          </tbody>
        </table>
        {/* <h4 className="mt-4 mb-4">Poslednjih 5 ugovora</h4>
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
                        <NavLink
                          className="btn btn-light btn-outline-primary"
                          to="/ugovor"
                        >
                          <button
                            type="button"
                            className="btn btn-light mr-1"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            // onClick={() =>
                            //   (Ugovor.state.UgovorID = ugo.UgovorID)
                            // }
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
                        </NavLink>
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
        </table> */}
        <h4 className="mt-4 mb-4">Izvestaj prihoda</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Broj ugovora</th>
              <th>Prihod (RSD)</th>
            </tr>
          </thead>

          <tbody>
            {
              ((this.state.sumaUkupna = 0),
              ugovori.map((ugo) => {
                return ugo.Aktivnost == "aktivan"
                  ? ((this.state.sumaUkupna = this.state.sumaUkupna + ugo.Suma),
                    (
                      <tr>
                        <td>{ugo.UgovorID}</td>
                        <td>{ugo.Suma}</td>
                      </tr>
                    ))
                  : null;
              }))
            }

            <tr>
              <td>SUMA</td>
              <td>{this.state.sumaUkupna}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}
