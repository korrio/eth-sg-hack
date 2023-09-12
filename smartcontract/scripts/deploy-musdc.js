const { ethers }  = require('hardhat');

async function main() {


    const TEST = await ethers.getContractFactory('CoinbaseUSD');
    const test = await TEST.deploy();
    await test.deployed();
  
    console.log('CoinbaseUSD Deployed to:', test.address);
  setTimeout( () => {
      console.log("============= Verify Contract =============");

  }, 12000)
    // Verify
    await hre.run("verify:verify", {
      address: test.address,
    //     constructorArguments: [USDTTestnet],
      contract: 'contracts/mock/USDCMock.sol:CoinbaseUSD',
    });

  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });