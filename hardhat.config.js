require("@nomicfoundation/hardhat-ethers");
//require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4",
  networks: {
    // ネットワーク設定（ローカル環境やテストネットなど）
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
      // Hardhat ネットワークの設定
    },
    // 他のネットワーク設定...
  },
  // その他の設定...
};
