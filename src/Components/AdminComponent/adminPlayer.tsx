import React, { Component } from "react";
import { Player } from "../../Models/Model";
import { createPlayerService, getPlayersService } from "../../CassandraServices/player.service";

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
        <label>Name:</label>
        <input
          id="playerName"
          type="string"
          value={this.state.name}
          placeholder="Name"
          onChange={e => this.handleChangeName(e)}
          className="input-name"
        ></input>
        <input
          id="playerSurname"
          type="string"
          value={this.state.surname}
          placeholder="Surname"
          onChange={e => this.handleChangeSurname(e)}
          className="input-name"
        ></input>
        <label>Date:</label>
        <input
          id="playerBirth"
          type="date"
          value={this.state.date}
          placeholder="Choose date"
          onChange={e => this.handleChangeDate(e)}
          className="input-date"
        ></input>
        <label>Score:</label>
        <input
          type="number"
          value={this.state.score}
          placeholder="Choose score"
          onChange={e => this.handleChangeScore(e)}
          min="0"
          step="1"
          className="input-score"
        ></input>
        <label>Ranking:</label>
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
        <label>Country:</label>
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
        <div className="buttonAdd">
          <button
            id="btnAdd"
            className="button-add"
            onClick={e => this.buttonAddClicked(e)}
          >
            Add
          </button>
        </div>
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

  buttonAddClicked(ev: any): void {
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
    createPlayerService(player as Player)
  }
}
export default AdminPlayer;
