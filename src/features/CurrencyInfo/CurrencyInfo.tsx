import { Card, Text } from "@nextui-org/react";
import React, { FC } from "react";
import { useCurrencyValue } from "../../context/BlueContext";
import { Currency } from "../../models";

const formatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});

interface CurrencyInfoProps {
  currencyType: Currency;
  currencyLabel?: string;
}

const CurrencyInfo: FC<CurrencyInfoProps> = ({
  currencyLabel,
  currencyType,
}) => {
  const { loading, currencyValue } = useCurrencyValue(currencyType);

  /*.item {
          background: #c4c4c4;
          border-width: 2px;
          border-style: solid;

          border-image: linear-gradient(
              112deg,
              #06b7db -63.59%,
              #ff4ecd -20.3%,
              #0072f5 70.46%
            )
            1;
        } */
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

      <div className="container">
        <div className="card-border">
          <Card className="item">
            <Text color="black" b>
              Compra
            </Text>
            <Text color="black">
              {currencyValue?.valueBuy &&
                formatter.format(currencyValue?.valueBuy)}
            </Text>
          </Card>
        </div>
        <div className="card-border">
          <Card className="item">
            <Text color="black" b>
              Venta
            </Text>
            <Text color="black">
              {currencyValue?.valueSell &&
                formatter.format(currencyValue?.valueSell)}
            </Text>
          </Card>
        </div>
        <div className="card-border">
          <Card
            css={{
              boxShadow: "none",
            }}
            // bordered
            /* css={{
              borderImage:
                "linear-gradient(112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%) 1",
            }} */
            className="item"
          >
            <Text color="black" b>
              Promedio{" "}
            </Text>
            <Text color="black">
              {currencyValue?.valueAvg &&
                formatter.format(currencyValue?.valueAvg)}
            </Text>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CurrencyInfo;
