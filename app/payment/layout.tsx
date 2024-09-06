import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <>
        <meta name="referrer" content="origin-when-crossorigin" />
        <Script src="https://tap-sdks.b-cdn.net/card/1.0.2/index.js" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.4/bluebird.min.js" />
        <Script src="https://secure.gosell.io/js/sdk/tap.min.js" />
      </>
      {children}
    </>
  );
}
{
  /* <Head>
  <meta name="referrer" content="origin-when-crossorigin"></meta>
</Head> */
}
