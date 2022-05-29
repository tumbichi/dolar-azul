import { useContext } from "react";
import { Currency } from "../../../models";
import BlueContext from "../BlueContext";

function useCurrencyValue(currency: Currency) {
  const context = useContext(BlueContext);

  if (context === undefined) {
    throw new Error("useCurrencyValue must be used within a BlueProvider");
  }

  const { loading, lastestValues } = context;
  console.log("lastestValues", lastestValues);
  // console.log("lastestValues[currency]", lastestValues[currency]);
  return {
    loading,
    currencyValue: lastestValues ? lastestValues[currency] : undefined,
  };
}

export default useCurrencyValue;
