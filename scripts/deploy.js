async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    const HashRegistry = await ethers.getContractFactory("HashRegistry");
    const hashRegistry = await HashRegistry.deploy();
    console.log("Deployed address:", hashRegistry.address);
   }
   main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });