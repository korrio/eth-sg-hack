import BlankLayout from '@/components/layouts/BlankLayout';
import { useFairmaster } from '@/hooks/useFairmaster';
import { formatEther } from 'ethers/lib/utils';
import { ReactElement } from 'react';

const Dashboard = () => {
  const { profitBalance, distributeDividend } = useFairmaster();
  return (
    <>
      <div className="container space-y-10 lg:space-y-20 mx-auto">
        <div className="w-full p-4 md:w-1/2">
          <div className="h-full p-4 shadow-xl shadow-blue-700/10 lg:p-6">
            <h2 className="mb-2 text-sm font-bold lg:mb-6 lg:text-base">
              Profit Available
            </h2>
            <div>
              <div className="text-xl font-semibold lg:text-2xl">
                {profitBalance ? formatEther(profitBalance) : '0'}
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
      </div>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <BlankLayout>{page}</BlankLayout>;
};

export default Dashboard;
