import React, { FC } from "react";
import { Tab, Tabs } from "../../components";
import { useCurrencyValue } from "../../context/BlueContext";
import { Currency, CurrencyTypes } from "../../models";

const formatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});

interface CurrencyInfoProps {
  currency: Currency;
  currencyType: CurrencyTypes;
  currencyLabel?: string;
  onCurrencyTypeChange: (selected?: Tab) => void;
}

const CurrencyInfo: FC<CurrencyInfoProps> = ({
  currency,
  currencyType,
  onCurrencyTypeChange,
}) => {
  const { loading, currencyValue } = useCurrencyValue(currency);
  const selectedValue =
    currencyType === CurrencyTypes.AVERAGE
      ? "Promedio"
      : currencyType === CurrencyTypes.BUY
      ? "Compra"
      : "Venta";
  return (
    <>
      <style jsx>{`
        .container {
          flex: 1;
          margin: 0 30px 0;
          padding: 15px 0 0;
          display: flex;

          align-items: center;
          gap: 20px;
        }
        .card-border {
          flex: 1;
          border: double 2px transparent;
          border-radius: 16px;
          background-image: linear-gradient(
              112deg,
              #06b7db -63.59%,
              #ff4ecd -20.3%,
              #0072f5 70.46%
            ),
            linear-gradient(
              112deg,
              #06b7db -63.59%,
              #ff4ecd -20.3%,
              #0072f5 70.46%
            );
          background-origin: border-box;
          background-clip: content-box, border-box;
          box-shadow: var(--nextui-shadows-md);
        }
      `}</style>

      <Tabs
        tabs={[
          {
            label: "Promedio",
            value: formatter.format(currencyValue?.valueAvg || 0),
          },
          {
            label: "Compra",
            value: formatter.format(currencyValue?.valueBuy || 0),
          },
          {
            label: "Venta",
            value: formatter.format(currencyValue?.valueSell || 0),
          },
        ]}
        selected={selectedValue}
        onClickTab={onCurrencyTypeChange}
      />
    </>
  );
};

export default CurrencyInfo;
