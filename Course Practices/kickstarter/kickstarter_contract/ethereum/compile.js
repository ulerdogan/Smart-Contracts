const path = require("path");
const solc = require("solc");
// upgraded version of previous fs libaries
const fs = require("fs-extra");

// removing build folder if it exists
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");
// gives two output: two different contract
const output = solc.compile(source, 1).contracts;

// create build folder again
fs.ensureDirSync(buildPath);

// output carries compiled two contracts' informations
// we have createed 2 json file for 2 contracts
for (let contract in output) {
    fs.outputJsonSync(                      // for beautiful looking
        path.resolve(buildPath, contract.replace(":", "") + ".json"),
        output[contract]
    );
}