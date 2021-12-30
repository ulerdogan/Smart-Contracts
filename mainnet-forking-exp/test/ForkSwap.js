const { expect } = require("chai");
const { ethers } = require("hardhat");
const { waffle } = require("hardhat");
const provider = waffle.provider;

const hre = require("hardhat");
const timer = hre.timeAndMine;


describe("ForkSwap Contract" , function () {
    let Fork;
    let ForkSwap;
    let owner;
    let addr1;

    const abi = [
        // Read-Only Functions
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)",
        "function symbol() view returns (string)",
    
        // Authenticated Functions
        "function transfer(address to, uint amount) returns (bool)",
    
        // Events
        "event Transfer(address indexed from, address indexed to, uint amount)"
    ];
    const address = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const erc20 = new ethers.Contract(address, abi, provider);

    

    beforeEach(async function () {
        Fork = await ethers.getContractFactory("ForkSwap");
        [owner, addr1] = await ethers.getSigners();
    
        // To deploy our contract, we just have to call Token.deploy() and await
        // for it to be deployed(), which happens once its transaction has been
        // mined.
        ForkSwap = await Fork.deploy();
      });

    describe("Mainnet Checks", function () {
        it("Should give the right WETH address", async function () {
            const addressOfWETH = await ForkSwap.giveWETH();
            console.log("WETH: " + addressOfWETH);
            expect(addressOfWETH).to.be.properAddress;
        });

        it("Should give the msg.sender information", async function () {
            const callerAddress = owner.address;
            let callerBalance = await provider.getBalance(callerAddress);
            callerBalance = ethers.utils.formatEther(callerBalance);
            console.log("Address: " + callerAddress + "has " + callerBalance + " ETH");
        });
        it("Gives block timestamp and skip it", async function () {
            let block_number = await provider.getBlockNumber( ); 
            console.log("Block Number: " + block_number);
            let block = await provider.getBlock(block_number);
            let block_timestamp = block.timestamp;
            console.log("Block Timestamp:" + block_timestamp);
            await timer.increaseTime("25 hours");
            console.log("Block Timestamp:" + block_timestamp);
        });
    });

    describe("Swap Checks", function () {
        it("Should make a swap and return amounts", async function () {
            await ForkSwap.swapExactETHForDAI({ value: ethers.utils.parseEther("1") })

            let blnc = await erc20.balanceOf(owner.address);
            console.log(blnc);
        });
    });
});