import React, { Component } from "react";
import './navComponent.css'
import logo from '../../Resources/Logo1default.png'
interface Props { }
interface IState {
}
const emptyString = "";
class NavComponent extends Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div className="navbar">
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Matches</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Players</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Tournaments</a>
                    </li>
                </ul>
                <ul className="nav">
                    <li id="logo" className="nav-item">
                        <img className="item" src={logo}></img>
                    </li>
                </ul>
            </div>
        );

    }
}

export default NavComponent;
