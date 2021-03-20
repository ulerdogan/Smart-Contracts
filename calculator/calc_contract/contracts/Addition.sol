pragma solidity ^0.4.25;

contract Addition {
    
    mapping(address => int) public results;
    
    function sum(int x, int y) public {
        results[msg.sender] = x + y;
    }
    
    function product(int x, int y) public {
        results[msg.sender] = x*y;
    }
    
}