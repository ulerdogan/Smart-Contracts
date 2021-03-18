const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require("../compile");


let lottery;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: "1000000" })
});

describe("Lottery Contract", () => {
    // deploying test
    it("deploys a contract", () => {
        assert.ok(lottery.options.address);
    });

    // entering test
    it("allows one account to enter", async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            // a function that makes convertions btw Wei and Eth
            value: web3.utils.toWei("0.02", "ether")
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    // fork of upper test, which
    it("allows multiple account to enter", async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            // a function that makes convertions btw Wei and Eth
            value: web3.utils.toWei("0.02", "ether")
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            // a function that makes convertions btw Wei and Eth
            value: web3.utils.toWei("0.02", "ether")
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            // a function that makes convertions btw Wei and Eth
            value: web3.utils.toWei("0.02", "ether")
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });

    it("requires a minimum amount of ether to enter", async () => {
        // try catch statement to get the error
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0
            });
            assert(false);
        } catch (err) {
            // asserts that some value is passed into this function
            assert.ok(err);
        }
    });

    it("only manager can call pickWinner", async () => {
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
            // it means if we get to this line of code automatically fail the test is no matter
            assert(false);
        } catch (err) {
            assert(err);

        }

    });

    it("sends money to the winner and resets the players array", async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei("2", "ether")
        });

        const initialBalance = await web3.eth.getBalance(accounts[0]);
        await lottery.methods.pickWinner().send({ from: accounts[0] });
        const finalBalance = await web3.eth.getBalance(accounts[0]);
        // the account will also spend some Eth's for gas, so we can't assume that the difference is 2. it is slightly less then 2.
        const difference = finalBalance - initialBalance;

        assert(difference > web3.utils.toWei("1.8", "ether"));
    });

});