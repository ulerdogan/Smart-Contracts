pragma solidity ^0.5.13;

contract FunctionExamples {
    
    mapping(address => uint) public balanceReceived;
    
    address payable owner;
    
    //constructors are being setted on deploying and no changes
    constructor() public {
        owner = msg.sender;
    }
    
    //view function just viewed
    function getOwner() public view returns(address){
        return owner;
    }
    
    //pure functions not interact with any storage vars
    function convertWeiToEther(uint _amountInWei) public pure {
        _amountInWei / 1 ether; // 1 ether = 10^18 wei
    }
    
    function destroySmartContract() public{
        require(msg.sender == owner, "You're not the owner!");
        selfdestruct(owner);
    }
    
    function receiveMoney() public payable{
        assert(balanceReceived[msg.sender] + msg.value >= balanceReceived[msg.sender]);
        balanceReceived[msg.sender] += msg.value;
    }
    
    function withdrawMoney(address payable _to, uint _amount) public {
        require(_amount <= balanceReceived[msg.sender], "Not enough fund!");
        assert(balanceReceived[msg.sender] >= balanceReceived[msg.sender] - _amount);
        balanceReceived[msg.sender] -= _amount;
        _to.transfer(_amount);
    }
    
    //sending money to smart contract, fall back function without name -- always external
    function () external payable {
        receiveMoney();
    }
}