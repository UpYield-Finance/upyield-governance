require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-abi-exporter');
require('dotenv').config();
require("solidity-coverage");
require('hardhat-contract-sizer');
require("hardhat-gas-reporter");

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
      chainId: 137,
      url: `https://arbitrum-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.WALLET_PK]
    },
    arbitrum: {
      chainId: 137,
      url: `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
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
