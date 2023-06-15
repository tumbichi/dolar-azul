import React, { FC, useEffect, useMemo, useState } from "react";
// import { useTranslation } from "react-i18next";
// import Skeleton from "react-loading-skeleton";

import { Currency, CurrencyTypes } from "../../models";
import { useCurrency } from "react-hook-currency";
import { useCurrencyValue } from "../../context/BlueContext";
import { CurrencyInput } from "../../components";
import { Repeat } from "react-feather";
import styles from "./CalculateConversion.module.css";
import btnStyles from "./Button.module.css";

interface CalculateConversionProps {
  currency: Currency;
  currencyType: CurrencyTypes;
  title: string;
  toARS?: boolean;
}

const currencies = {
  [Currency.USDBlue]: "USD" /*  Blue */,
  [Currency.USD]: "USD",
  [Currency.EURBlue]: "EUR" /*  Blue */,
  [Currency.EUR]: "EUR",
  [Currency.ARS]: "ARS",
};

const CalculateConversion: FC<CalculateConversionProps> = ({
  currency,
  currencyType,
}) => {
  // const { t } = useTranslation();
  const { loading, currencyValue } = useCurrencyValue(currency);
  const { onClick, onChange, onKeyDown, format, toNumber } = useCurrency({
    style: "decimal",
  });

  const [value, setValue] = useState<string>(format("000"));
  const [result, setResult] = useState<string>(format("000"));
  const [toARS, setToArs] = useState<boolean>(false);

  const [currencyTypeValue, setCurrencyTypeValue] = useState<
    number | undefined
  >(currencyValue?.valueAvg);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setValue(e.target.value);
  };

  const toogleToArs = () => {
    setValue(result);
    setToArs((prev) => !prev);
  };

  useEffect(() => {
    if (value && !loading) {
      const valueNumber = toNumber(value);
      if (!currencyTypeValue) return;
      if (toARS) {
        const resultNum = valueNumber * currencyTypeValue;
        setResult(format(resultNum.toFixed(2)));
      } else {
        const arsValue = 1 / currencyTypeValue;
        const resultNum = valueNumber * arsValue;
        setResult(format(resultNum.toFixed(2)));
      }
    }
  }, [value, loading, currencyTypeValue, format, toARS, toNumber]);

  useEffect(() => {
    setValue((prev) => {
      const newValue = new String(prev) as string;
      return newValue;
    });
  }, [currency]);

  useEffect(() => {
    if (currencyValue) {
      switch (currencyType) {
        case CurrencyTypes.AVERAGE: {
          return setCurrencyTypeValue(currencyValue.valueAvg);
        }
        case CurrencyTypes.BUY: {
          return setCurrencyTypeValue(currencyValue.valueBuy);
        }
        case CurrencyTypes.SELL: {
          return setCurrencyTypeValue(currencyValue.valueSell);
        }
      }
    }
  }, [currencyValue, currencyType]);

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        {!toARS ? "🇦🇷 ARG" : "🇺🇸 USD"}
        <CurrencyInput
          value={value}
          moneySign={currencies[currency] === "EUR" && !toARS ? "€" : "$"}
          onChange={handleValueChange}
          onKeyDown={onKeyDown}
          onClick={onClick}
        />
      </div>
      <button className={btnStyles.button__container} onClick={toogleToArs}>
        <Repeat size={24} />
      </button>
      <div className={styles.inputContainer}>
        {toARS ? "🇦🇷 ARG" : "🇺🇸 USD"}
        <CurrencyInput
          value={Number.isNaN(Number.parseFloat(result + "")) ? "" : result}
          moneySign={currencies[currency] === "EUR" && !toARS ? "€" : "$"}
        />
      </div>
      {/* <Card>
      <Card.Header>
        <Text b>{title}</Text>
      </Card.Header>
      <Divider />
      <Card.Body
        css={{
          py: "$10",
          display: "flex",
          gap: "$10",
        }}
      >
        {loading ? (
          <div>
            <Skeleton height={21} width={"40%"} />
            <Skeleton height={40} />
          </div>
        ) : (
          <Input
            bordered
            label={
              toARS
                ? t("calculate.convertFrom", {
                    currency: currencies[currency],
                  })
                : t("calculate.convertFrom", {
                    currency: currencies["peso_argentino"],
                  })
            }
            type="text"
            labelLeft={currencies[currency] === "EUR" && toARS ? "€" : "$"}
            labelRight={
              toARS ? currencies[currency] : currencies["peso_argentino"]
            }
            value={value}
            onChange={handleValueChange}
            onKeyDown={onKeyDown}
            onClick={onClick}
          />
        )}
        {loading ? (
          <div>
            <Skeleton height={21} width={"40%"} />
            <Skeleton height={40} />
          </div>
        ) : (
          <Input
            readOnly
            bordered
            labelLeft={currencies[currency] === "EUR" && !toARS ? "€" : "$"}
            label={
              toARS
                ? t("calculate.convertTo", {
                    currency: currencies["peso_argentino"],
                  })
                : t("calculate.convertTo", {
                    currency: currencies[currency],
                  })
            }
            value={Number.isNaN(Number.parseFloat(result + "")) ? "" : result}
            labelRight={
              !toARS ? currencies[currency] : currencies["peso_argentino"]
            }
          />
        )}
        
      </Card.Body>
    </Card> */}
    </div>
  );
};

export default CalculateConversion;
