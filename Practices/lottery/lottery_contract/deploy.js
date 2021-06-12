// requiring wallet provider
const HDWalletProvider = require('truffle-hdwallet-provider');

const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

// setting wallet
const provider = new HDWalletProvider(
    // metamask account mnemonic   
    "MNEMONIC",
    // api key from infura
    "INFURA_API_KEY"

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
    const result = await new web3.eth.Contract(JSON.parse(interface))
        // 0x added instead of previous versions
        .deploy({ data: '0x' + bytecode })
        // gas info removed
        //.send({ gas: "1000000", from: accounts[0] });
        .send({ from: accounts[0] });

    
    console.log(interface);

    console.log('Contract deployed to', result.options.address);
};

deploy();
