// we have connected some needed packages
const path = require("path");
const fs = require("fs");
// added the solidity compiler
const solc = require('solc');

// then have connected the contracts path
const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
// we will read the content of the contract
//                             path      encoding
const source = fs.readFileSync(inboxPath, "utf8");

// compile statement for the compiler and making it accesible by other elements 
//                                  (We care about only Inbox part of the output)
//                        src code    1 is no. of contracts that will be compiled
module.exports = solc.compile(source, 1).contracts[":Inbox"];
