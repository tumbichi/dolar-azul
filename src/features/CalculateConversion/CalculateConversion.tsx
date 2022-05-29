import React, { FC, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Divider,
  FormElement,
  Input,
  Loading,
  Text,
  useInput,
} from "@nextui-org/react";
import Skeleton from "react-loading-skeleton";

import { Currency } from "../../models";
import { useTranslation } from "react-i18next";
import { useCurrency } from "react-hook-currency";
import { useCurrencyValue } from "../../context";

const formatter = new Intl.NumberFormat("es-AR", {
  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const formatterUSD = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

interface CalculateConversionProps {
  currencyType: Currency;
  title: string;
  toARS?: boolean;
}
// [🇺🇸, 🇪🇺, 🇦🇷]
const currencies = {
  [Currency.USDBlue]: "USD" /*  Blue */,
  [Currency.USD]: "USD",
  [Currency.EURBlue]: "EUR" /*  Blue */,
  [Currency.EUR]: "EUR",
  [Currency.ARS]: "ARS",
};

const CalculateConversion: FC<CalculateConversionProps> = ({
  currencyType,
  title,
  toARS,
}) => {
  const { t } = useTranslation();
  const { loading, currencyValue } = useCurrencyValue(currencyType);
  console.log("currencyValue :>> ", currencyValue);
  const { onClick, onChange, onKeyDown, format, toNumber } = useCurrency({
    style: "decimal",
  });

  const [value, setValue] = useState<string>(format("000"));
  const [result, setResult] = useState<string>("000");

  const handleValueChange = (e: React.ChangeEvent<FormElement>) => {
    onChange(e as any);
    // console.log(toNumber(e.target.value));
    setValue(e.target.value);
  };

  useEffect(() => {
    if (value && !loading) {
      const valueNumber = toNumber(value);
      if (toARS) {
        const resultNum = valueNumber * currencyValue.valueAvg;
        setResult(format(resultNum.toFixed(2)));
      } else {
        const arsValue = 1 / currencyValue.valueAvg;
        const resultNum = valueNumber * arsValue;
        setResult(format(resultNum.toFixed(2)));
      }
    }
  }, [value, loading]);

  useEffect(() => {
    setValue((prev) => {
      const newValue = new String(prev);
      return newValue;
    });
  }, [currencyType]);

  return (
    <>
      <Card bordered>
        {
          <>
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
                  // clearable
                  bordered
                  label={
                    toARS
                      ? t("calculate.convertFrom", {
                          currency: currencies[currencyType],
                        })
                      : t("calculate.convertFrom", {
                          currency: currencies["peso_argentino"],
                        })
                  }
                  type="text"
                  labelLeft={
                    currencies[currencyType] === "EUR" && toARS ? "€" : "$"
                  }
                  labelRight={
                    toARS
                      ? currencies[currencyType]
                      : currencies["peso_argentino"]
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
                  labelLeft={
                    currencies[currencyType] === "EUR" && !toARS ? "€" : "$"
                  }
                  label={
                    toARS
                      ? t("calculate.convertTo", {
                          currency: currencies["peso_argentino"],
                        })
                      : t("calculate.convertTo", {
                          currency: currencies[currencyType],
                        })
                  }
                  value={
                    Number.isNaN(Number.parseFloat(result + "")) ? "" : result
                  }
                  labelRight={
                    !toARS
                      ? currencies[currencyType]
                      : currencies["peso_argentino"]
                  }
                />
              )}
              {/* <Button color="gradient">Calcular</Button> */}
            </Card.Body>
          </>
        }
      </Card>
    </>
  );
};

export default CalculateConversion;
