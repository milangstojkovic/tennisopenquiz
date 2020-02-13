import React, { Component } from "react";
import { Player } from "../../Models/Model";
import { createPlayerService, getPlayersService } from "../../CassandraServices/player.service";
import './adminPlayer.css';

interface Props { }
interface IState {
  name: string;
  surname: string;
  date: string;
  score: number;
  ranking: number;
  country: string;
  i: Number;
}
const emptyString = "";
class AdminPlayer extends Component<Props, IState> {
  players!: Player[];
  constructor(props: Props) {
    super(props);
    this.state = {
      name: emptyString,
      surname: emptyString,
      date: emptyString,
      country: "serbia",
      score: 0,
      ranking: 1,
      i: 0
    };
  }
  render() {
    return (
      <form className="playerAdd-form">
        <table className="table">
          <tr>
            <td>Name:</td>
            <td>
              <input
                id="playerName"
                type="string"
                value={this.state.name}
                placeholder="Name"
                onChange={e => this.handleChangeName(e)}
                className="input-name"
              ></input>
            </td>
          </tr>
          <tr>
            <td>Surname:</td>
            <td>
              <input
                id="playerSurname"
                type="string"
                value={this.state.surname}
                placeholder="Surname"
                onChange={e => this.handleChangeSurname(e)}
                className="input-name"
              ></input>
            </td>
          </tr>
          <tr>
            <td>Date:</td>
            <td>
              <input
                id="playerBirth"
                type="date"
                value={this.state.date}
                placeholder="Choose date"
                onChange={e => this.handleChangeDate(e)}
                className="input-date"
              ></input>
            </td>
          </tr>
          <tr>
            <td>Score:</td>
            <td>
              <input
                type="number"
                value={this.state.score}
                placeholder="Choose score"
                onChange={e => this.handleChangeScore(e)}
                min="0"
                step="1"
                className="input-score"
              ></input>
            </td>
          </tr>
          <tr>
            <td>Ranking:</td>
            <td>
              <input
                type="number"
                value={this.state.ranking}
                placeholder="Choose ranking"
                onChange={e => this.handleChangeRanking(e)}
                min="1"
                step="1"
                max="300"
                className="input-ranking"
              ></input>
            </td>
          </tr>
          <tr>
            <td>Country:</td>
            <td>
              <select name="Country" id="selectCountry">
                <option value="serbia">Serbia</option>
                <option value="switzerland">Switzerland</option>
                <option value="spain">Spain</option>
                <option value="russia">Russia</option>
                <option value="greece">Greece</option>
                <option value="austria">Austria</option>
                <option value="germany">Germany</option>
                <option value="italy">Italy</option>
                <option value="france">France</option>
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
                  Add Player
          </button>
              </div>
            </td>
          </tr>
        </table>
      </form>
    );
  }
  async handleChangeName(e: any): Promise<void> {
    var target = e.target;
    this.setState({ name: target.value });
    if (this.state.i === 0) {
      await this.getData();
      this.setState({ i: 1 });
    }
  }

  async handleChangeDate(e: any): Promise<void> {
    var target = e.target;
    this.setState({ date: target.value });
    if (this.state.i === 0) {
      await this.getData();
      this.setState({ i: 1 });
    }
  }

  async handleChangeSurname(e: any): Promise<void> {
    var target = e.target;
    this.setState({ surname: target.value });
    if (this.state.i === 0) {
      await this.getData();
      this.setState({ i: 1 });
    }
  }

  handleChangeScore(e: any): void {
    this.setState({ score: +e.target.value })
  }

  async handleChangeRanking(e: any): Promise<void> {
    var target = e.target;
    if (this.state.i === 0) {
      await this.getData();
      this.setState({ i: 1 });
    }
    await this.setState({ ranking: +target.value });

    let pomocni: Player[] = this.players.filter(element => element.ranking === this.state.ranking);
    if (pomocni.length > 0) {
      target.style.backgroundColor = 'red';
      (document.getElementById("btnAdd") as HTMLInputElement).disabled = true;
    }
    else {
      target.style.backgroundColor = 'white';
      (document.getElementById("btnAdd") as HTMLInputElement).disabled = false;
    }
  }

  async getData() {
    await getPlayersService().then(res => this.players = res);
  }

  async buttonAddClicked(ev: any): Promise<void> {
    ev.preventDefault();
    var player = {
      name: this.state.name,
      surname: this.state.surname,
      birthdate: this.state.date,
      country: this.state.country,
      ranking: this.state.ranking,
      score: this.state.score
    }
    let select = document.getElementById("selectCountry") as HTMLSelectElement;
    player.country = select.options[select.selectedIndex].value;
    console.log(player);
    await createPlayerService(player as Player)
    window.location.reload();
  }
}
export default AdminPlayer;
