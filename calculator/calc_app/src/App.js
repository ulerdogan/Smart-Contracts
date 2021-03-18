import React, { Component } from "react";
import './App.css';
import web3 from "./web3"
import addition from "./addition";

class App extends Component {

  state = {
    result: "Click the button, and make sure that you are logged in at Rinkeby Network. Then, wait until load fully!",
    valueOne: "",
    valueTwo: "",
    message: ""
  };

  // checking the the last result
  Check = async (event) => {
    const result = await addition.methods.result().call();
    this.setState({ result });
  };

  calcSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting for the transaction..." });

    await addition.methods.sum(this.state.valueOne, this.state.valueTwo).send({
      from: accounts[0]
    });

    this.setState({ message: "Transaction completed." });
  };

  render() {
    return (
      <div className="main-div">
        <h1> The Most Expensive Calculator of the World: Ethereum! </h1>
        <hr />

        <p> Enter two values, and get the sum of them from EVM... </p>
        <br />

        <form onSubmit={this.calcSubmit}>
          <input
            value={this.state.valueOne}
            onChange={event => this.setState({ valueOne: event.target.value })}
          />
          <input
            value={this.state.valueTwo}
            onChange={event => this.setState({ valueTwo: event.target.value })}
          />
          <button> CALC </button>
          <p> {this.state.message} </p>
        </form>
        <hr />
        <h4> The last result is: {this.state.result} </h4>
        <button onClick={this.Check}> GET THE RESULT! </button>
        <p className="by"><em>by @ulerdogan</em></p>
      </div>
    );
  }
}

export default App;
