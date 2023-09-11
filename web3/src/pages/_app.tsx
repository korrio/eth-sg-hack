import '@/styles/globals.css';

// import { AppProps } from 'next/app';
// import type { ReactElement, ReactNode } from 'react';
// import type { NextPage } from 'next';

import Head from 'next/head';
import { MetaMaskContextProvider } from '@/hooks/useMetaMask';
import { Toaster } from 'react-hot-toast';

// export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
//   getLayout?: (page: ReactElement) => ReactNode;
// };
//
// type AppPropsWithLayout = AppProps & {
//   Component: NextPageWithLayout;
// };

function MyApp({ Component, pageProps }: any) {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <MetaMaskContextProvider>
      <Head>
        <title>DIVPAY</title>
      </Head>
      <Toaster position="top-center" reverseOrder={false} />
      <div>{getLayout(<Component {...pageProps} />)}</div>
    </MetaMaskContextProvider>
  );
}

export default MyApp;
