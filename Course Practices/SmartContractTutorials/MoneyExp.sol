pragma solidity ^0.5.13;

contract MoneyExamples {
    
    uint public balanceReceived;
    
    
    //kontrata para yatırma
    function receiveMoney() public payable {
        balanceReceived += msg.value;
    }
    
    
    //bakiye sorgulama
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
    
    
    // para çekme
    function withdrawMoney() public{
        address payable to = msg.sender;
        to.transfer(this.getBalance());
    }
    
    //belli hesaba para yatır
    function withdrawMoneyTo(address payable _to) public{
        _to.transfer(this.getBalance());
    }
}