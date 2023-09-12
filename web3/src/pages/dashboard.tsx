import BlankLayout from '@/components/layouts/BlankLayout';
import { useFairmaster } from '@/hooks/useFairmaster';
import { formatEther } from 'ethers/lib/utils';
import { ReactElement } from 'react';

const Dashboard = () => {
  const {
    profitBalance,
    distributeDividend,
    remainShares,
    depositHolderShares,
  } = useFairmaster();
  return (
    <>
      <div className="container space-y-10 lg:space-y-20 mx-auto">
        <section className="-m-4 flex flex-wrap">
          <div className="w-full p-4 md:w-1/2">
            <div className="h-full p-4 shadow-xl shadow-blue-700/10 lg:p-6">
              <h2 className="mb-2 text-sm font-bold lg:mb-6 lg:text-base">
                Profit Available
              </h2>
              <div>
                <div className="text-xl font-semibold lg:text-2xl">
                  {profitBalance
                    ? parseInt(formatEther(profitBalance)).toFixed(2)
                    : '0'}
                  <span className="text-xs text-gray-500 lg:text-sm">USDC</span>
                </div>
                <div className="w-full self-center sm:w-1/2">
                  <button
                    type="button"
                    className="w-full md:w-auto border-primary-color bg-primary-color text-white hover:bg-white hover:text-primary-color disabled:border-gray-300 disabled:text-gray-300 py-2 px-4 text-sm base-transition rounded-md border font-semibold leading-[22px] focus:outline-none"
                    onClick={distributeDividend}
                  >
                    Distribute
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-4 md:w-1/2">
            <div className="h-full p-4 shadow-xl shadow-blue-700/10 lg:p-6">
              <h2 className="mb-2 text-sm font-bold lg:mb-6 lg:text-base">
                Equity Available
              </h2>
              <div>
                <div className="text-xl font-semibold lg:text-2xl">
                  {remainShares
                    ? parseInt(formatEther(remainShares)).toFixed(2)
                    : '0'}
                  <span className="text-xs text-gray-500 lg:text-sm">XFR</span>
                </div>
              </div>
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Allocate to
              </label>
              <div className="mt-2 mb-3">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Amount
              </label>
              <div className="mt-2 mb-3">
                <input
                  type="number"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="w-full self-center sm:w-1/2">
                <button
                  type="button"
                  className="w-full md:w-auto border-primary-color bg-primary-color text-white hover:bg-white hover:text-primary-color disabled:border-gray-300 disabled:text-gray-300 py-2 px-4 text-sm base-transition rounded-md border font-semibold leading-[22px] focus:outline-none"
                  onClick={depositHolderShares}
                >
                  Transfer
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <BlankLayout>{page}</BlankLayout>;
};

export default Dashboard;
