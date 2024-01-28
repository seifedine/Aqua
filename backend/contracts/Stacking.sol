// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AquaBARToken.sol";
import "../openzeppelin/utils/ReentrancyGuard.sol";

contract StakingContract is ReentrancyGuard {
    AquaBARToken public token;

    mapping(address => uint256) public stakes;

    event Staked(address indexed user, uint256 amount, uint256 totalStaked);
    event Unstaked(address indexed user, uint256 amount, uint256 totalStaked);

    constructor(address tokenAddress) {
        token = AquaBARToken(tokenAddress);
    }

    function stake() public nonReentrant payable {
        require(msg.value > 0, "Cannot stake 0 HBAR");
        stakes[msg.sender] += msg.value;
        token.mint(msg.sender, msg.value);

        emit Staked(msg.sender, msg.value, stakes[msg.sender]);
    }

    function unstake(uint256 amount) public nonReentrant {
        require(stakes[msg.sender] >= amount, "Cannot unstake more than you have staked");
        stakes[msg.sender] -= amount;
        token.burn(msg.sender, amount);
        payable(msg.sender).transfer(amount);

        emit Unstaked(msg.sender, amount, stakes[msg.sender]);
    }

    // Fallback function to receive HBAR
    receive() external payable {
        stake();
    }
}
