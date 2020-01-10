import React, { Component } from "react";
import { Player } from "../../Models/Model";
import {createPlayerService, getPlayersService} from "../../CassandraServices/player.service";

interface Props {}
interface IState {
  name: string;
  date: string;
  surface: string;
  i:Number;
}
const emptyString = "";
class AdminPlayer extends Component<Props, IState> {
    names!: string[];
  constructor(props: Props) {
    super(props);
    this.state = {
      name: emptyString,
      date: emptyString,
      surface: emptyString,
      i:0
    };
  }
  render() {
    return (
      <form className="tournamentAdd-form">
        <label>Name:</label>
        <input
          type="string"
          value={this.state.name}
          placeholder="Name"
          onChange={e => this.handleChangeTournamentName(e)}
          className="input-name"
        ></input>
        <input
          type="string"
          value={this.state.surname}
          placeholder="Surname"
          onChange={e => this.handleSurname(e)}
          className="input-name"
        ></input>
        <label>Date:</label>
        <input
          type="date"
          value={this.state.date}
          placeholder="Choose date"
          onChange={e => this.handleChangeTournamentDate(e)}
          className="input-date"
        ></input>
        <label>Surface:</label>
        <select name="cars">
            <option value="clay">Clay</option>
            <option value="grass">Grass</option>
            <option value="hard">Hard</option>
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
  async handleChangeTournamentName(e: any): Promise<void> {
    var target=e.target;
    if (this.state.i==0) {
      await this.getData();
      this.setState({i:1});
    }
    let pomocni:string[]=this.names.filter(element=>element===target.value);
    this.setState({ name: target.value });
    if(pomocni.length>0) {
      target.style.backgroundColor='red';
      (document.getElementById("btnAdd") as HTMLInputElement).disabled=true;
    }
    else {
      target.style.backgroundColor='white';
      (document.getElementById("btnAdd") as HTMLInputElement).disabled=false;
    }
  }

  handleChangeTournamentDate(e:any): void {
      this.setState({date:e.target.value});
  }

  async getData() {
    await getTournamentsService().then(res=>this.names=res.map(element=>element.name));
  }

  buttonAddClicked(ev:any) : void {
    ev.preventDefault();
    let tournament = {
        name:this.state.name,
        date:this.state.date,
        surface:this.state.surface
    }
    createTournamentService(tournament as Tournament)
  }
}
export default AdminPlayer;
