/* eslint-disable react-hooks/rules-of-hooks */
import { ethers } from 'ethers';

import { useMemo } from 'react';
import { contracts } from '@/constants/contracts';
import { useMetaMask } from './useMetaMask';

export const useContract = (contractName: string) => {
  const { wallet, sdkConnected } = useMetaMask();

  const contractInfo = contracts[contractName];
  if (!contractInfo) return null;

  const provider = new ethers.providers.Web3Provider(
    window.ethereum as unknown as ethers.providers.ExternalProvider
  );

  const signer = provider.getSigner();

  return useMemo(() => {
    const address = contractInfo.address[wallet.chainId];
    const { abi } = contractInfo;

    if (!address || address.length === 0 || !abi) {
      return null;
    }

    return new ethers.Contract(address, abi, signer);
  }, [contractInfo.address, contractInfo.abi, wallet.chainId, sdkConnected]);
};
