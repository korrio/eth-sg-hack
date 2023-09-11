/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useQRCode } from 'next-qrcode';
import showToast from '@/utils/toast';

interface qrProps {
  address: string;
  assestaddress: string;
  exprietime: Date;
  amount: number;
  asset: string;
  rate: number;
  status: string;
}

const QR = ({
  address,
  assestaddress,
  exprietime,
  amount,
  asset,
  rate,
  status,
}: qrProps) => {
  const { Canvas } = useQRCode();
  const url = `https://metamask.app.link/send/${assestaddress}/transfer?address=${address}&uint256=${amount}e18`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      showToast.info('Copied', 'copied');
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  return (
    <>
      <div className="rounded-lg flex flex-col pt-2.5 mb-3">
        <label className="font-medium text-sm mb-2 text-center uppercase">
          Status
        </label>
        <p className="text-2xl text-center mb-4 font-normal">
          {status === 'watching' || 'new' ? 'Waiting for payment' : ''}
        </p>
        <label className="font-medium text-sm mb-2 text-center uppercase">
          Total {asset} Amount
        </label>
        <p className="text-4xl text-center text-secondary-color font-normal">
          {amount} {asset}
        </p>
        <div className="text-xs font-normal mt-2">
          Exchange rate: 1 {asset} = {rate} Baht
        </div>
      </div>
      <div className="my-6">
        <Canvas
          options={{
            margin: 4,
            width: 160,
          }}
          text={url}
        />
        <p className="text-sm font-normal mt-4">
          Send only <b>{asset}</b> to this deposit address
        </p>
      </div>
      <div className="rounded-lg flex flex-col text-left pt-2.5 pb-1.5 px-3 bg-pattern mb-3">
        <div>
          <label className="font-medium text-sm mb-2 text-neutral-400">
            {asset} Deposit address
          </label>
          <div className="flex mb-2 justify-between">
            <p className="text-sm break-all">{address}</p>
            <button
              className="hover:bg-gray-400 text-white font-bold px-4 rounded flex-none"
              onClick={handleCopy}
            >
              <svg
                className="h-5 w-5 text-white"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {' '}
                <path stroke="none" d="M0 0h24v24H0z" />{' '}
                <rect x="8" y="8" width="12" height="12" rx="2" />{' '}
                <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <label className="font-medium text-sm mb-2 text-neutral-400">
            Network
          </label>
          <p className="text-sm">Linea Chain</p>
        </div>
      </div>
    </>
  );
};
export default QR;
