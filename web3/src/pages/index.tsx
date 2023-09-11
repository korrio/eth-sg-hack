import BlankLayout from '@/components/layouts/BlankLayout';
import { ReactElement, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useTokenBalance } from '@/hooks/useTokenBalance';
import { formatEther } from 'ethers/lib/utils';
import { useXFair } from '@/hooks/useXFair';
import { useFairmaster } from '@/hooks/useFairmaster';

const Home = () => {
  const [provider, setProvider] = useState<any>(null);
  const {
    cumulativeDividendsOf,
    withdrawnDividendsOf,
    withdrawableDividendsOf,
    collect,
  } = useXFair();

  const { profitBalance, currenthares, accDisbursed } = useFairmaster();
  const balance = useTokenBalance('XFAIR');
  let shared = 0;
  let rawProfitBalance = 0;
  let estimatedProfit = 0;
  if (balance) {
    shared =
      (parseInt(formatEther(balance)) / parseInt(formatEther(currenthares))) *
      100;
  }
  if (balance) {
    rawProfitBalance = parseInt(formatEther(profitBalance));
  }

  if (balance) {
    estimatedProfit = rawProfitBalance / shared;
  }

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
  return (
    <>
      <div className="container space-y-10 lg:space-y-20 mx-auto">
        <section className="flex flex-wrap">
          <div className="w-full p-4 md:w-1/2">
            <div className="h-full p-4 shadow-xl shadow-blue-700/10 lg:p-6">
              <h2 className="mb-2 text-sm font-bold lg:mb-6 lg:text-base">
                Your Assets
              </h2>
              <div className="flex flex-wrap">
                <div className="w-1/2 sm:block">
                  <div className="truncate text-sm text-gray-500">Balance</div>
                  <div className="mt-1 text-xl font-semibold lg:text-2xl">
                    <div className="text-xl font-semibold lg:text-2xl">
                      {balance ? formatEther(balance) : '-'}
                      <span className="text-xs text-gray-500 lg:text-sm">
                        XFR
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 sm:block">
                  <div className="text-xs text-gray-500 lg:text-sm">Shared</div>
                  <div className="mt-1 text-xl text-gray-500 font-semibold lg:text-2xl">
                    ~{balance && currenthares ? shared.toFixed(2) : ''}%
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-4 text-white md:w-1/2">
            <div className="h-full bg-primary-color p-4 text-white shadow-xl shadow-blue-700/10 lg:p-6">
              <h2 className="mb-2 text-sm font-bold lg:mb-6 lg:text-base">
                Your Profit
              </h2>
              <div>
                <div className="text-xl font-semibold lg:mt-6 lg:text-2xl">
                  {cumulativeDividendsOf
                    ? formatEther(cumulativeDividendsOf)
                    : '0'}
                  <span className="text-xs lg:text-sm">USDC</span>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-xs text-white/60 lg:text-sm">
                  Already claimed
                  {withdrawnDividendsOf
                    ? formatEther(withdrawnDividendsOf)
                    : '0'}
                  USDC in total
                </div>
              </div>
            </div>
          </div>
        </section>
        <div>
          <h2 className="text-2xl font-bold mb-4">Invest to earn USDC</h2>
          <div className="cursor-pointer space-y-8 border bg-white p-4 shadow-lg shadow-gray-500/5 lg:space-y-10 lg:p-6">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2">
                <div className="flex">
                  <div className="mr-4 h-12 w-12 flex-shrink-0"></div>
                  <div>
                    <h2 className="text-xl font-semibold lg:text-2xl">
                      Tiny Coffee Venture
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="hidden w-1/2 sm:block sm:w-1/3 lg:w-1/4 hidden">
                <div className="truncate text-sm text-gray-500">
                  Total Equity
                </div>
                <div className="mt-1 text-xl font-semibold lg:text-2xl">
                  {currenthares
                    ? parseInt(formatEther(currenthares)).toFixed(4)
                    : '0'}
                  <span className="text-xs font-normal text-gray-500 lg:text-sm">
                    xDVI
                  </span>
                </div>
              </div>
              <div className="w-1/2 sm:w-1/3 lg:w-1/4">
                <div className="truncate text-sm text-gray-500">
                  Profit Distributed
                </div>
                <div className="mt-1 text-xl font-semibold lg:text-2xl">
                  {accDisbursed
                    ? parseInt(formatEther(accDisbursed)).toFixed(4)
                    : '0'}
                  <span className="text-xs font-normal text-gray-500 lg:text-sm">
                    USDC
                  </span>
                </div>
              </div>
              <div className="w-1/2 sm:w-1/3 lg:w-1/4">
                <div className="truncate text-sm text-gray-500">
                  Profit To Be Distribute
                </div>
                <div className="mt-1 text-xl font-semibold lg:text-2xl">
                  {rawProfitBalance}
                  <span className="text-xs font-normal text-gray-500 lg:text-sm">
                    USDC
                  </span>
                </div>
              </div>
              <div className="mt-8 w-full border-t pt-6 lg:mt-0 lg:w-1/4 lg:border-t-0 lg:pt-0">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="truncate text-sm text-gray-500">
                      Estimated Profit
                    </div>
                    <div className="mt-1 text-xl font-bold lg:text-2xl">
                      ~ {estimatedProfit?.toFixed(2)}
                      <span className="text-xs font-normal text-gray-500 lg:text-sm">
                        USDC
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 lg:p-6">
            <div className="flex flex-wrap space-y-4 md:space-y-0">
              <div className="w-full md:w-1/2">
                <div className="flex flex-wrap space-y-4 sm:space-y-0"></div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex flex-wrap space-y-4 sm:space-y-0">
                  <div className="w-full sm:w-1/2">
                    <div className="truncate text-sm text-gray-500 md:mr-3">
                      Withdrawable Profit
                    </div>
                    <div className="text-xl font-bold lg:text-2xl text-gray-300">
                      {withdrawableDividendsOf
                        ? formatEther(withdrawableDividendsOf)
                        : '0'}
                    </div>
                  </div>
                  <div className="w-full self-center sm:w-1/2">
                    <button
                      type="button"
                      className="w-full md:w-auto border-primary-color bg-primary-color text-white hover:bg-white hover:text-primary-color disabled:border-gray-300 disabled:text-gray-300 py-2 px-4 text-sm base-transition rounded-md border font-semibold leading-[22px] focus:outline-none"
                      onClick={collect}
                    >
                      Collect Yours
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <BlankLayout>{page}</BlankLayout>;
};

export default Home;
