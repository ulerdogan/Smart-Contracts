// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.11;

contract MultiSig {
    address[] public signers;
    uint256 public requiredConfirmations;

    uint256 public nonce;
    mapping(uint256 => Tx) public nonceToTx;
    mapping(uint256 => mapping(address => bool)) txConfirmers;

    event NewProposal(address propoeser, uint256 id);
    event Executed(address executer, uint256 id, bool status);

    struct Tx {
        address proposer;
        uint256 confirmations;
        bool executed;
        uint256 deadline;
        address txAddress;
        uint256 value;
        bytes txData;
    }

    constructor(address[] memory _signers, uint256 _requiredConfirmations) {
        require(_signers.length > 0, "Any signer.");
        require(isUnique(_signers), "Duplicate addresses.");
        require(
            _requiredConfirmations <= _signers.length,
            "Not enough signer."
        );
        signers = _signers;
        requiredConfirmations = _requiredConfirmations;
    }

    receive() external payable {}

    fallback() external payable {}

    function proposeTx(
        uint256 _deadline,
        address _txAddress,
        uint256 _value,
        bytes memory _txData
    ) public onlySigners {
        require(_deadline > block.timestamp, "Time out");
        Tx memory _tx = Tx({
            proposer: msg.sender,
            confirmations: 0,
            executed: false,
            deadline: _deadline,
            txAddress: _txAddress,
            value: _value,
            txData: _txData
        });
        nonceToTx[nonce] = _tx;
        emit NewProposal(msg.sender, nonce);
        nonce++;
    }

    function confirmTx(uint256 _nonce) public onlySigners {
        require(_nonce < nonce, "Not exists.");
        require(txConfirmers[_nonce][msg.sender] == false, "Already approved.");
        require(nonceToTx[_nonce].deadline > block.timestamp, "Time out");
        require(nonceToTx[_nonce].executed == false, "Already executed");

        nonceToTx[_nonce].confirmations++;
        txConfirmers[_nonce][msg.sender] = true;
    }

    function rejectTx(uint256 _nonce) public onlySigners {
        require(_nonce < nonce, "Not exists.");
        require(
            txConfirmers[_nonce][msg.sender] == true,
            "Already non-approved."
        );
        require(nonceToTx[_nonce].deadline > block.timestamp, "Time out");
        require(nonceToTx[_nonce].executed == false, "Already executed");
        nonceToTx[_nonce].confirmations--;
        txConfirmers[_nonce][msg.sender] = false;
    }

    function executeTx(uint256 _nonce) public onlySigners returns (bool) {
        require(_nonce < nonce, "Not exists.");
        require(nonceToTx[_nonce].deadline > block.timestamp, "Time out");
        require(
            nonceToTx[_nonce].confirmations >= requiredConfirmations,
            "Not confirmed."
        );
        require(nonceToTx[_nonce].executed == false, "Already executed.");
        require(nonceToTx[_nonce].value >= address(this).balance);
        nonceToTx[_nonce].executed = true;

        (bool txSuccess, ) = (nonceToTx[_nonce].txAddress).call{
            value: nonceToTx[_nonce].value
        }(nonceToTx[_nonce].txData);
        if (!txSuccess) nonceToTx[_nonce].executed = false;
        emit Executed(msg.sender, _nonce, txSuccess);
        return txSuccess;
    }

    function deleteTx(uint256 _nonce) public {
        require(nonceToTx[_nonce].executed == false, "Already executed.");
        require(nonceToTx[_nonce].proposer == msg.sender, "Not tx owner.");
        require(
            nonceToTx[_nonce].confirmations < requiredConfirmations,
            "Already confirmed."
        );
        nonceToTx[_nonce].executed = true;
    }

    function changeConfirmations(uint256 _count) public onlyContract {
        require(_count <= signers.length, "Not enough signer.");
        requiredConfirmations = _count;
    }

    function changeSigners(address[] memory _signers) public onlyContract {
        require(_signers.length > 0, "Any signer.");
        require(isUnique(_signers), "Duplicate addresses.");
        require(_signers.length >= requiredConfirmations);
        signers = _signers;
    }

    function withdraw(address payable _receiver, uint256 _amount)
        public
        onlyContract
    {
        require(address(this).balance > _amount, "Not enough balance.");
        _receiver.transfer(_amount);
    }

    function getChConfData(uint256 _count) public pure returns (bytes memory) {
        return abi.encodeWithSignature("changeConfirmations(uint256)", _count);
    }

    function getChSigData(address[] memory _signers)
        public
        pure
        returns (bytes memory)
    {
        return abi.encodeWithSignature("changeSigners(address[])", _signers);
    }

    function getWData(address _receiver, uint256 _amount)
        public
        pure
        returns (bytes memory)
    {
        return
            abi.encodeWithSignature(
                "withdraw(address payable, uint256)",
                _receiver,
                _amount
            );
    }

    function isUnique(address[] memory arr) private pure returns (bool) {
        for (uint256 i = 0; i < arr.length - 1; i++) {
            for (uint256 j = i + 1; j < arr.length; j++) {
                require(arr[i] != arr[j], "Duplicate addresses.");
            }
        }
        return true;
    }

    modifier onlySigners() {
        bool signer = false;
        for (uint256 i = 0; i < signers.length; i++) {
            if (signers[i] == msg.sender) signer = true;
        }
        require(signer, "Not signer.");
        _;
    }

    modifier onlyContract() {
        require(msg.sender == address(this), "Only by proposals.");
        _;
    }
}
