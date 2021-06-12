import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import web3 from "./web3"
import lottery from "./lottery"

class App extends Component {

  state = {
    manager: "Please, make sure that you are logged in at Rinkeby Network!",
    players: [],
    balance: "",
    value: "",
    message: ""
  };

  /* SAME AS WITH UP
    constructor(props) {
      super(props);
  
      this.state = {manager: "Please, make sure that you are logged in at Rinkeby Network!"};
    }
    */

  async componentDidMount() {                           // we don't need to call from 0 account, MM already logged in  
    const manager = await lottery.methods.manager().call();

    const players = await lottery.methods.getPlayers().call();

    const balance = await web3.eth.getBalance(lottery.options.address);


    this.setState({ manager, players, balance });
  }

  //        event - form submission
  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on trancsaction success..." });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether")
    });

    this.setState({ message: "You have been entered!" });

  };

  onClick = async (event) => {
    const accounts = await web3.eth.getAccounts();

    this.setState({message: "Waiting on transaction success..."});

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({message: "A winner has been picked"});
  };


  render() {
    return (
      <div>
        <h2> Lottery Contract </h2>
        <p>
          This contract is managed by {this.state.manager}<br/>
          There are currently {this.state.players.length} people entered,
          competing to win {web3.utils.fromWei(this.state.balance)} ether!
          </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4> Want to try your luck?</h4>
          <div>
            <label> Amount of ether to enter </label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button> Enter </button>
        </form>
        <hr/>
        <h1>{this.state.message}</h1>
        <hr/>
        <h4> Ready to pick a winner? </h4>
        <button onClick={this.onClick}> Pick a winner! </button>
        <hr/> 
      </div>
    );
  }
}

/* default output
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
export default App;
