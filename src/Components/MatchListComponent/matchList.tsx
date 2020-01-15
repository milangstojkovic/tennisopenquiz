import React, { Component } from "react";
import { Match } from "../../Models/Model";
import { getMatchesService } from "../../CassandraServices/match.service";
interface Props { }
interface IState {
    loading: boolean;
}
class MatchList extends Component<Props, IState> {
    matches!: Match[];
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true
        };
        this.getData();
    }
    render() {
        if (this.state.loading)
            return null;
        const matchRendering = this.matches.map((match, index) =>
            <tr key={index}>
                <th scope="row">{index}</th>
                <td>{match.tournamentName}</td>
                <td>{match.player1}</td>
                <td>{match.player2}</td>
                <td>{match.date}</td>
                <td><button className="btn btn-secondary" disabled={this.quizStarted(match.date)} id={match.id}>Start match</button></td>
            </tr>
        )
        return (
            <form className="matches-form">
                <table className="table table-hover" id="matches">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tournament name</th>
                            <th scope="col">Player 1</th>
                            <th scope="col">Player 2</th>
                            <th scope="col">Date</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {matchRendering}
                    </tbody>
                </table>
            </form>
        )
    }
    async getData(): Promise<void> {
        await getMatchesService().then(res => this.matches = res);
        await this.setState({ loading: false });
        this.render();
    }

    quizStarted(date: string): boolean {
        if(Date.parse(date)<Date.now())
            return false;
        else 
            return true;
    }
}
export default MatchList;