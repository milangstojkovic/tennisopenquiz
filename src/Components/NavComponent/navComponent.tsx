import React, { Component } from "react";
import './navComponent.css'
import logo from '../../Resources/Logo1Default11.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import Userscomp from "../UsersComponent/usersComp";
import { Modal } from "react-bootstrap";
import TournamentsComp from "../TournamentsComponent/tournamentsComp";
import PlayersComp from "../PlayersComp/playersComp";
interface Props { }
interface IState {
    toursShow:boolean;
    playersShow:boolean;
    usersShow:boolean;
}
const emptyString = "";
class NavComponent extends Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            toursShow:false,
            playersShow:false,
            usersShow:false
        };
    }
    render() {

        return (
            <div className="navbar">
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={e=>this.setState({usersShow:true})}>Users</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={e=>this.setState({playersShow:true})}>Players</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={e=>this.setState({toursShow:true})}>Tournaments</a>
                    </li>
                </ul>
                <ul className="nav">
                    <li id="logo" className="nav-item " onClick={e => this.logOut(e)} >
                        <img className="item" src={logo} title="LOG OUT"></img>
                    </li>
                </ul>
                <Modal show={this.state.usersShow}>
                    <Userscomp/>
                    <button className="btn btn-danger" onClick={e=>this.setState({usersShow:false})}>Close</button>
                </Modal>
                <Modal show={this.state.toursShow}>
                    <TournamentsComp/>
                    <button className="btn btn-danger" onClick={e=>this.setState({toursShow:false})}>Close</button>
                </Modal>
                <Modal show={this.state.playersShow}>
                    <PlayersComp/>
                    <button className="btn btn-danger" onClick={e=>this.setState({playersShow:false})}>Close</button>
                </Modal>
            </div>
        );

    }
    logOut(event: any): void {
        localStorage.removeItem("username");
        window.location.reload();
    }

}

export default NavComponent;
