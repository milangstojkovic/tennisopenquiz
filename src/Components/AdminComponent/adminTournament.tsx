import React, { Component } from "react";
import { Tournament } from "../../Models/Model";
import { createTournamentService, getTournamentsService } from "../../CassandraServices/tournament.service";

interface Props { }
interface IState {
  name: string;
  date: string;
  surface: string;
<<<<<<< HEAD
  i: Number;
=======
  password: string;
  email: string;
>>>>>>> b7c516e34462748919b5e7b2d74ba868cb9c3dd1
}
const emptyString = "";
class AdminTournament extends Component<Props, IState> {
  names!: string[];
  constructor(props: Props) {
    super(props);
    this.state = {
      name: emptyString,
      date: emptyString,
<<<<<<< HEAD
      surface: "clay",
      i: 0
=======
      surface: emptyString,
      password:emptyString,
      email:emptyString
>>>>>>> b7c516e34462748919b5e7b2d74ba868cb9c3dd1
    };
  }
  render() {
    return (
      <form className="tournamentAdd-form">
        <table className="table">
          <tr>
            <td>Name:</td>
            <td>
              <input
                type="string"
                value={this.state.name}
                placeholder="Add name of tournament"
                onChange={e => this.handleChangeTournamentName(e)}
                className="input-name"
              ></input>
            </td>
          </tr>
          <tr>
            <td>Date:</td>
            <td>
              <input
                type="date"
                value={this.state.date}
                placeholder="Choose date"
                onChange={e => this.handleChangeTournamentDate(e)}
                className="input-date"
              ></input>
            </td>
          </tr>
          <tr>
            <td>Surface:</td>
            <td>
              <select name="surface" id="surface">
                <option value="clay">Clay</option>
                <option value="grass">Grass</option>
                <option value="hard">Hard</option>
              </select>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div className="buttonAdd">
                <button
                  id="btnAdd"
                  className="btn btn-primary"
                  onClick={e => this.buttonAddClicked(e)}
                >
                  Add tournament
          </button>
              </div>
            </td>
          </tr>
        </table>
      </form>
    );
  }
<<<<<<< HEAD
  async handleChangeTournamentName(e: any): Promise<void> {
    var target = e.target;
    if (this.state.i === 0) {
      await this.getData();
      this.setState({ i: 1 });
    }
    let pomocni: string[] = this.names.filter(element => element === target.value);
    console.log(pomocni)
    console.log(this.names);
    this.setState({ name: target.value });
    if (pomocni.length > 0) {
      target.style.backgroundColor = 'red';
      (document.getElementById("btnAdd") as HTMLInputElement).disabled = true;
    }
    else {
      target.style.backgroundColor = 'white';
      (document.getElementById("btnAdd") as HTMLInputElement).disabled = false;
    }
  }

  handleChangeTournamentDate(e: any): void {
    this.setState({ date: e.target.value });
  }

  async getData() {
    await getTournamentsService().then(res => this.names = res.map(element => element.name));
  }

  buttonAddClicked(ev: any): void {
    ev.preventDefault();
    let tournament = {
      name: this.state.name,
      date: this.state.date,
      surface: this.state.surface
    }
    let select = document.getElementById("surface") as HTMLSelectElement;
    tournament.surface = select.options[select.selectedIndex].value;
    createTournamentService(tournament as Tournament)
=======
  buttonRegisterClicked(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    throw new Error("Method not implemented.");
  }
  handleChangePassword(e: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error("Method not implemented.");
  }
  handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error("Method not implemented.");
  }
  handleChangeTournament(e: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error("Method not implemented.");
>>>>>>> b7c516e34462748919b5e7b2d74ba868cb9c3dd1
  }
}
export default AdminTournament;
