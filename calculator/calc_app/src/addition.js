import web3 from "./web3";

const address = "0x7e7032ed3b498B085957C2526EF30D137AA338A3";

const abi =
    [{ "constant": false, "inputs": [{ "name": "x", "type": "int256" }, { "name": "y", "type": "int256" }], "name": "product", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "x", "type": "int256" }, { "name": "y", "type": "int256" }], "name": "sum", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "results", "outputs": [{ "name": "", "type": "int256" }], "payable": false, "stateMutability": "view", "type": "function" }]
    ;

export default new web3.eth.Contract(abi, address);