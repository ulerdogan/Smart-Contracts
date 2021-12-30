// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./IUniswapV2Router.sol";

contract ForkSwap {
    address private constant UNI_ROUTER =
        0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant DAI_ADDRESS =
        0x6B175474E89094C44Da98b954EedeAC495271d0F;
    uint256 private constant MAX_UINT = 2**256 - 1;
    IUniswapV2Router01 public uniRouter = IUniswapV2Router01(UNI_ROUTER);

    function swapExactETHForDAI()
        external
        payable
        returns (uint256[] memory amounts)
    {
        address[] memory path = new address[](2);
        path[0] = uniRouter.WETH();
        path[1] = address(DAI_ADDRESS);

        return
            uniRouter.swapExactETHForTokens{value: msg.value}(
                0,
                path,
                msg.sender,
                MAX_UINT
            );
    }

    function giveWETH() external view returns (address) {
        return uniRouter.WETH();
    }
}
