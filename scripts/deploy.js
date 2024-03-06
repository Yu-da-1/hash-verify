const { ethers } = require("hardhat");

async function main() {
  // デプロイを実行するアカウントの取得
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // コントラクトファクトリの取得とデプロイ
  const HashRegistry = await ethers.getContractFactory("HashRegistry");
  console.log("デプロイ前:", HashRegistry)
  const hashRegistry = await HashRegistry.deploy();

  console.log("デプロイ後", hashRegistry)
  console.log("HashRegistry deployed to:", hashRegistry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});