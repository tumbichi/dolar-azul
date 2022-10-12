import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../i18n";
import BlueProvider from "../context/BlueContext/BlueProvider";
import "react-loading-skeleton/dist/skeleton.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BlueProvider>
      <Component {...pageProps} />
    </BlueProvider>
  );
}

export default MyApp;
