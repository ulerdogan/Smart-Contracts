pragma solidity ^0.4.25;

contract Addition {
    
    int public result;
    
    function sum(int x, int y) public {
        result = x + y;
    }
    
}