import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { Container, Row, Col, Text, Grid } from "@nextui-org/react";

import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "../components";
import { Currency } from "../models";
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
  const [selected, setSelected] = useState<Currency>(Currency.USDBlue);

  const handleClickTab = (tabSelected?: Tab<Currency>) => {
    if (tabSelected) {
      setSelected(tabSelected.value);
    }
  };

  const tabSelected = tabs.find((t) => t.value === selected);
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
            height: "calc(100vh - 2rem - 89px - 32px)",
            width: "100%",
          }}
        >
          <Row>
            <Col>
              <Text
                h1
                size={60}
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
                size={60}
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
            <Tabs selected={selected} tabs={tabs} onClickTab={handleClickTab} />
          </Row>
          <Row>
            <CurrencyInfo
              currencyType={selected}
              currencyLabel={tabSelected?.label}
            />
          </Row>
          <Grid.Container justify="center" gap={5}>
            <Grid xs={6}>
              <CalculateConversion
                currencyType={selected}
                title={`De 🇦🇷 Peso Argentino a ${flagSelected} ${tabSelected?.label}`}
              />
            </Grid>
            <Grid xs={6}>
              <CalculateConversion
                toARS
                currencyType={selected}
                title={`De ${flagSelected} ${tabSelected?.label} a 🇦🇷 Peso Argentino`}
              />
            </Grid>
          </Grid.Container>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
