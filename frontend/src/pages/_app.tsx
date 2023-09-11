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
      <div>{getLayout(<Component {...pageProps} />)}</div>
    </>
  );
}

export default MyApp;
