import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavComponent from "./Components/NavComponent/navComponent";
import ClientMatch from "./Components/ClientMatchComponent/clientMatch";
import QuestionAnswers from "./Components/QuestionsComponent/questionAnswers";
import Questions from "./Components/QuestionsComponent/questions";
import Login from "./Components/LoginComponent/login";
import AdminHome from "./Components/AdminComponent/adminHome";
import MatchList from "./Components/MatchListComponent/matchList";
import Home from "./Components/HomeComponent/home";

export type Props = {};
interface IState {
  nmbr: number;
  nick: string;
  message: string;
  messages: string[];
  hubConnection: any;
}
class App extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      nmbr: 2,
      nick: "",
      message: "",
      messages: [],
      hubConnection: null
    };
  }

  clickedButtonCancel(ev: any) {
    this.setState({ nmbr: 10 });
  }
  render() {
    if(localStorage.getItem("username")=="admin")
    return (
      <div className="body">
      <div className="header">
           <NavComponent />
         </div>
         <div className="container">
           <AdminHome/>
           </div>
           </div>
    )
    else if(localStorage.getItem("username"))
    return (
      <div className="body">
      <div className="header">
           <NavComponent />
         </div>
         <div className="container">
           <MatchList/>
           </div>
           </div>
    )
    else
    return (
      <div className="body">
      <div className="header">
           <NavComponent />
         </div>
         <div className="container">
           <Home/>
           </div>
           </div>
    );
    // return(
    //   <div className="body">
    //   <div className="header">
    //        <NavComponent />
    //      </div>
    //      <div className="container">
    //        <Userscomp/>
    //        </div>
    //        </div>
    // )
  }
}

export default App;
