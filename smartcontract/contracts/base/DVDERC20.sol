// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import "./BaseERC20.sol";
import "./BaseDividends.sol";


contract DVDERC20 is BaseDividends, BaseERC20 {
  constructor(string memory name, string memory symbol)
    BaseERC20(name, symbol)
    BaseDividends(balanceOf, totalSupply){}

	/**
	 * @dev Internal function that transfer tokens from one address to another.
	 * Update pointsCorrection to keep funds unchanged.
	 * @param from The address to transfer from.
	 * @param to The address to transfer to.
	 * @param value The amount to be transferred.
	 */
	function _transfer(address from, address to, uint256 value) internal virtual override {
		super._transfer(from, to, value);
    _correctPointsForTransfer(from, to, value);
	}

	/**
	 * @dev Internal function that mints tokens to an account.
	 * Update pointsCorrection to keep funds unchanged.
	 * @param account The account that will receive the created tokens.
	 * @param amount The amount that will be created.
	 */
	function _mint(address account, uint256 amount) internal virtual override {
		super._mint(account, amount);
    _correctPoints(account, -int256(amount));
	}
	
	/** 
	 * @dev Internal function that burns an amount of the token of a given account.
	 * Update pointsCorrection to keep funds unchanged.
	 * @param account The account whose tokens will be burnt.
	 * @param amount The amount that will be burnt.
	 */
	function _burn(address account, uint256 amount) internal virtual override {
		super._burn(account, amount);
    _correctPoints(account, int256(amount));
	}
}