pragma solidity ^0.5.13;

contract StartStopUpdateExample {

    address owner;

    bool public paused;

    constructor() public{
        owner = msg.sender;
    }

    function sendMoney() public payable{

    }
    
    function setPaused(bool _paused) public{
        require(msg.sender == owner, "You're not the owner!");
        paused = _paused;
    }
    
    // tüm bakiyeyi çekme fonksiyonu. eğer koşul eklemezsek herkes müdahale edebilri.
    // require(if,else) şeklinde kullan
    function withdrawAllMoney(address payable _to) public {
        require(msg.sender == owner, "You're not the owner!");
        require(paused == false, "The contract has paused!");
        _to.transfer(address(this).balance);
    }
    
    //smart contract yok etme
    function destroyTheSmartContract(address payable _to) public{
        require(msg.sender == owner, "You're not the owner!");
        selfdestruct(_to); // msg.sender da labilr
    }
    
}