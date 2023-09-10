import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

// export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
//   getLayout?: (page: any) => ReactNode;
// };
//
// type AppPropsWithLayout = AppProps & {
//   Component: NextPageWithLayout;
// };

function MyApp({ Component, pageProps }: any) {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  return (
    <>
      <Theme>
        <div>{getLayout(<Component {...pageProps} />)}</div>
      </Theme>
    </>
  );
}

export default MyApp;
