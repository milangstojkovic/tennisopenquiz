import React, { Component } from "react";
import { Player } from "../../Models/Model";
//import "./playerComp.css"
import { getPlayersService } from "../../CassandraServices/player.service";
interface Props {}
interface IState {
    loading:boolean;
}
const emptyString = "";
class PlayersComp extends Component<Props, IState> {
  players!: Player[];
  constructor(props: Props) {
    super(props);
    this.state = {
        loading:false
    };
    this.getData();
  }
  
  render() {
    if(!this.state.loading)
    return null;
    const playersRender = this.players.map((player, index) =>
    <tr className="user" key={index}>
        <td>{player.ranking}</td>
        <td> {player.name}</td>
        <td>{player.surname}</td>
        <td>{player.country.toUpperCase()}</td>
  <td>{player.score}</td>
    </tr>)
    return (
      <form >
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>No.</th><th>Name</th><th>Surname</th><th>Country</th><th>Score</th>
                </tr>
            </thead>
            <tbody>
                {playersRender}
            </tbody>
        </table>
      </form>
    );
  }
  async getData(): Promise<void> {
    await getPlayersService().then(res=>this.players=res);
    await this.players.sort((player1, player2) => player2.score - player1.score);
    await this.setState({ loading: true });
    this.render();
}
}
export default PlayersComp;
