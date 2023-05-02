# SVC Contracts

This repository contains Solidity smart contracts for the Yield Finance governance token and related contracts:

* The ERC20 token
* vesting
* governance

The project uses Hardhat framework.

# Building and Deploying

* Install node.js (18.x)
* Install yarn: ```npm install --global yarn```
* Fetch dependencies: ```yarn install```
* Compile: ```yarn compile```
* Run tests: ```yarn test```

Deployment to local network
* Start a local Hardhat node: ```npx hardhat node```
* Deploy ```yarn deploy:local```


In order to deploy to a live network, you need a private key and a node endpoint. Currently, hardhat.config.js is configured to use Infura.
* Deploy: ```npx hardhat run scripts/deployment.js --network <network name>```

