import React, { Component } from "react";
import './styles/App.css';
import Button from 'react-bootstrap/Button';
import Deso from 'deso-protocol';

class App extends Component {
  constructor(props) {
    super(props);

    // getInitialState
    this.state = {
      login: false
    }
  }

  login = async () => {
    const deso = new Deso();
    const request = 3;
    const response = await deso.identity.login(request);

    this.setState({
      login: true
    })
  }

  render() {
    if(this.state.login) {
      return (
        <div className="main">
          <div className="headerbuttons">
            <div className="tbutt"><Button variant="outline-secondary" onClick={this.login}>Login</Button></div>
          </div>

          <div className="main">
            {"pp"}
          </div>
        </div>
      );
    } else {
      return (
        <div className="main">
          <div className="headerbuttons">
            <div className="tbutt"><Button variant="outline-secondary" onClick={this.login}>Login</Button></div>
          </div>

          <div className="main">
            login dummy
          </div>
        </div>
      );
    }

  }
}

export default App;
