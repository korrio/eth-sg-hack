import ERC20Abi from './abis/ERC20.abi.json';
import FAIRMasterAbi from './abis/fairMaster.abi.json';
import XFAIRAbi from './abis/XFAIR.abi.json';

export const contracts: any = {
  USDC: {
    address: {
      '0xe704': '0x48a37bfb684d39d2878c220951a2ef9545041164',
    },
    abi: ERC20Abi,
  },
  FAIR_MASTER: {
    address: {
      '0xe704': '0xE277912529597Ede71F5b0Fd1807aBb944B69913',
    },
    abi: FAIRMasterAbi,
  },
  XFAIR: {
    address: {
      '0xe704': '0x4411b8a6195773481d20ff18891f23afb5b8e34d',
    },
    abi: XFAIRAbi,
  },
};
