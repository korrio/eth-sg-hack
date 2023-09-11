// import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import { useContract } from './useContract';
import { useMetaMask } from './useMetaMask';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

export const useFairmaster = () => {
  const xFairContract = useContract('FAIR_MASTER');
  const { wallet } = useMetaMask();
  const [profitBalance, setProfitBalance] = useState(
    ethers.utils.parseEther('0')
  );
  const [currenthares, setCurrenthares] = useState(
    ethers.utils.parseEther('0')
  );
  const [accDisbursed, setAccDisbursed] = useState(
    ethers.utils.parseEther('0')
  );
  const [remainShares, setRemainShares] = useState(
    ethers.utils.parseEther('0')
  );

  useEffect(() => {
    const checkProfitBalance = async () => {
      if (!wallet.address) {
        return [];
      }

      const result = await xFairContract?.profitBalance();
      if (result) {
        setProfitBalance(result);
      }
      return result;
    };

    const checkCurrenthares = async () => {
      if (!wallet.address) {
        return [];
      }

      const result = await xFairContract?.getCurrenthares();
      if (result) {
        setCurrenthares(result);
      }
      return result;
    };

    const checkAccDisbursed = async () => {
      if (!wallet.address) {
        return [];
      }

      const result = await xFairContract?.accDisbursed();
      if (result) {
        setAccDisbursed(result);
      }
      return result;
    };

    const checkRemainShares = async () => {
      if (!wallet.address) {
        return [];
      }

      const result = await xFairContract?.getRemainShares();
      if (result) {
        setRemainShares(result);
      }
      return result;
    };

    checkProfitBalance();
    checkCurrenthares();
    checkAccDisbursed();
    checkRemainShares();
  }, [wallet.address]);

  const distributeDividend = async () => {
    if (!wallet.address) {
      return false;
    }
    try {
      const response = await xFairContract?.distributeDividend();
      console.log(response);
      toast.promise(response.wait(), {
        loading: 'Claiming...',
        success: `Your Profit has been collected`,
        error: (error) => error,
      });
      return true;
    } catch (error) {
      toast.error('Failed');
      return false;
    }
  };

  const depositHolderShares = async () => {
    if (!wallet.address) {
      return false;
    }
    try {
      const response = await xFairContract?.depositHolderShares();
      console.log(response);
      toast.promise(response.wait(), {
        loading: 'Claiming...',
        success: `Your Profit has been collected`,
        error: (error) => error,
      });
      return true;
    } catch (error) {
      toast.error('Failed');
      return false;
    }
  };

  return {
    profitBalance,
    currenthares,
    accDisbursed,
    remainShares,
    depositHolderShares,
    distributeDividend,
  };
};
