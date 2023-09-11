import BlankLayout from '@/components/layouts/BlankLayout';
import { ReactElement, useEffect, useState } from 'react';
import { ethers } from 'ethers';

const Home = () => {
  const [provider, setProvider] = useState<any>(null);

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
        <section className="-m-4 flex flex-wrap">
          <div className="w-full p-4 md:w-1/2">
            <div className="h-full p-4 shadow-xl shadow-blue-700/10 lg:p-6">
              <h2 className="mb-2 text-sm font-bold lg:mb-6 lg:text-base">
                Your Assets
              </h2>
              <div>
                <div className="text-xl font-semibold lg:text-2xl">
                  0.00{' '}
                  <span className="text-xs text-gray-500 lg:text-sm">xDVI</span>
                </div>
                <div className="mt-2 text-xs text-gray-300 lg:text-sm">
                  ~ $0
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-4 text-white md:w-1/2">
            <div className="h-full bg-blue-700 p-4 text-white shadow-xl shadow-blue-700/10 lg:p-6">
              <h2 className="mb-2 text-sm font-bold lg:mb-6 lg:text-base">
                Your Rewards
              </h2>
              <div>
                <div className="text-xl font-semibold lg:mt-6 lg:text-2xl">
                  0.00 <span className="text-xs lg:text-sm">BTC</span>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-xs text-white/60 lg:text-sm">
                  Already claimed 0.00 BTC in total
                </div>
              </div>
            </div>
          </div>
        </section>
        <div>
          <h2 className="text-2xl font-bold ">Stake DVI to earn BTCB</h2>
          <div className="cursor-pointer space-y-8 border bg-white p-4 shadow-lg shadow-gray-500/5 lg:space-y-10 lg:p-6">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2">
                <div className="flex">
                  <div className="mr-4 h-12 w-12 flex-shrink-0"></div>
                  <div>
                    <h2 className="text-xl font-semibold lg:text-2xl">
                      Stake Index Pool
                    </h2>
                    <p className="text-xs">
                      You have claimed 0.00 BTC from this pool
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 w-full md:mt-0 md:w-1/2">
                <div className="lg:flex lg:justify-end">
                  <div className="mr-4 inline-block bg-blue-50 py-[2px] px-1 text-sm font-bold text-blue-700">
                    The next disburse in
                  </div>
                  <div className="font-semibold">
                    0 days : 0 hours : 0 mins : 0 secs
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="hidden w-1/2 sm:block sm:w-1/3 lg:w-1/4">
                <div className="truncate text-sm text-gray-500">
                  Total Shares
                </div>
                <div className="mt-1 text-xl font-semibold lg:text-2xl">
                  99,999.1844
                  <span className="text-xs font-normal text-gray-500 lg:text-sm">
                    xDVI
                  </span>
                </div>
              </div>
              <div className="w-1/2 sm:w-1/3 lg:w-1/4">
                <div className="truncate text-sm text-gray-500">
                  Dividend Distributed
                </div>
                <div className="mt-1 text-xl font-semibold lg:text-2xl">
                  0.4871
                  <span className="text-xs font-normal text-gray-500 lg:text-sm">
                    BTC
                  </span>
                </div>
              </div>
              <div className="w-1/2 sm:w-1/3 lg:w-1/4">
                <div className="truncate text-sm text-gray-500">
                  Dividend To Be Distributed
                </div>
                <div className="mt-1 text-xl font-semibold lg:text-2xl">
                  0.00
                  <span className="text-xs font-normal text-gray-500 lg:text-sm">
                    BTC
                  </span>
                </div>
              </div>
              <div className="mt-8 w-full border-t pt-6 lg:mt-0 lg:w-1/4 lg:border-t-0 lg:pt-0">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="truncate text-sm text-gray-500">
                      Estimated Rewards
                    </div>
                    <div className="mt-1 text-xl font-bold lg:text-2xl text-gray-300">
                      0
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 lg:p-6">
            <div className="flex flex-wrap space-y-4 md:space-y-0">
              <div className="w-full md:w-1/2">
                <div className="flex flex-wrap space-y-4 sm:space-y-0">
                  <div className="w-full sm:w-1/2">
                    <div className="truncate text-sm text-gray-500 md:mr-3">
                      xDVI Staked
                    </div>
                    <div className="text-xl font-bold lg:text-2xl">0.00</div>
                  </div>
                  <div className="w-full self-center sm:w-1/2">
                    <button
                      type="button"
                      className="w-full md:w-auto bg-blue-700 hover:bg-blue-600 border-transparent text-white disabled:bg-gray-300 disabled:text-white py-2 px-4 text-sm base-transition rounded-md border font-semibold leading-[22px] focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed"
                    >
                      Stake Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex flex-wrap space-y-4 sm:space-y-0">
                  <div className="w-full sm:w-1/2">
                    <div className="truncate text-sm text-gray-500 md:mr-3">
                      Withdrawable Rewards
                    </div>
                    <div className="text-xl font-bold lg:text-2xl text-gray-300">
                      0.00
                    </div>
                  </div>
                  <div className="w-full self-center sm:w-1/2">
                    <button
                      type="button"
                      className="w-full md:w-auto border-blue-700 hover:bg-blue-700 text-blue-700 hover:text-white disabled:border-gray-300 disabled:text-gray-300 py-2 px-4 text-sm base-transition rounded-md border font-semibold leading-[22px] focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed"
                      disabled
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
