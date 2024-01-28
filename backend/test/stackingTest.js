const chai = require("chai");
const expect = chai.expect;
const { ethers } = require("hardhat");

describe("StakingContract", function () {
    let aquaBARToken, stakingContract;
    let owner, user1, user2;
    const stakeAmount = 100000000; // 1 HBAR in tinybars  // 1 HBAR

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();

    // Deploying the AquaBARToken contract
    const AquaBARToken = await ethers.getContractFactory("AquaBARToken", owner);
    console.log("Deploying AquaBARToken...");
    aquaBARToken = await AquaBARToken.deploy(owner.address); // Assuming the deployer is the initial owner
    const aquaBARTokenAddress = await aquaBARToken.getAddress();
    console.log(`AquaBARToken deployed to: ${aquaBARTokenAddress}`);

    // Deploying the StakingContract
    const StakingContract = await ethers.getContractFactory("StakingContract", owner);
    console.log("Deploying StakingContract...");
    stakingContract = await StakingContract.deploy(aquaBARTokenAddress);
    const stakingAddress = await stakingContract.getAddress();
  
    console.log(`StakingContract deployed to: ${stakingAddress}`);

    // Optional: Transfer the ownership of AquaBARToken to the StakingContract
    console.log("Transferring ownership of AquaBARToken to StakingContract...");
    await aquaBARToken.transferOwnership(stakingAddress);
    console.log(`Ownership of AquaBARToken transferred to StakingContract at ${stakingAddress}`);
    });

    describe("Staking", function () {
        it("Should accept stakes and mint tokens", async function () {
            await stakingContract.connect(user1).stake({ value: stakeAmount });
            expect(await aquaBARToken.balanceOf(user1.getAddress())).to.equal(stakeAmount);
        });

        it("Should not allow staking 0 HBAR", async function () {
            await expect(stakingContract.connect(user1).stake({ value: 0 }))
                .to.be.revertedWith("Cannot stake 0 HBAR");
        });
    });

    describe("Unstaking", function () {
        it("Should allow unstaking and burn tokens", async function () {
            await stakingContract.connect(user1).stake({ value: stakeAmount });
            await stakingContract.connect(user1).unstake(stakeAmount);
            expect(await aquaBARToken.balanceOf(user1.getAddress())).to.equal(0);
        });

        it("Should not allow unstaking more than staked", async function () {
            const tooMuch = 200000000; // 2 HBAR in tinybars  // 2 HBAR;
            await stakingContract.connect(user1).stake({ value: stakeAmount });
            await expect(stakingContract.connect(user1).unstake(tooMuch))
                .to.be.revertedWith("Cannot unstake more than you have staked");
        });
    });
});
