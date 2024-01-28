// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "../openzeppelin/token/ERC20/ERC20.sol";
import "../openzeppelin/access/Ownable.sol";

contract AquaBARToken is ERC20, Ownable {
    
    constructor(address initialOwner) ERC20("Staked HBAR Token", "AuqaBAR") Ownable(initialOwner) {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public onlyOwner {
        _burn(from, amount);
    }
}
