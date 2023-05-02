require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-abi-exporter');
require('dotenv').config();
require("solidity-coverage");
require('hardhat-contract-sizer');
require("hardhat-gas-reporter");
const {task} = require("hardhat/config");
const deployment = require("./scripts/deployment");

task("deploy:all", "Deploy all contracts")
    .addParam("name", "Token name")
    .addParam("symbol", "Token symbol")
    .setAction(deployment.deployAll);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  namedAccounts: {
    deployer: {
      default: 0 // here this will by default take the first account as deployer
    }
  },
  networks: {
    // Sepolia is the recommended default testnet for application development
    sepolia: {
      chainId: 11155111,
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.WALLET_PK]
    },
    mainnet: {
      chainId: 1,
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.WALLET_PK]
    },
    goerli: {
      chainId: 5,
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.WALLET_PK],
      apiURL: 'https://api-goerli.etherscan.io/api',
      browserURL: 'https://goerli.etherscan.io/'
    },
    mumbai: {
      chainId: 80001 ,
      url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.WALLET_PK]
    },
    polygon: {
      chainId: 137,
      url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.WALLET_PK]
    },
    arbitrum_goerli: {
      chainId: 421613,
      url: `https://arbitrum-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      apiURL: 'https://api-testnet.arbiscan.io/api',
      browserURL: 'https://testnet.arbiscan.io/',
      accounts: [process.env.WALLET_PK]
    },
    arbitrum: {
      chainId: 42161,
      url: `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      apiURL: 'https://api.arbiscan.io/api',
      browserURL: 'https://arbiscan.io/',
      accounts: [process.env.WALLET_PK]
    },
    hardhat: {
      accounts: {
        count: 150
      },
      mining: {
        mempool: {
          order: "fifo"
        }
      }
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 9999,
      }
    }
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false
  },
  gasReporter: {
    enabled: true
  }
};
