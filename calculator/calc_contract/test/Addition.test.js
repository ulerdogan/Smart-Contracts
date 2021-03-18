const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);

const {interface, bytecode} = require("../compile");

// a variable to keep the ganache test accounts
let accounts;
// a variable to keep the contract deploy data
let addition;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    addition = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode})
        .send({from: accounts[0], gas: "1000000"});
});

// tests
describe("Addition", () => {
    // contract deployement test
    it("contract is deployed", () => {

        assert.ok(addition.options.address);
    });

    // getting sum variable test
    it("can get the result variable", async () => {
        const result = await addition.methods.result().call();
        assert.equal(result, "0");

    });

    // making addition test
    it("can make the calculation", async () => {
        await addition.methods.sum("1", "2").send({from:accounts[0]});

        const result = await addition.methods.result().call();
        assert.equal(result, "3");
        
    });


});