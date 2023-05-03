// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../vesting/UpYieldTokenVesting.sol";

/**
 * @title MockTokenVesting
 * WARNING: use only for testing and debugging purpose
 */
contract MockTokenVesting is UpYieldTokenVesting {

    uint256 mockTime = 0;

    constructor(address token_) UpYieldTokenVesting(token_){
    }

    function setCurrentTime(uint256 _time)
    external {
        mockTime = _time;
    }

    function getCurrentTime()
    internal
    virtual
    override
    view
    returns (uint256){
        return mockTime;
    }
}
