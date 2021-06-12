const Token = artifacts.require("MyToken");

const chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require('dotenv').config({path: '../.env'});

contract("Token Test", function(accounts) {
// rest of the code...
    it("All tokens should be in my account", async () => {
// rest of the code...
    return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);

    });
    it("I can send tokens from Account 1 to Account 2", async () => {
// rest of the code...
    return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });

    it("It's not possible to send more tokens than account 1 has", async () => {

    return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
    });
});