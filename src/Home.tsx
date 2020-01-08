import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav} from 'react-bootstrap';
import Register from './Components/register.component';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      
      <header className="App-header">
      <BrowserRouter>
      <Nav fill variant="tabs">
        <Nav.Item>
          Log in
        </Nav.Item>
        <Nav.Item>
        <Link to="/register">Register</Link>
        </Nav.Item>
      </Nav>
      
        <Switch>
          <Route path="/register" component={Register}/>
        </Switch>
    </BrowserRouter>
      <img src={require('./Resources/Logo1default.png')} className="App-logo" alt="logo"/>
      </header>
    </div>
  );
}

export default Home;
