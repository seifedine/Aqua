const chai = require("chai");
const expect = chai.expect;
const { ethers } = require("hardhat");

describe("Greeter", () => {

  let owner;


    beforeEach(async function () {
        
        [owner] = await ethers.getSigners();

        const greetingFactory = await ethers.getContractFactory("Greeter");
        greeting = await greetingFactory.deploy("Hi");
    
    });

    it("Should Greet", async function () {
        const greet = await greeting.greet();
        expect(greet).to.equal("Hij");
    });
});