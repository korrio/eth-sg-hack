/* eslint-disable react-hooks/rules-of-hooks */
import { ethers } from 'ethers';

import { useEffect, useMemo, useState } from 'react';
import { contracts } from '@/constants/contracts';
import { useMetaMask } from './useMetaMask';

export const useContract = (contractName: string) => {
  const [provider, setProvider] = useState<any>(null);
  const [signer, setSigner] = useState<any>('');

  useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as any
        );
        setProvider(provider);
      }
    };

    initializeProvider();
  }, []);
  console.log('provider', provider);

  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      console.log('signer', signer);
      setSigner(signer);
    }
  }, [provider]);
  const { wallet, sdkConnected } = useMetaMask();

  const contractInfo = contracts[contractName];
  if (!contractInfo) return null;

  return useMemo(() => {
    const address = contractInfo.address[wallet.chainId];
    const { abi } = contractInfo;

    if (!address || address.length === 0 || !abi) {
      return null;
    }

    return new ethers.Contract(address, abi, signer);
  }, [contractInfo.address, contractInfo.abi, wallet.chainId, sdkConnected]);
};
