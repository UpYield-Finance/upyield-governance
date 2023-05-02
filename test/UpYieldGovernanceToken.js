const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UpYiled Governance Token", function () {
    let owner
    let user1
    let Token
    let token

    before(async () => {
        [owner, user1] = await ethers.getSigners();
        Token = await ethers.getContractFactory("UpYieldGovernanceToken");
    });

    beforeEach(async () => {
        token = await Token.deploy('UpYieldGovernanceToken','YEP');
        await token.deployed();
        await token.mint(owner.address, 100);
    });

    describe('Deployment', () => {
        it("should initialise the token", async () => {
            const ownerBalance = await token.balanceOf(owner.address);
            expect(await token.totalSupply()).to.equal(ownerBalance);
            expect(await token.hasRole(token.DEFAULT_ADMIN_ROLE(),owner.address)).to.equal(true);
            expect(await token.hasRole(token.PAUSER_ROLE(),owner.address)).to.equal(true);
            expect(await token.hasRole(token.MINTER_ROLE(),owner.address)).to.equal(true);
        })
    })

    describe('transfer', () => {
        it("should transfer tokens", async function () {
            const ownerBalanceBefore = await token.balanceOf(owner.address);
            await token.transfer(user1.address, 1)
            const ownerBalanceAfter = await token.balanceOf(owner.address);
            const userBalanceAfter = await token.balanceOf(user1.address);
            expect(ownerBalanceAfter).to.equal(ownerBalanceBefore - 1)
            expect(userBalanceAfter).to.equal(1)
        })

        it("should revert if not enough balance", async function () {
            const ownerBalanceBefore = await token.balanceOf(owner.address);

            await expect(token.transfer(user1.address, 101)).to.be.revertedWith('ERC20: transfer amount exceeds balance');

            const ownerBalanceAfter = await token.balanceOf(owner.address);
            const userBalanceAfter = await token.balanceOf(user1.address);
            expect(ownerBalanceAfter).to.equal(ownerBalanceBefore)
            expect(userBalanceAfter).to.equal(0)
        })
    })

    describe('mint', () => {
        it("should mint tokens", async function () {
            const totalSupplyBefore = await token.totalSupply();
            const ownerBalanceBefore = await token.balanceOf(owner.address);
            await token.mint(owner.address, 100);
            const ownerBalanceAfter = await token.balanceOf(owner.address);
            expect(ownerBalanceAfter).to.equal(ownerBalanceBefore.toNumber() + 100)
            expect(await token.totalSupply()).to.equal(totalSupplyBefore.toNumber() + 100)
        })

        it("should revert unauthorised minters", async function () {
            const totalSupplyBefore = await token.totalSupply();
            await expect(token.connect(user1).mint(owner.address, 100)).to.be.revertedWith('AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6');
            expect(await token.totalSupply()).to.equal(totalSupplyBefore)
        })
    })

    describe('burn', () => {
        it("should burn tokens", async function () {
            const totalSupplyBefore = await token.totalSupply();
            const ownerBalanceBefore = await token.balanceOf(owner.address);
            await token.burn(10);
            const ownerBalanceAfter = await token.balanceOf(owner.address);
            expect(ownerBalanceAfter).to.equal(ownerBalanceBefore - 10)
            expect(await token.totalSupply()).to.equal(totalSupplyBefore.toNumber() - 10)
        })

        it("should revert if not enough tokens to burn", async function () {
            const totalSupplyBefore = await token.totalSupply();
            await expect(token.burn(110)).to.be.revertedWith('ERC20: burn amount exceeds balance');
            expect(await token.totalSupply()).to.equal(totalSupplyBefore)
        })
    })
})
