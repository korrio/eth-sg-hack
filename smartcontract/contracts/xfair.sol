// SPDX-License-Identifier: MIT

pragma solidity ^0.8.5;
import "./base/DVDERC20.sol";
import "./base/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract xfair is DVDERC20("Fair profit bearing", "XFR") {

    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    IERC20 public immutable dvdToken ;
    uint256 public manualMinted = 0;

// initial token
    constructor(IERC20 _dvdToken) {
        dvdToken = _dvdToken;
    }


/// @notice Creates `_amount` token to `_to`. Must only be called by the owner (ValueChef).
  function mint(address _to, uint256 _amount) external onlyOwner {
        _mint(_to, _amount);


    }
  function burn(address from, uint256 amount) external onlyOwner {
    _burn(from, amount);
  }


  function collect() external {
    uint256 amount = _prepareCollect(msg.sender);
    dvdToken.safeTransfer(msg.sender, amount);
  }

  function distribute(uint256 _amount) external onlyOwner {
    require(dvdToken.balanceOf(msg.sender) >= _amount, "XFR:: Profit: Insufficient");
    dvdToken.safeTransferFrom(msg.sender, address(this), _amount);
    _distributeDividends(_amount);
  }
}


