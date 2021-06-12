//FORKED FROM PREVIOS EXAMPLES

// requiring wallet provider
const HDWalletProvider = require('truffle-hdwallet-provider');

const Web3 = require('web3');

const compiledFactory = require("./build/CampaignFactory.json");

// setting wallet
const provider = new HDWalletProvider(
    // metamask account mnemonic   
    "__MNEMONIC",
    // api key from infura
    "__INFURA_API_kEY___"

);

// we will use this instance to connect with net
const web3 = new Web3(provider);

// delpoying the contract
const deploy = async () => {
    //getting accounts from the mnemonic
    const accounts = await web3.eth.getAccounts();
    // listing the accounts from the mnemonic
    console.log("Attempting to deploy from account", accounts[0]);

    // we are assigning to a variable to learn the deployed address
    // making a new contract                        it is ABI
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        // 0x added instead of previous versions
        .deploy({ data: compiledFactory.bytecode })
        // gas info removed
        .send({ gas: "1000000", from: accounts[0] });
        //.send({ from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
};

deploy();