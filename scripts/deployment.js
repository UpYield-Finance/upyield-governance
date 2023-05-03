const INITIAL_SUPPLY = '1000000000';

async function deployGovernanceToken(taskArgs, hre) {
  const Token = await hre.ethers.getContractFactory("UpYieldGovernanceToken");
  const token = await Token.deploy(taskArgs.name, taskArgs.symbol, hre.ethers.utils.parseEther(INITIAL_SUPPLY));
  await token.deployed();
  console.log(`UpYieldGovernanceToken deployed to:${token.address} on ${hre.network.name}`);
  return token.address;
}

async function deployVestingContract(taskArgs, hre) {
  const TokenVesting = await hre.ethers.getContractFactory("UpYieldTokenVesting");
  const vesting = await TokenVesting.deploy(taskArgs.token);
  await vesting.deployed();
  console.log(`TokenVesting deployed to:${vesting.address} on ${hre.network.name}`);
  return vesting.address;
}

async function deployAll(taskArgs, hre) {
  const tokenAddr = await deployGovernanceToken(taskArgs,hre);
  await deployVestingContract({token: tokenAddr}, hre);
}

module.exports = {deployGovernanceToken, deployVestingContract, deployAll}
