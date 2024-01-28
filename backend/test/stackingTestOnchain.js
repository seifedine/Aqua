const { ethers } = require("hardhat");
require("dotenv").config();
const { Client, AccountId,AccountBalanceQuery } = require("@hashgraph/sdk");


async function main() { 
    const provider = ethers.provider;

    //   // Load private key from environment variables
    //   const user1PrivateKey = process.env.HEDERA_TESTNET_ACCOUNT_PK;
    //   if (!user1PrivateKey) {
    //       throw new Error("owner private key not found in environment variables");
    //   }
    //     // Create a wallet for user1
    //     const owner = new ethers.Wallet(user1PrivateKey, provider);
    //
    //   const ownerBalance = await provider.getBalance(owner.address);
    //   console.log(`User1 balance: ${ownerBalance} HBAR`);

    const client = Client.forTestnet();
    const accountId = process.env.HEDERA_TESTNET_ACCOUNT_ID;
    const privateKey = process.env.HEDERA_TESTNET_ACCOUNT_PK;

    if (accountId == undefined || privateKey == undefined) {
        throw new Error(" the keys must be specified");
    }

    client.setOperator(accountId, privateKey);

        // Query the balance
        const balance = await new AccountBalanceQuery().setAccountId(accountId).execute(client);
        console.log(`owner balance: ${balance} tinybar`);
        

    // Addresses of the already deployed contracts
    const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const stakingContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; 
    
    // Connect to the existing Token contract
    const Token = await ethers.getContractFactory("AquaBARToken");
    const token = await Token.attach(tokenAddress);
    
    // Connect to the existing StakingContract
    const Staking = await ethers.getContractFactory("StakingContract");
    const stakingContract = await Staking.attach(stakingContractAddress);

////////////////////////////////////////////////////////////////////////////***** force deploy method */
    //   // Deploying the AquaBARToken contract
    //   const AquaBARToken = await ethers.getContractFactory("AquaBARToken", wallet);
    //   console.log("Deploying AquaBARToken...");
    //   const token = await AquaBARToken.deploy(wallet.address); // Assuming the deployer is the initial owner
    //   const aquaBARTokenAddress = await token.getAddress();
    //   console.log(`AquaBARToken deployed to: ${aquaBARTokenAddress}`);
   //
    //   // Deploying the StakingContract
    //   const StakingContract = await ethers.getContractFactory("StakingContract", wallet);
    //   console.log("Deploying StakingContract...");
    //   const stakingContract = await StakingContract.deploy(aquaBARTokenAddress);
    //   const stakingAddress = await stakingContract.getAddress();
    // 
    //   console.log(`StakingContract deployed to: ${stakingAddress}`);
   //
    //   // Optional: Transfer the ownership of AquaBARToken to the StakingContract
    //   console.log("Transferring ownership of AquaBARToken to StakingContract...");
    //   await token.transferOwnership(stakingAddress);
    //   console.log(`Ownership of AquaBARToken transferred to StakingContract at ${stakingAddress}`);
////////////////////////////////////////////////////////////////////////////////////////////////////////////
    console.log("contracts linked");

    //if (ownerBalance.lt(stakeAmount)) {
    //    throw new Error("Insufficient balance in user1's wallet for staking");
    //}

    
    // Test staking
    const stakeAmount = 100000000; // 1 HBAR in tinybars
    console.log("Testing staking...");
    await stakingContract.connect(owner).stake({ value: stakeAmount });
    console.log(`User1 staked ${stakeAmount} HBAR`);

    // Test token balance after staking
    const user1Balance = await token.balanceOf(owner.address);
    console.log(`User1 token balance after staking: ${user1Balance.toString()}`);

    // Test unstaking
    console.log("Testing unstaking...");
    await stakingContract.connect(owner).unstake(stakeAmount);
    console.log(`User1 unstaked ${stakeAmount} HBAR`);

    // Test token balance after unstaking
    const user1BalanceAfterUnstake = await token.balanceOf(owner.address);
    console.log(`User1 token balance after unstaking: ${user1BalanceAfterUnstake.toString()}`);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
