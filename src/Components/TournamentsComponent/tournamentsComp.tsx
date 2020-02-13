import React, { Component, useReducer } from "react";
import { getUsersService } from "../../CassandraServices/user.service";
import {getTournamentsService} from "../../CassandraServices/tournament.service"
import { Tournament } from "../../Models/Model";
import "./tournamentsComp.css"
interface Props {}
interface IState {
    loading:boolean;
}
const emptyString = "";
class TournamentsComp extends Component<Props, IState> {
  tournaments!: Tournament[];
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
    const tournamentsRender = this.tournaments.map((tournament, index) =>
    <tr className="tournament" key={index}>
        <td>{index+1}</td>
        <td> {tournament.name}</td>
        <td>{tournament.date.substring(0, 10)}</td>
    </tr>)
    return (
      <form >
        <table className="table">
            <thead>
                <tr>
                    <th>No.</th><th>Name</th><th>Date</th>
                </tr>
            </thead>
            <tbody>
                {tournamentsRender}
            </tbody>
        </table>
      </form>
    );
  }
  async getData(): Promise<void> {
    await getTournamentsService().then(res=>this.tournaments=res);
    await this.tournaments.sort((tournament1, tournament2) => parseInt(tournament1.name) - parseInt(tournament2.name));
    await this.setState({ loading: true });
    this.render();
}
}
export default TournamentsComp;
