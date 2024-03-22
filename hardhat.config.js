require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    Amoy: {
      url: process.env.ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY].filter(Boolean)
    },
  },
};