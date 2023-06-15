import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

import "../i18n";
import BlueProvider from "../context/BlueContext/BlueProvider";
import "react-loading-skeleton/dist/skeleton.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <BlueProvider>
        <Component {...pageProps} />
      </BlueProvider>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-0L2JQP3K3E" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-0L2JQP3K3E');
        `}
      </Script>
    </>
  );
}

export default MyApp;
