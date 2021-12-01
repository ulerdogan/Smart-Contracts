//SPDX-License-Identifier: NO LICENSED
pragma solidity >=0.6.0 <0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.0/contracts/utils/EnumerableSet.sol";

contract EnergyTrading {
    // A set to keep the orders
    using EnumerableSet for EnumerableSet.UintSet;
    EnumerableSet.UintSet private sellOrders;

    // A variable that keeps the last orders Id
    uint256 private lastOrderId = 0;

    // Reaching the order details by the id's
    mapping(uint256 => SellOrder) public sellDetails;

    // Stores the address and the generated meter ID's
    mapping(address => uint256) public members;

    // Order Events
    event Buy(
        uint256 _buyer, // buyer id
        uint256 _seller, // buyer id
        uint256 _amount, // in kwh
        uint256 _price // in Eth
    );

    event Sell(
        uint256 _orderId, // automatically created id
        uint256 _seller, // buyer id
        uint256 _amount, // in kwh
        uint256 _price // in Eth
    );

    // Order struct
    struct SellOrder {
        uint256 _seller;
        uint256 _amount;
        uint256 _price;
    }

    // A sign-up process for the new joints
    function signUp() public {
        require(
            members[msg.sender] == 0,
            "You have already joined the network!"
        );

        members[msg.sender] =
            uint256(
                keccak256(abi.encodePacked(block.difficulty, block.timestamp))
            ) %
            1000000;
    }

    // Changing the meters owner
    function changeOwner(address _newOwner) public isSignedUp {
        require(msg.sender != _newOwner, "The addresses must be different!");
        uint256 _pId = members[msg.sender];
        delete (members[msg.sender]);
        members[_newOwner] = _pId;
    }

    // A modifier to guarantee the traders identity
    modifier isSignedUp() {
        require(
            members[msg.sender] != 0,
            "You have to sign up before trading!"
        );
        _;
    }

    // Order functions
    function buyOrder(uint256 _amount, uint256 _sellId)
        public
        payable
        isSignedUp
    {
        require(
            sellDetails[_sellId]._amount >= _amount,
            "Not enough energy on the sell order!"
        );
        require(
            msg.value == _amount * sellDetails[_sellId]._price,
            "Unappropriate payment!"
        );

        // partial purchase of a sell
        if (sellDetails[_sellId]._amount > _amount) {
            SellOrder storage _offer = sellDetails[_sellId];
            _offer._amount = _offer._amount - _amount;
            emit Buy(
                members[msg.sender],
                sellDetails[_sellId]._seller,
                _amount,
                sellDetails[_sellId]._price
            );
            // full purchase of a sell
        } else {
            delete (sellDetails[_sellId]);
            emit Buy(
                members[msg.sender],
                sellDetails[_sellId]._seller,
                _amount,
                sellDetails[_sellId]._price
            );
        }

        payable(sellDetails[_sellId]._seller).transfer(msg.value);
    }

    function publishSellOrder(uint256 _amount, uint256 _price)
        public
        isSignedUp
    {
        require(_amount >= 1, "The minimum energy sale amount is 1 kwh!");
        require(_price > 0, "Price must be bigger than 0!");
        lastOrderId++;
        sellOrders.add(lastOrderId);

        SellOrder memory _order = SellOrder(
            members[msg.sender],
            _amount,
            _price
        );
        sellDetails[lastOrderId] = _order;

        emit Sell(lastOrderId, members[msg.sender], _amount, _price);
    }
}
