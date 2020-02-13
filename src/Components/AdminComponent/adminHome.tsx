import React, { Component } from "react";
import { Player } from "../../Models/Model";
import AdminPlayer from "./adminPlayer";
import AdminTournament from "./adminTournament";
import AdminMatches from "./adminMatches";
import { Modal } from "react-bootstrap";
import "./adminHome.css";
import Userscomp from "../UsersComponent/usersComp";
import TournamentsComp from "../TournamentsComponent/tournamentsComp";


interface Props { }
interface IState {
    playersModalIsOpen: boolean,
    tournamentsModalIsOpen: boolean,
    matchesModalIsOpen: boolean,
    playersRangListModalIsOpen: boolean,
    tournamentsListModalIsOpen: boolean
}
const emptyString = "";
class AdminHome extends Component<Props, IState> {
    players!: Player[];
    constructor(props: Props) {
        super(props);
        this.state = {
            playersModalIsOpen: false,
            tournamentsModalIsOpen: false,
            matchesModalIsOpen: false,
            playersRangListModalIsOpen: false,
            tournamentsListModalIsOpen: false
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
                                <a id="idd" onClick={e => this.openPlayersModal(e)} className="btn btn-secondary btnn">Players</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Tournaments</h5>
                                <p className="card-text">Click on button and manage tournaments in database.</p>
                                <a id="idd" onClick={e => this.openTournamentsModal(e)} className="btn btn-secondary">Tournaments</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Match</h5>
                                <p className="card-text">Click on button and manage matches in database.</p>
                                <a id="idd" onClick={e => this.openMatchesModal(e)} className="btn btn-secondary">Matches</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 mt-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Users rank list</h5>
                                <p className="card-text">Click on button to see Users.</p>
                                <a id="idd" onClick={e => this.openPlayersRangListModal(e)} className="btn btn-secondary">Users rank list</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 mt-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Tournaments list</h5>
                                <p className="card-text">Click on button to see Tournaments.</p>
                                <a id="idd" onClick={e => this.openTournamentsListModal(e)} className="btn btn-secondary">Tournaments list</a>
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
                <Modal show={this.state.playersRangListModalIsOpen} className="modal">
                    <div className="btnClose">
                        <button onClick={e => this.closePlayersRangListModal(e)} className="btn btn-danger">Close</button>
                    </div>
                    <Userscomp />
                </Modal>
                <Modal show={this.state.tournamentsListModalIsOpen} className="modal">
                    <div className="btnClose">
                        <button onClick={e => this.closeTournamentsListModal(e)} className="btn btn-danger">Close</button>
                    </div>
                    <TournamentsComp />
                </Modal>
            </form>
        );
    }

    openTournamentsListModal(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
        this.setState({ tournamentsListModalIsOpen: true });
    }

    openPlayersRangListModal(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
        this.setState({ playersRangListModalIsOpen: true });
    }
    openPlayersModal(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
        this.setState({ playersModalIsOpen: true });
    }
    openTournamentsModal(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
        this.setState({ tournamentsModalIsOpen: true });
    }
    openMatchesModal(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
        this.setState({ matchesModalIsOpen: true });
    }
    closePlayersModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        this.setState({ playersModalIsOpen: false });
    }
    closeTournamentsModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        this.setState({ tournamentsModalIsOpen: false });
    }
    closeMatchesModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        this.setState({ matchesModalIsOpen: false });
    }
    closePlayersRangListModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        this.setState({ playersRangListModalIsOpen: false });
    }
    closeTournamentsListModal(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        this.setState({ tournamentsListModalIsOpen: false });
    }
}
export default AdminHome;
