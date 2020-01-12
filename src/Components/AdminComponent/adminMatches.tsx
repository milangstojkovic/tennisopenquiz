import React, { Component } from "react";
import { Tournament, Match, Player } from "../../Models/Model";
import { getTournamentsService } from "../../CassandraServices/tournament.service";
import { getMatchesService, createMatchService } from "../../CassandraServices/match.service";
import Modal from 'react-bootstrap/Modal';
import { getPlayersService } from "../../CassandraServices/player.service";

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
            btnSubmit: true
        };
        this.getData();
    }
    render() {
        if (this.state.loading)
            return null;
        const matchRendering = this.matches.map((match, index) =>
            <tr key={index}>
                <td>{match.tournamentName}</td>
                <td>{match.player1}</td>
                <td>{match.player2}</td>
                <td>{match.date}</td>
                <td><button id={match.id}>Start match</button></td>
            </tr>
        )
        const toursRender = this.tournaments.map((tournament, index) =>
            <div className="btnAdd" key={index}>
                <button
                    id={tournament.name}
                    value={tournament.name}
                    onClick={e => this.handleTourChoose(e)}>
                    <h5>{tournament.name}</h5>
                    <h6>{tournament.surface}</h6>
                </button>
            </div>
        )
        const playersRender = this.players.map((player, index) =>
            <div key={index}>
                <button className="btnPlayers"
                    id={"" + player.ranking}
                    value={player.name + " " + player.surname}
                    onClick={e => this.handlePlayerChoose(e)}>
                    {player.name + " " + player.surname + " (" + player.ranking + ")"}
                </button>
            </div>
        )

        return (
            <form className="matches-form">
                <table id="matches">
                    <tbody>
                        <tr>
                            <th>Tournament name</th>
                            <th>Player 1</th>
                            <th>Player 2</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                        {matchRendering}
                    </tbody>
                </table>
                <div>
                    <button id="addMatch" onClick={e => this.openToursModal(e)} >Add Match</button>
                    <Modal show={this.state.toursModalIsOpen} className="modal">
                        <div className="modal-content">
                            <div className="modal-header">Choose tournament</div>
                            <div id="tours" className="modal-body">
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
                                <button onClick={e => this.clearSelection(e)}>Undo </button>
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
        await this.players.sort((player1, player2) => player1.ranking - player2.ranking);
        await this.setState({ loading: false });
        this.render();
    }
    async handleTourChoose(ev: any): Promise<void> {
        var target=ev.target;
        ev.preventDefault();
        await this.setState({ tournamentName: target.value });
        this.setState({ toursModalIsOpen: false });
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
        this.setState({ dateModalIsOpen: false });
        let match = {
            player1: this.state.player1,
            player2: this.state.player2,
            tournamentName: this.state.tournamentName,
            date: this.state.date
        }
        await createMatchService(match as Match);
    }

    changeDate(e: any): void {
        e.preventDefault();
        this.setState({ date: e.target.value });
        this.setState({ btnSubmit: false });
    }
}
export default AdminMatches;
