import React, { Component } from "react";
import './styles/App.css';
import Button from 'react-bootstrap/Button';


class App extends Component {
  render() {
    return (
      <div className="text">
        {"Welcome to SecondChance"}

        <Button variant="light">Get Started</Button>
      </div>
    );
  }
}

export default App;
