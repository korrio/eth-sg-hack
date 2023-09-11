// import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import { useContract } from './useContract';
import { useMetaMask } from './useMetaMask';
import { ethers } from 'ethers';

export const useXFair = () => {
  const xFairContract = useContract('XFAIR');
  const { wallet } = useMetaMask();
  const [cumulativeDividendsOf, setCumulativeDividendsOf] = useState(
    ethers.utils.parseEther('0')
  );
  const [withdrawnDividendsOf, setWithdrawnDividendsOf] = useState(
    ethers.utils.parseEther('0')
  );
  const [withdrawableDividendsOf, setWithdrawableDividendsOf] = useState(
    ethers.utils.parseEther('0')
  );

  useEffect(() => {
    const checkCumulativeDividendsOf = async () => {
      if (!wallet.address) {
        return [];
      }

      const result = await xFairContract?.cumulativeDividendsOf(wallet.address);
      if (result) {
        setCumulativeDividendsOf(result);
      }
      return result;
    };

    const checkWithdrawnDividendsOf = async () => {
      if (!wallet.address) {
        return [];
      }

      const result = await xFairContract?.withdrawnDividendsOf(wallet.address);
      if (result) {
        setWithdrawnDividendsOf(result);
      }
      return result;
    };

    const checkWithdrawableDividendsOf = async () => {
      if (!wallet.address) {
        return [];
      }

      const result = await xFairContract?.withdrawableDividendsOf(
        wallet.address
      );
      if (result) {
        setWithdrawableDividendsOf(result);
      }
      return result;
    };

    checkCumulativeDividendsOf();
    checkWithdrawnDividendsOf();
    checkWithdrawableDividendsOf();
  }, [wallet.address]);

  const collect = async () => {
    if (!wallet.address) {
      return false;
    }
    try {
      const response = await xFairContract?.collect();
      console.log(response);
      /* toast.promise(response.wait(), {
        loading: 'Claiming...',
        success: `Your Reward has beec claimed. (<a href="https://bscscan.com/tx/${response.hash}">View your transaction</a>)`,
        error: (error) => error,
      }); */
      return true;
    } catch (error) {
      // toast.error(error.message);
      return false;
    }
  };

  return {
    cumulativeDividendsOf,
    withdrawnDividendsOf,
    withdrawableDividendsOf,
    collect,
  };
};
