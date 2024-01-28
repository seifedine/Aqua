require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomicfoundation/hardhat-ethers");
// Import dotenv module to access variables stored in the .env file
require("dotenv").config();

task("deploy-contract", async () => {
  const deployContract = require("./scripts/deploy");
  return deployContract();
});


task("contract-view-call", "")
  .addParam("contractaddress", "The account's address")
  .setAction(async (taskArgs) => {
    const contractViewCall = require("./scripts/contractViewCall");
    return contractViewCall(taskArgs.contractaddress);
  });

const HEDERA_TESTNET_URL = process.env.HEDERA_TESTNET_URL || "";
const HEDERA_TESTNET_ACCOUNT_PK = process.env.HEDERA_TESTNET_ACCOUNT_PK || ""; 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.23",
  networks: {
    hederaTestNet: {
      url: HEDERA_TESTNET_URL || "",
      accounts: [`${HEDERA_TESTNET_ACCOUNT_PK}`]
    }
  }
};
