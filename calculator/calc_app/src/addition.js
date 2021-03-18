import web3 from "./web3";

const address = "0x53006b5Bd86B72753E5c36b53daf94130f89b1e2";

const abi =
    [{ "constant": true, "inputs": [], "name": "result", "outputs": [{ "name": "", "type": "int256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "x", "type": "int256" }, { "name": "y", "type": "int256" }], "name": "sum", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }]
    ;

export default new web3.eth.Contract(abi, address);