import React, { Component } from "react";
import './App.css';
import web3 from "./web3"
import addition from "./addition";

class App extends Component {

  state = {
    result: "Click the button, and make sure that you are logged in at Rinkeby Network. Then, wait until load fully!",
    valueOneAdd: "",
    valueOneMult: "",
    valueTwoAdd: "",
    valueTwoMult: "",
    messageAdd: "",
    messageMult: ""
  };

  // checking the the last result
  Check = async (event) => {
    const accounts = await web3.eth.getAccounts();
    const result = await addition.methods.results(accounts[0]).call();
    this.setState({ result });
  };

  calcAddSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({ valueOneMult: "", valueTwoMult: "", messageAdd: "Waiting for the transaction...",messageMult: ""  });

    await addition.methods.sum(this.state.valueOneAdd, this.state.valueTwoAdd).send({
      from: accounts[0]
    });

    this.setState({ messageAdd: "Transaction completed." });
  };

  calcMultSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({ valueOneAdd: "", valueTwoAdd: "", messageAdd: "" , messageMult: "Waiting for the transaction..." });

    await addition.methods.product(this.state.valueOneMult, this.state.valueTwoMult).send({
      from: accounts[0]
    });

    this.setState({ messageMult: "Transaction completed." });
  };

  render() {
    return (
      <div className="main-div">
        <h1> The Most Expensive Calculator of the World: Ethereum! </h1>
        <hr />

        <p> Enter two values, and get the sum or product of them from EVM... </p>
        <br />

        <form onSubmit={this.calcAddSubmit}>
          <input
            value={this.state.valueOneAdd}
            onChange={event => this.setState({ valueOneAdd: event.target.value })}
          />
          <input
            value={this.state.valueTwoAdd}
            onChange={event => this.setState({ valueTwoAdd: event.target.value })}
          />
          <button> ADD </button>
          <p> {this.state.messageAdd} </p>
        </form>
        <br/>
        <form onSubmit={this.calcMultSubmit}>
          <input
            value={this.state.valueOneMult}
            onChange={event => this.setState({ valueOneMult: event.target.value })}
          />
          <input
            value={this.state.valueTwoMult}
            onChange={event => this.setState({ valueTwoMult: event.target.value })}
          />
          <button> MULTIPLY </button>
          <p> {this.state.messageMult} </p>
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
