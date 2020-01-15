import React, { Component } from "react";
import { Player } from "../../Models/Model";
import AdminPlayer from "./adminPlayer";
import AdminTournament from "./adminTournament";
import AdminMatches from "./adminMatches";
import { Modal } from "react-bootstrap";
import "./adminHome.css";

interface Props { }
interface IState {
    playersModalIsOpen: boolean,
    tournamentsModalIsOpen: boolean,
    matchesModalIsOpen: boolean
}
const emptyString = "";
class AdminHome extends Component<Props, IState> {
    players!: Player[];
    constructor(props: Props) {
        super(props);
        this.state = {
            playersModalIsOpen: false,
            tournamentsModalIsOpen: false,
            matchesModalIsOpen: false
        };
    }
    render() {
        return (
            <form className="playerAdd-form">
                <div className="row">
                    <div className="col-sm">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Players</h5>
                                <p className="card-text">Click on button and manage players in database.</p>
                                <a onClick={e => this.openPlayersModal(e)} className="btn btn-secondary">Players</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Tournaments</h5>
                                <p className="card-text">Click on button and manage tournaments in database.</p>
                                <a onClick={e => this.openTournamentsModal(e)} className="btn btn-secondary">Tournaments</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Match</h5>
                                <p className="card-text">Click on button and manage matches in database.</p>
                                <a onClick={e => this.openMatchesModal(e)} className="btn btn-secondary">Matches</a>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.playersModalIsOpen}>
                    <div className="btnClose">
                        <button onClick={e => this.closePlayersModal(e)} className="btn btn-danger">Close</button>
                    </div>
                    <AdminPlayer />
                </Modal>
                <Modal show={this.state.tournamentsModalIsOpen}>
                    <div className="btnClose">
                        <button onClick={e => this.closeTournamentsModal(e)} className="btn btn-danger">Close</button>
                    </div>
                    <AdminTournament />
                </Modal>
                <Modal show={this.state.matchesModalIsOpen} className="modal">
                    <div className="btnClose">
                        <button onClick={e => this.closeMatchesModal(e)} className="btn btn-danger">Close</button>
                    </div>
                    <AdminMatches />
                </Modal>
            </form>
        );
    }
    openPlayersModal(e: any): void {
        this.setState({ playersModalIsOpen: true });
    }
    openTournamentsModal(e: any): void {
        this.setState({ tournamentsModalIsOpen: true });
    }
    openMatchesModal(e: any): void {
        this.setState({ matchesModalIsOpen: true });
    }
    closePlayersModal(e: any): void {
        this.setState({ playersModalIsOpen: false });
    }
    closeTournamentsModal(e: any): void {
        this.setState({ tournamentsModalIsOpen: false });
    }
    closeMatchesModal(e: any): void {
        this.setState({ matchesModalIsOpen: false });
    }
}
export default AdminHome;
