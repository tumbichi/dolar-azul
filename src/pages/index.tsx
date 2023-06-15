import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import titleStyles from "../styles/Title.module.css";
import { useState } from "react";
import { Tab } from "../components";
import { Currency, CurrencyTypes } from "../models";

const tabs: Tab[] = [
  {
    label: "Dolar Blue",
    value: Currency.USDBlue,
  },
  {
    label: "Dolar Oficial",
    value: Currency.USD,
  },
  {
    label: "Euro Blue",
    value: Currency.EURBlue,
  },
  {
    label: "Euro Oficial",
    value: Currency.EUR,
  },
];

const CalculateConversion = dynamic(
  () => {
    return import("../features/CalculateConversion/CalculateConversion");
  },
  { ssr: false }
);

const CurrencyInfo = dynamic(
  () => {
    return import("../features/CurrencyInfo/CurrencyInfo");
  },
  { ssr: false }
);

const Home: NextPage = () => {
  const [currencySelected] = useState<Currency>(Currency.USDBlue);
  const [currencyTypeSelected, setCurrencyTypeSelected] =
    useState<CurrencyTypes>(CurrencyTypes.SELL);

  const handleCurrencyTypeChange = (tab?: Tab) => {
    if (tab) {
      const selectedValue =
        tab.label === "Promedio"
          ? CurrencyTypes.AVERAGE
          : tab.label === "Compra"
          ? CurrencyTypes.BUY
          : CurrencyTypes.SELL;

      setCurrencyTypeSelected(selectedValue);
    }
  };

  const tabSelected = tabs.find((t) => t.value === currencySelected);

  const flagSelected =
    tabSelected?.value === Currency.EURBlue ||
    tabSelected?.value === Currency.EUR
      ? "🇪🇺"
      : "🇺🇸";

  return (
    <div className={styles.container}>
      <Head>
        <title>Calculadora dolar blue a pesos argentinos</title>
        <meta
          name="description"
          content="Calculadora de dólar blue a pesos argentinos. La cotización y el precio del dólar hoy minuto a minuto. Seguí la información sobre el dólar blue. Analizá la evolución del tipo de cambio con tablas de dólar histórico. Mantenete informado para tomar las mejores decisiones de inversión."
        />
      </Head>

      <main className={styles.main}>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            // justifyContent: "space-around",
          }}
        >
          <div>
            <h1 className={titleStyles.title__container}>Dolar Azul</h1>
          </div>
          <div className="currency_info_container">
            <CurrencyInfo
              currency={currencySelected}
              currencyLabel={tabSelected?.label}
              currencyType={currencyTypeSelected}
              onCurrencyTypeChange={handleCurrencyTypeChange}
            />
          </div>
          <CalculateConversion
            currency={currencySelected}
            currencyType={currencyTypeSelected}
            title={`De 🇦🇷 Peso Argentino a ${flagSelected} ${tabSelected?.label}`}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
