pragma solidity ^0.6.0;

contract MappingExamples {
    
    //uint to bool, then publicty and var name
    mapping(uint=>bool) public myMapping;
    mapping(address=>bool) public myAddressMapping;
    
    //fonksiyonda işlem gören sayılar true çıkarıyor
    function setValue(uint _index) public {
        myMapping[_index] = true;
    }
    
    function setMyAddress() public{
        myAddressMapping[msg.sender] = true;
    }
    
}