// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;
import "./interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./base/SafeERC20.sol";

// Enhance From Divident master V3 remove deposit stake token, change stake fee to fee on distributed
contract fairMaster is Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    using SafeERC20 for IERC20Dividends;

    IERC20 public paymentToken;
    IERC20Dividends public xfairToken;
    event DepositReward(uint256 amount);
    event AdminWithdraw(uint256 amount);

    event AdminTokenRecovery(address indexed user, uint256 amount);
    event updateDividingPeriod(uint256 dividendingBlockCount);
    event updateLockPeriod(uint256 lockProcessBlockCount);
    event SetFeeToDev(address indexed OldAddress, address indexed NewAddress);
    event SetFeeToReserved(
        address indexed OldAddress,
        address indexed NewAddress
    );
    event FeePiad(address indexed paidBy, uint256 amount);
    event updateFee(uint256 depositFee);
    event updateFeeDistribution(uint256 pecentageFeeToDev);
    event DividendDistributed(uint256 amount);
    event FeeWithdrawn(uint256 amount);
    event FeeToReserved(uint256 amount);
    event MintToHolder(uint256 amount, address holder);
    event BurnFromHolder(uint256 amount, address holder);

    event AdminWithdrawFee(uint256 amount);
    event SetEnable(bool _newStatus);
    event SetShares(uint256 shares);

    // Adjustable
    //Dividend waiting period
    uint256 public dividendingBlockCount;
    // The fee percentage
    uint256 public feePercentage;
    // The percentage of fee distribution to dev wallet
    uint256 public feeToDevPercentage;
    // The address to collect the fees when a user staked
    address public feeTo;
    // The address to collect the fees when a user staked
    address public fairReserved;
    //Last distributed dividend block
    uint256 public lastDisburseBlock;
    // The address of the dividend deployer
    address public immutable VALUE_CHEF_DEPLOYER;
    // Whether it is initialized
    bool public isInitialized;
    // Accrued fee
    uint256 public pendingFees;
    // Accrued distributed devidend
    uint256 public accDisbursed;
    // Pool share limit
    uint256 public LimitShares;
    // current share
    uint256 public currentShares;
    // Fair master enable fag
    bool public isEnablePool;

    uint256 public startPoolBlock;
    uint256 public payoutPeriodBlockCount;
    uint256 public delayProcessBlockCount;

    mapping(address => UserInfo) public userInfo;
    struct UserInfo {
        uint256 shares; // xfair tokens that user hold
        uint256 lastestStakeBlock;
        uint256 lastestRemoveBlock;
    }

    constructor() {
        VALUE_CHEF_DEPLOYER = msg.sender;
    }

    function initialize(
        IERC20 _paymentToken,
        IERC20Dividends _xfairToken,
        address _admin,
        address _fundWallet,
        address _fairReserved,
        uint256 _startBlock,
        uint256 _profitFee,
        uint256 _percentageFeeToDev,
        uint256 _finishBlockCount,
        uint256 _limitShares
    ) external {
        require(
            !isInitialized,
            "dividendMaster::initialize: Already initialized"
        );
        require(
            msg.sender == VALUE_CHEF_DEPLOYER,
            "DVD Minter::initialize: Not deployer"
        );

        // Make this contract initialized
        isInitialized = true;

        paymentToken = _paymentToken;
        xfairToken = _xfairToken;
        //adjustable
        dividendingBlockCount = 201600; //initial 7 days, blocktime 3s;
        delayProcessBlockCount = 28800; // initial 1 day
        feePercentage = _profitFee; //5000000000000000; //5e15 = 0.05% of deposit tokens
        feeToDevPercentage = _percentageFeeToDev; //500000000000000000; //5e17 = 50% of 0.05 (0.025%) distribute to dev , the rest are minting xDVI to treasury
        feeTo = _fundWallet;
        fairReserved = _fairReserved;

        // Start dividending period
        if (_startBlock == 0) {
            _startBlock = block.number;
        }
        startPoolBlock = _startBlock;
        lastDisburseBlock = _startBlock;

        if (_finishBlockCount == 0) {
            _finishBlockCount = 20736000; //initial 2 year, blocktime 3s;
        }
        payoutPeriodBlockCount = _finishBlockCount;

        LimitShares = _limitShares;
        currentShares = 0;
        isEnablePool = true;

        // Transfer ownership to the admin address who becomes owner of the contract
        transferOwnership(_admin);
    }

    /*
       Dividend pending for distribute 
    */
    function depositHolderShares(
        uint256 _amount,
        address holder
    ) external nonReentrant {
        require(
            isPoolReady(),
            "dividendMaster::depositShares: Pool isn't ready to stake"
        );
        require(
            _amount > 0,
            "dividendMaster::depositShares: Amount should more than 0"
        );
        require(
            checkNotExceedShares(_amount),
            "dividendMaster::depositShares: Amount exceeds remain shares"
        );
        require(
            !isInDepositLockPeriod(),
            "dividendMaster::depositShares: Pool is temperaly lock before dividend distribution"
        );
        UserInfo storage user = userInfo[holder];

        // adjust shares balance
        user.shares = xfairToken.balanceOf(msg.sender);

        xfairToken.mint(holder, _amount);
        user.lastestStakeBlock = block.number;
        user.shares = user.shares.add(_amount);
        currentShares = currentShares.add(_amount);
        emit MintToHolder(_amount, holder);
    }

    function removeHolderShares(
        uint256 _amount,
        address holder
    ) external nonReentrant {
        require(
            isEnablePool,
            "dividendMaster::removeShares: Pool is disable to widthdraw"
        );
        UserInfo storage user = userInfo[holder];
        // adjust shares in case remarket transfer
        if (user.shares == 0 || user.shares < xfairToken.balanceOf(holder)) {
            user.shares = xfairToken.balanceOf(holder);
        }
        require(
            _amount > 0,
            "dividendMaster::removeShares: Amount should more than 0"
        );

        require(
            user.shares >= _amount,
            "DVDMaster::removeShare: Insufficient balance"
        );
        user.shares = user.shares.sub(_amount);
        user.lastestRemoveBlock = block.number;

        xfairToken.burn(holder, _amount);

        emit BurnFromHolder(_amount, holder);
    }

    /*
       Dividend pending for distribute 
    */
    function dividendBalance() public view returns (uint256) {
        return paymentToken.balanceOf(address(this));
    }

    /*
     * @returns true in devidned gethering period
     */
    function isInDividingPeriod() public view returns (bool dividing) {
        dividing = (block.number <= nextDisburse());
    }

    /*
     * @returns true in lock for gethering period
     */
    function isInDepositLockPeriod() public view returns (bool lock) {
        lock = (nextDisburse().sub(block.number) <= delayProcessBlockCount);
    }

    function nextDisburse() public view returns (uint256) {
        return lastDisburseBlock.add(dividendingBlockCount);
    }

    /*
       Dividend be distributed to shareholders 
    */
    function distributeDividend() external nonReentrant onlyOwner {
        require(
            !isInDividingPeriod(),
            "dividendMaster::distributeReward: Too early to distribute balance"
        );
        uint256 _dvdtodist = dividendBalance();
        require(
            _dvdtodist > 0,
            "dividendMaster::distributeReward: Dividend token amount must > 0"
        );

        uint256 allowAmount = paymentToken.allowance(
            address(this),
            address(xfairToken)
        );
        if (allowAmount == 0) {
            paymentToken.safeApprove(address(xfairToken), _dvdtodist);
        } else {
            if (allowAmount < _dvdtodist) {
                paymentToken.safeIncreaseAllowance(
                    address(xfairToken),
                    _dvdtodist
                );
            }
        }
        // in case of operational fee
        uint256 distAmount = _dvdtodist;
        if (feePercentage > 0) {
            distAmount = _dvdtodist.mul(uint256(1e18).sub(feePercentage)).div(
                1e18
            );
            uint256 profitFee = _dvdtodist.sub(distAmount);
            pendingFees = pendingFees.add(profitFee);
            emit FeePiad(msg.sender, profitFee);
        }

        lastDisburseBlock = block.number;
        accDisbursed = accDisbursed.add(distAmount);
        xfairToken.distribute(distAmount);
        emit DividendDistributed(distAmount);
    }

    /** 
     * @notice Withdraw fee by admin
       collece fee and mint and split xDvi to fee wallet and teasury equally 
     */
    function distributeFee() external nonReentrant onlyOwner {
        require(
            pendingFees >= 0,
            "dividendMaster::collectFee: Insufficient balance"
        );
        uint256 pfBalance = paymentToken.balanceOf(address(this));
        require(
            pfBalance >= 0,
            "dividendMaster::collectFee: Insufficient balance"
        );

        if (pendingFees >= pfBalance) {
            pendingFees = pfBalance;
        }
        uint256 todev = pendingFees
            .mul(uint256(1e18).sub(feeToDevPercentage))
            .div(1e18);
        uint256 toreserved = pendingFees.sub(todev);

        pendingFees = 0;

        paymentToken.safeTransfer(feeTo, todev);
        emit FeeWithdrawn(todev);
        paymentToken.safeTransfer(fairReserved, toreserved);
        emit FeeToReserved(toreserved);

        /// incase of converse profit to xfair equipty token
        //xfairToken.mint(fairReserved, toreserved);
        //emit MintToReserved(toreserved);
    }

    /**
     * @dev Needs to be for emergency.
     */
    /**
     * @notice Admin withdraw only reward token in emergency case.
     * @notice Admin cannot withdraw user's devidend, SAFU!
     * @param _amount amount to withdraw
     */
    function adminDividendWithdraw(
        uint256 _amount
    ) external nonReentrant onlyOwner {
        require(
            _amount > 0,
            "dividendMaster::adminWithdraw: _amount should be higher than 0"
        );
        require(
            _amount <= dividendBalance(),
            "dividendMaster::adminWithdraw: _amount should be less than or equal the total remaining reward"
        );
        paymentToken.safeTransfer(msg.sender, _amount);
        emit AdminWithdraw(_amount);
    }

    /**
     * @notice Admin withdraw only fee.
     */
    function adminFeeWithdraw() external nonReentrant onlyOwner {
        require(
            paymentToken.balanceOf(address(this)) >= 0,
            "dividendMaster::collectFee: Insufficient balance"
        );
        require(
            pendingFees >= 0,
            "dividendMaster::collectFee: Insufficient balance"
        );
        uint256 stkBalance = paymentToken.balanceOf(address(this));
        if (pendingFees >= stkBalance) {
            pendingFees = stkBalance;
        }
        paymentToken.safeTransfer(feeTo, pendingFees);
        pendingFees = 0;
        emit AdminWithdrawFee(pendingFees);
    }

    /**
     * @notice It allows the admin to recover wrong tokens sent to the contract
     * @param _tokenAddress: the address of the token to withdraw
     * @param _tokenAmount: the number of tokens to withdraw
     * @dev This function is only callable by admin.
     */
    function recoverWrongTokens(
        address _tokenAddress,
        uint256 _tokenAmount
    ) external onlyOwner {
        require(
            _tokenAddress != address(paymentToken),
            "dividendMaster::recoverWrongTokens: Cannot be reward token"
        );

        IERC20(_tokenAddress).safeTransfer(msg.sender, _tokenAmount);

        emit AdminTokenRecovery(_tokenAddress, _tokenAmount);
    }

    /**
     * @notice It allows the admin to update dividend master setting
     * @dev This function is only callable by admin.
     */
    function updateDivindingPeriod(uint256 _newCountBlock) external onlyOwner {
        require(
            _newCountBlock != dividendingBlockCount,
            "dividendMaster::updateDivindingPeriod: New dividending same old value"
        );

        // Set the dividend period as the block count
        dividendingBlockCount = _newCountBlock;

        emit updateDividingPeriod(_newCountBlock);
    }

    function updateDelayProcessPeriod(
        uint256 _newCountBlock
    ) external onlyOwner {
        require(
            _newCountBlock != delayProcessBlockCount,
            "dividendMaster::updateLockProcessPeriod: New lock period same old value"
        );

        // Set the dividend period as the block count
        delayProcessBlockCount = _newCountBlock;

        emit updateLockPeriod(_newCountBlock);
    }

    /*
     * @notice profit payment balance
     */
    function getCurrenthares() public view returns (uint256) {
        return currentShares;
    }

    /*
     * @notice shares limit is exceed or not
     */
    function checkNotExceedShares(
        uint256 newshare
    ) public view returns (bool isNotExceed) {
        isNotExceed = (getCurrenthares().add(newshare) < LimitShares);
    }

    /*
     * @notice get shares remain in pool
     */
    function getRemainShares() public view returns (uint256 remain) {
        remain = LimitShares.sub(getCurrenthares());
    }

    /*
     * @notice dividend payout period is finish or not
     */
    function isPoolNotFinish() public view returns (bool isOn) {
        isOn = (block.number < startPoolBlock.add(payoutPeriodBlockCount));
    }

    /*
     * @notice check that is pool ready to use so must enable and be in payout period
     */
    function isPoolReady() public view returns (bool isReady) {
        isReady = (isPoolNotFinish() && isEnablePool);
    }

    function setFundTo(address _newAddress) external onlyOwner {
        address _oldAddress = feeTo;

        require(
            _newAddress != _oldAddress,
            "dividendMaster::setFeeTo: New Fee Address same old value"
        );
        feeTo = _newAddress;

        emit SetFeeToDev(_oldAddress, _newAddress);
    }

    function setReservedTo(address _newAddress) external onlyOwner {
        address _oldAddress = fairReserved;
        require(
            _newAddress != _oldAddress,
            "dividendMaster::setFeeTo: New Reserved Address same old value"
        );
        fairReserved = _newAddress;

        emit SetFeeToReserved(_oldAddress, _newAddress);
    }

    function setEnablePool(bool _newStatus) external onlyOwner {
        bool _oldStatus = isEnablePool;
        require(
            _newStatus != _oldStatus,
            "dividendMaster::setEnable: New Status same old value"
        );
        isEnablePool = _newStatus;

        emit SetEnable(_newStatus);
    }

    function updateFeePercentage(uint256 _feePercentage) external onlyOwner {
        require(
            _feePercentage <= 1e16, // not over 1%
            "dividendMaster::updateFeePercentage: Fee percentage exceed"
        );

        feePercentage = _feePercentage;
        emit updateFee(_feePercentage);
    }

    function updateFeeDistributePercentage(
        uint256 _feeToDevPercentage
    ) external onlyOwner {
        require(
            _feeToDevPercentage <= 5e17, // not over 50%
            "dividendMaster::updateFeeDistributePercentage: Fee to dev percentage exceed"
        );

        feeToDevPercentage = _feeToDevPercentage;
        emit updateFeeDistribution(_feeToDevPercentage);
    }

    function setLimitShares(uint256 _newLimit) external onlyOwner {
        uint256 _oldLimit = LimitShares;
        require(
            _newLimit != _oldLimit,
            "dividendMaster::setLimitShares: New Limit same old limit shares"
        );
        LimitShares = _newLimit;

        emit SetShares(_newLimit);
    }
}

interface IERC20Dividends {
    function mint(address to, uint256 amount) external;

    function burn(address from, uint256 amount) external;

    function distribute(uint256 amount) external;

    function balanceOf(address account) external view returns (uint256);
}
