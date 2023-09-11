// import { ethers } from 'ethers';
import { useEffect } from 'react';

import { useContract } from './useContract';
import { useMetaMask } from './useMetaMask';

export const useTokenBalance = (symbol: string) => {
  const { wallet } = useMetaMask();

  // const [balance, setBalance] = useState(ethers.utils.parseEther('0'));
  // const [balance, setBalance] = useState('')
  const tokenContract = useContract(symbol);

  const getBalance = async () => {
    // const balance = await web3Provider.getBalance(address)
    const balance = await tokenContract?.balanceOf(wallet.address);
    console.log('balance', balance);
    // setBalance(balance);
  };

  useEffect(() => {
    getBalance();
  }, [wallet.chainId]);

  // return balance;
};
