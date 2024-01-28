const { ethers } = require("hardhat");

module.exports = async () => {
    console.log("Starting the deployment process...");

    // Getting the first signer, typically the deployer
    let wallet = (await ethers.getSigners())[0];
    console.log(`Deployer Wallet Address: ${wallet.address}`);

    // Deploying the AquaBARToken contract
    const AquaBARToken = await ethers.getContractFactory("AquaBARToken", wallet);
    console.log("Deploying AquaBARToken...");
    const token = await AquaBARToken.deploy(wallet.address); // Assuming the deployer is the initial owner
    const aquaBARTokenAddress = await token.getAddress();
    console.log(`AquaBARToken deployed to: ${aquaBARTokenAddress}`);

    // Deploying the StakingContract
    const StakingContract = await ethers.getContractFactory("StakingContract", wallet);
    console.log("Deploying StakingContract...");
    const staking = await StakingContract.deploy(aquaBARTokenAddress);
    const stakingAddress = await staking.getAddress();
  
    console.log(`StakingContract deployed to: ${stakingAddress}`);

    // Optional: Transfer the ownership of AquaBARToken to the StakingContract
    console.log("Transferring ownership of AquaBARToken to StakingContract...");
    await token.transferOwnership(stakingAddress);
    console.log(`Ownership of AquaBARToken transferred to StakingContract at ${stakingAddress}`);

    console.log("Deployment process finished successfully.");

    return { tokenAddress: aquaBARTokenAddress, stakingAddress: stakingAddress };
};

// To execute the script, add the following line
if (require.main === module) {
    module.exports()
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
}
