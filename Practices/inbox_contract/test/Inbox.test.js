// assert is a libary to make test assertions
const assert = require("assert");
// will serve our testnet locally
const ganache = require("ganache-cli");
// caution: W is uppercase: constructor funtion, creates instances of web3 library
const Web3 = require("web3");

// these two lines edited after
const provider = ganache.provider();
const web3 = new Web3(provider);

// caution: w is lowercase: instance of constructor, creeates an instance and connect to local -ganache- testnet
// we have deleted it by adding ups
// const web3 = new Web3(ganache.provider());

// added after test tries; getting bytecode info's from compile file
const { interface, bytecode } = require("../compile");


/* a way to list ganache accounts, deleted for be written in async/await str

beforeEach(() => {
    // Get a list of all accounts
    //web3.eth.getAccounts()
        //.then(fetchedAccounts => {
        //    console.log(fetchedAccounts);
        //});

    // Use one of those accounts to deploty the contract
});

// a test about checking the accounts 
describe("Inbox", () => {
    it("deploys a contract", () => {
    });
});
*/


// defined the variable to provide global access
let accounts;
// defined the variable to provide global access, it carries all deploy data
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    // capital 'C'ontract means an instance of the contract
    //            teaches web3 about what methods an Inbox contract has. json parse interface is ABI
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        // tells web3 that we want to deploy a new copy of this contract
        //                                     it is the inital msg about our contract
        .deploy({ data: bytecode, arguments: ["Hi there!"] })
        // instructs web3 to send out transaction
        //  set the chosen account and gas amount
        .send({ from: accounts[0], gas: "1000000" });
});


// a test about checking the accounts 
describe("Inbox", () => {
    it("deploys a contract", () => {
        // prints the contract data
        //console.log(inbox);
        // options.address gives the address of the contract was deployed to. assert.ok verifies the existence 
        assert.ok(inbox.options.address);
    });

    // async beacuse we sill wait until get the message
    it("has a default message", async () => {
        // methods object carries all of the public functions of the contract. we are calling message
        // inside of message could carry the function arguements
        // call function could carry gas payer of the function
        const message = await inbox.methods.message().call();
        // we are comparing the message with which we set first
        assert.equal(message, "Hi there!");
    });

    // now we will call a function
    it("can change the message", async () => {
        // bye is the arguement which functions get, and inside of send is the gas payer
        // we will wait until ends
        await inbox.methods.setMessage("bye").send({ from: accounts[0] });
        // making a comparation again
        const message = await inbox.methods.message().call();
        assert.equal(message, "bye");
    });
});



/*  A MOCHA TEST APPLICATION BLOCK HAS COMMENTED

// defined a class to try tests
class Car {
    park() {
        return "stopped";
    }

    drive() {
        return "vroom";
    }
}

// beforeEach carries the statements which will be runned before every it statement
// we take variable declaration out  of the statement to make it accesible from the other statements
let car;
beforeEach(() => {
    car = new Car();
});

// describe is grouping together the sets of statements
describe("Car Class", () => {
    // can park is the expected test return if it pass
    it("can park", () => {
        //DON'T NEEDED MORE, BECAUSE WE USE BEFOREEACH
        // // defining an instance of Car class
        //const car = new Car();
        // comparing park function with expected return, if equal returns PASS, not FAIL
        assert.equal(car.park(), "stopped");
    })

    it("can drive", () => {
        //const car = new Car();
        assert.equal(car.drive(), "vroom")
    })
});
*/