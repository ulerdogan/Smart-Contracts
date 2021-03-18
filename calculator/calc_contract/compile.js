const path = require("path");
const fs = require("fs");
const solc = require("solc");

const addtPath = path.resolve(__dirname, "contracts", "Addition.sol");

const source = fs.readFileSync(addtPath, "utf8");

module.exports = solc.compile(source, 1).contracts[":Addition"];