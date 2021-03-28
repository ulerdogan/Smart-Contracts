pragma solidity ^0.5.14;

contract SomeContract {
    uint public myUint = 10;
    function setUint(uint _myUint) public {
    myUint = _myUint;
    }
}