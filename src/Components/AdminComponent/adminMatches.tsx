import React, { Component } from "react";
import { Tournament, Match, Player } from "../../Models/Model";
import { getTournamentsService } from "../../CassandraServices/tournament.service";
import { getMatchesService, createMatchService } from "../../CassandraServices/match.service";
import Modal from 'react-bootstrap/Modal';
import { getPlayersService } from "../../CassandraServices/player.service";
import "./adminMatches.css";
import AdminStatistic from "../AdminStatistic/adminStatistic";

interface Props { }
interface IState {
    tournamentName: string;
    date: string;
    player1: string;
    player2: string;
    player1Id: number;
    player2Id: number;
    loading: boolean;
    toursModalIsOpen: boolean;
    playersModalIsOpen: boolean;
    dateModalIsOpen: boolean;
    btnSubmit: boolean;
    redirect: boolean;
    matchid: string;
}
const emptyString = "";
class AdminMatches extends Component<Props, IState> {
    tournaments!: Tournament[];
    matches!: Match[];
    players!: Player[];
    constructor(props: Props) {
        super(props);
        this.state = {
            tournamentName: emptyString,
            date: emptyString,
            player1: emptyString,
            player2: emptyString,
            loading: true,
            toursModalIsOpen: false,
            playersModalIsOpen: false,
            dateModalIsOpen: false,
            player1Id: 0,
            player2Id: 0,
            btnSubmit: true,
            redirect: false,
            matchid: ""
        };
        this.getData();
    }
    render() {
        if (this.state.loading)
            return null;
        if(this.state.redirect)
            return (
                <AdminStatistic
                matchid={this.state.matchid}
                />
            )
        const matchRendering = this.matches.map((match, index) =>
            <tr key={index}>
                <th scope="row">{index}</th>
                <td>{match.tournamentName}</td>
                <td>{match.player1}</td>
                <td>{match.player2}</td>
                <td>{match.date}</td>
                <td><button className="btn btn-secondary" onClick={e=>this.startMatch(e)} id={match.matchid}>Start match</button></td>
            </tr>
        )
        const toursRender = this.tournaments.map((tournament, index) =>
            <div className="col" key={index}>
                <button
                    className={this.buttonColor(tournament.surface)}
                    value={""+tournament.name}
                    onClick={e => this.handleTourChoose(e, tournament.name)}>
                    <h5>{tournament.name}</h5>
                    <h6>{tournament.surface}</h6>
                </button>
            </div>
        )
        const playersRender = this.players.map((player, index) =>
            <div className="player" key={index}>
                <button className="btn btn-outline-info"
                    id={"" + player.ranking}
                    value={player.name + " " + player.surname}
                    onClick={e => this.handlePlayerChoose(e)}>
                    {player.name + " " + player.surname + " (" + player.ranking + ")"}
                </button>
            </div>
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
                <div>
                    <button id="addMatch" className="btn btn-primary" onClick={e => this.openToursModal(e)} >Add Match</button>
                    <Modal show={this.state.toursModalIsOpen} className="modal">
                        <div className="modal-content">
                            <div className="modal-header">Choose tournament</div>
                            <div id="tours" className="row">
                                {toursRender}
                            </div>
                        </div>
                    </Modal>
                    <Modal show={this.state.playersModalIsOpen} className="modal">
                        <div className="modal-content">
                            <div id="playersModal" className="modal-header">Choose players</div>
                            <div id="tours" className="modal-body">
                                {playersRender}
                            </div>
                            <div id="chosen players">
                                <label id="players">Player1: {this.state.player1}</label>
                            </div>
                            <div id="undoBtn">
                                <button className="btn btn-light" onClick={e => this.clearSelection(e)}>Undo </button>
                            </div>
                        </div>
                    </Modal>
                    <Modal show={this.state.dateModalIsOpen} className="modal">
                        <div className="modal-content">
                            <div id="playersModal" className="modal-header">Choose date</div>
                            <div id="tours" className="modal-body">
                                <input type="datetime-local" placeholder="Choose date" value={this.state.date} onChange={e => this.changeDate(e)}></input>
                            </div>
                            <button id="submitDate" disabled={this.state.btnSubmit} onClick={e => this.createMatch(e)}>Create Match</button>
                        </div>
                    </Modal>
                </div>
            </form>
        );
    }
    async getData(): Promise<void> {
        await getTournamentsService().then(res => this.tournaments = res);
        await getMatchesService().then(res => this.matches = res);
        await getPlayersService().then(res => this.players = res);
        console.log(this.tournaments);
        await this.players.sort((player1, player2) => player1.ranking - player2.ranking);
        await this.setState({ loading: false });
        this.render();
    }
    async handleTourChoose(ev:any, name:string): Promise<void> {
        ev.preventDefault();
        await this.setState({ tournamentName: name });
        console.log(this.state.tournamentName);
        this.setState({ playersModalIsOpen: true });
    }
    openToursModal(e: any): void {
        e.preventDefault();
        this.setState({ toursModalIsOpen: true });
    }
    async handlePlayerChoose(e: any): Promise<void> {
        var target = e.target;
        e.preventDefault();
        if (this.state.player1 === emptyString) {
            await this.setState({ player1: target.value });
            this.setState({ player1Id: target.id });
            target.disabled = true;
        }
        else {
            await this.setState({ player2: target.value });
            this.openDateModal(target);
        }
    }

    openDateModal(e: any): void {
        this.setState({ dateModalIsOpen: true });
        this.setState({ playersModalIsOpen: false });
    }

    clearSelection(e: any): void {
        e.preventDefault();
        this.setState({ player1: emptyString });
    }

    async createMatch(e: any): Promise<void> {
        e.preventDefault();
        let match = {
            player1: this.state.player1,
            player2: this.state.player2,
            tournamentName: this.state.tournamentName,
            date: this.state.date
        }
        console.log(match.tournamentName);
        await this.setState({ dateModalIsOpen: false });
        await createMatchService(match as Match);
    }

    changeDate(e: any): void {
        e.preventDefault();
        this.setState({ date: e.target.value });
        this.setState({ btnSubmit: false });
    }

    buttonColor(e: string): string {
        if (e === "clay")
            return "btn btn-outline-warning";
        else if (e === "grass")
            return "btn btn-outline-success";
        else
            return "btn btn-outline-primary";
    }
    
    async startMatch(event: any): Promise<void> {
        let target=event.target;
        await this.setState({matchid:target.id});
        await this.setState({redirect: true});
        this.render();
    }
}
export default AdminMatches;
