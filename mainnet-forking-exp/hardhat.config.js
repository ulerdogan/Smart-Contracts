require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers"); 
require("@atixlabs/hardhat-time-n-mine");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/0shd8kcObymm1xEoEHRwjd3OrChgVVkV",
      }
    }
  }

};