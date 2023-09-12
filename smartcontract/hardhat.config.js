require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
require('solidity-coverage');
require('@nomiclabs/hardhat-etherscan');
require('hardhat-spdx-license-identifier');
require('hardhat-gas-reporter');
require('hardhat-abi-exporter');
dotenv =require('dotenv');
require("ethers");

const { removeConsoleLog } = require('hardhat-preprocessor');

dotenv.config();

task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.16"
      },
      {
        version: "0.6.12"
      },
      {
        version: "0.8.10"
      },
      {
        version: "0.8.4"
      }
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 1
      }
     }
  },
  abiExporter: {
    path: './abi',
    clear: false,
    flat: true
  },
  defaultNetwork: 'hardhat',
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545'
    },
    hardhat: {
      initialBaseFeePerGas: 0
    },
    testnet: {
      url: 'https://bsc-testnet.publicnode.com',
      chainId: 97,
      gasPrice: 20*1e9,
      gas:500000,
      minGasPrice:500000,
      //accounts: { mnemonic: mnemonic } 
      accounts:[process.env.PRIVATE_KEY]
    },
    goerli: {
      url: "https://nd-183-293-329.p2pify.com/9cb7dc01725069f9ecfe62cef1f60fca",
      chainId: 5,
      accounts: [process.env.PRIVATE_KEY]
    },
    lineagoerli: {
      url: "https://rpc.goerli.linea.build",
      chainId: 59140,
      gasPrice: 20*1e9,
      gas:500000,
      minGasPrice:500000,
      accounts: [process.env.PRIVATE_KEY]
    },
    mainnet: {
      url: 'https://bsc-dataseed.binance.org/',
      chainId: 56,
      gasPrice: 5*1e9,
      accounts:[process.env.PRIVATE_KEY]
      //accounts: { mnemonic: mnemonic }
    }
  },

  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts'
  },
  mocha: {
    timeout: 20000
  },
  etherscan: {
    apiKey: process.env.LINEASCAN_API_KEY,
    customChains: [
     {
      network: "lineagoerli",
      chainId: 59140,
      urls: {
        apiURL: "https://api-testnet.lineascan.build/api",
        browserURL: "https://goerli.lineascan.build/"
      }
     }
   ]
  },
  preprocess: {
    eachLine: removeConsoleLog((bre) => bre.network.name !== 'hardhat' && bre.network.name !== 'localhost'),
  },
  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true
  },
  gasReporter: {
    coinmarketcap: '[deploy then input token adress]',
    currency: 'USD',
    enabled: true
  }
};
