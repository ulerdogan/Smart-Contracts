pragma solidity ^0.5.13;

contract Variables {
    
    //(u)int's defaults're 0.
    uint256 public myUint;
    function setMyUint(uint _myUint) public {
        myUint = _myUint;
    }
    
    
    //boolean default'u false
    bool public myBool;
    function setMyBool(bool _myBool) public {
        myBool = _myBool;
    }
    
    
    // uint'ler sarmal oluşturur. üst sınırına ulaştıktan sonra 0'a geri döner.
    uint8 public my8 = 255;
    function incMy() public{
        my8++;
    }
        function decMy() public{
        my8--;
    }
    
    
    //addressses, default is 0x00...00 view -just reading funct-
    address public myAddress;
    function setMyAddress(address _address) public{
        myAddress = _address;
    }
    function getBalanceOfMyAddress() public view returns(uint){
        return myAddress.balance;
    }
    
    
    //strings
    string public myString;
    function setMyString(string memory _myString) public{
        myString = _myString;
    }

}