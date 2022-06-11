import React, { Component } from "react";
import './styles/App.css';
import Button from 'react-bootstrap/Button';
import Deso from 'deso-protocol';

class App extends Component {
  login = async () => {
    const deso = new Deso();
    const request = 3;
    const response = await deso.identity.login(request);
  }

  render() {
    return (
      <div className="main">
        <div className="headerbuttons">
          <div className="tbutt"><Button variant="outline-secondary" onClick={this.login}>Login</Button></div>
        </div>

        
      </div>
    );
  }
}

export default App;
