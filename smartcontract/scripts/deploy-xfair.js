const { ethers }  = require('hardhat');

async function main() {

   const profitToken = '0x48a37bFb684D39d2878c220951a2EF9545041164'

    const xFair = await ethers.getContractFactory('xFair');
    const xfair = await xFair.deploy(profitToken);
    await xfair.deployed();
  
    console.log('xFair Deployed to:', xfair.address);
  setTimeout( () => {
      console.log("============= Verify Contract =============");

  }, 10000)
    // Verify
    await hre.run("verify:verify", {
      address: xfair.address,
      constructorArguments: [profitToken],
      contract: 'contracts/xFair.sol:xFair',
    });

  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });