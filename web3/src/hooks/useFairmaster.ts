// import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import { useContract } from './useContract';
import { useMetaMask } from './useMetaMask';
import { ethers } from 'ethers';

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

    checkProfitBalance();
    checkCurrenthares();
    checkAccDisbursed();
  }, [wallet.address]);

  const collect = async () => {
    if (!wallet.address) {
      return false;
    }
    console.log('dddddd');
    try {
      const response = await xFairContract?.collect();
      console.log(response);
      // toast.promise(response.wait(), {
      //   loading: 'Claiming...',
      //   success: `Your Reward has beec claimed. (<a href="https://bscscan.com/tx/${response.hash}">View your transaction</a>)`,
      //   error: (error) => error,
      // });
      return true;
    } catch (error) {
      // toast.error(error.message);
      return false;
    }
  };

  return {
    profitBalance,
    currenthares,
    accDisbursed,
    collect,
  };
};
