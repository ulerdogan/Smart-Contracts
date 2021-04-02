pragma solidity ^0.6.0;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/GSN/Context.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

receive() external payable {
    buyTokens(_msgSender());
}

function _preValidatePurchase(address beneficiary, uint256 weiAmount)
    internal
    view
    virtual
{
    require(
        beneficiary != address(0),
        "Crowdsale: beneficiary is the zero address"
    );
    require(weiAmount != 0, "Crowdsale: weiAmount is 0");
    this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
}

function _postValidatePurchase(address beneficiary, uint256 weiAmount)
    internal
    view
    virtual
{
    // solhint-disable-previous-line no-empty-blocks
}

function _deliverTokens(address beneficiary, uint256 tokenAmount)
    internal
    virtual
{
    _token.safeTransfer(beneficiary, tokenAmount);
}

function _processPurchase(address beneficiary, uint256 tokenAmount)
    internal
    virtual
{
    _deliverTokens(beneficiary, tokenAmount);
}

function _updatePurchasingState(address beneficiary, uint256 weiAmount)
    internal
    virtual
{
    // solhint-disable-previous-line no-empty-blocks
}

function _getTokenAmount(uint256 weiAmount)
    internal
    view
    virtual
    returns (uint256)
{
    return weiAmount.mul(_rate);
}
