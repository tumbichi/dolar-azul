import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { Container, Row, Col, Text, Grid } from "@nextui-org/react";

import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "../components";
import { Currency, CurrencyTypes } from "../models";
import { useTranslation } from "react-i18next";

const tabs: Tab<Currency>[] = [
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
  const { t } = useTranslation();
  const [currencySelected, setCurrencySelected] = useState<Currency>(
    Currency.USDBlue
  );
  const [currencyTypeSelected, setCurrencyTypeSelected] =
    useState<CurrencyTypes>(CurrencyTypes.SELL);

  const handleCurrencyTypeChange = (tab?: Tab<string>) => {
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
        <title>Calculadora dolar blue</title>
        <meta
          name="description"
          content="Calculadora de pesos argentinos a dolar blue"
        />
      </Head>

      <main className={styles.main}>
        <div
          style={{
            // height: "calc(100vh - 2rem - 89px - 32px)",
            width: "100%",
          }}
        >
          <Row>
            <Col>
              <Text
                h1
                // size={60}
                css={{
                  textGradient: "45deg, $blue600 -20%, $pink600 50%",
                  textAlign: "center",
                }}
                weight="bold"
              >
                Calculadora
              </Text>
              <Text
                h1
                // size={60}
                css={{
                  textGradient: "45deg, $purple600 -20%, $pink600 100%",
                  textAlign: "center",
                }}
                weight="bold"
              >
                Dolar Blue
              </Text>
            </Col>
          </Row>
          <Row justify="center">
            <CurrencyInfo
              currency={currencySelected}
              currencyLabel={tabSelected?.label}
              currencyType={currencyTypeSelected}
              onCurrencyTypeChange={handleCurrencyTypeChange}
            />
          </Row>
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
