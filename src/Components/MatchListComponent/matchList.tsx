import React, { Component } from "react";
import { Match } from "../../Models/Model";
import { getMatchesService } from "../../CassandraServices/match.service";
import "./matchList.css";
import ClientMatch from "../ClientMatchComponent/clientMatch";
interface Props { }
interface IState {
    loading: boolean;
    redirect: boolean;
    matchid: string;
}
class MatchList extends Component<Props, IState> {
    matches!: Match[];
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true,
            redirect: false,
            matchid: ""
        };
        this.getData();
    }
    render() {
        if (this.state.loading)
            return null;
        if (this.state.redirect)
            return (
                <ClientMatch
                matchid={this.state.matchid}
                />
               
            )
        const matchRendering = this.matches.map((match, index) =>
            <tr className="trMatches" key={index}>
                <th scope="row" className="trMatches">{index}</th>
                <td>{match.tournamentName}</td>
                <td>{match.player1}</td>
                <td>{match.player2}</td>
                <td>{match.date}</td>
                <td><button className="btn btn-secondary" disabled={this.quizStarted(match.date)} onClick={e=>this.enterMatch(e)} id={match.matchid}>{this.matchFinished(match.isFinished)}</button></td>
            </tr>
        )
        return (
            <form className="matches-form">
                <table className="table table-hover">
                    <thead>
                        <tr className="trMatches">
                            <th scope="col" className="trMatches">#</th>
                            <th scope="col" className="trMatches">Tournament name</th>
                            <th scope="col" className="trMatches">Player 1</th>
                            <th scope="col" className="trMatches">Player 2</th>
                            <th scope="col" className="trMatches">Date</th>
                            <th scope="col" className="trMatches"></th>
                        </tr>
                    </thead>
                    <tbody id="matches">
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

    matchFinished(finished: boolean): string {
        if(finished)
            return "Statistics";
        else
            return "Start match";
    }

    async enterMatch(event: any): Promise <void> {
        var target= event.target;
        await console.log(target.id);
        await this.setState({matchid: target.id});
        console.log(this.state.matchid);
        this.setState({redirect: true});
    }
}
export default MatchList;