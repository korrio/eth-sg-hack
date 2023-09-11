const { ethers }  = require('hardhat');

async function main() {


    const FMaster = await ethers.getContractFactory('fairMaster');
    const fmaster = await FMaster.deploy();
    await fmaster.deployed();
  
    console.log('FairMaster Deployed to:', fmaster.address);
  setTimeout( () => {
      console.log("============= Verify Contract =============");

  }, 10000)
    // Verify
    await hre.run("verify:verify", {
      address: fmaster.address,
      //constructorArguments: [profitToken],
      contract: 'contracts/fairMaster.sol:fairMaster',
    });

  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });