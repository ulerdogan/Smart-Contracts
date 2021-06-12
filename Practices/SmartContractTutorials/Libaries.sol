pragma solidity ^0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/math/SafeMath.sol";

contract LibariesExample {
    
    using SafeMath for uint;
    
    mapping(address => uint) public tokenBalance;
    
    constructor() public {
        tokenBalance[msg.sender] = tokenBalance[msg.sender].add(1);
    }
    
    function sendToken(address _to, uint _amount) public returns(bool){
        tokenBalance[msg.sender] = tokenBalance[msg.sender].sub(_amount);
        tokenBalance[_to] = tokenBalance[_to].add(_amount);
        
        return true;
    }
    


}