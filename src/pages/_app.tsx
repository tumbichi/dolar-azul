import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import "../i18n";
import BlueProvider from "../context/BlueContext/BlueProvider";
import "react-loading-skeleton/dist/skeleton.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BlueProvider>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </BlueProvider>
  );
}

export default MyApp;
