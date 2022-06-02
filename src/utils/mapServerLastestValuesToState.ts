import { ServerLastestValues, StateLastestValues } from "../models";

function mapServerLastestValuesToState(
  lastestValues: ServerLastestValues
): StateLastestValues {
  return {
    euro_blue: {
      valueAvg: lastestValues.blue_euro.value_avg,
      valueBuy: lastestValues.blue_euro.value_buy,
      valueSell: lastestValues.blue_euro.value_sell,
    },
    euro_oficial: {
      valueAvg: lastestValues.oficial_euro.value_avg,
      valueBuy: lastestValues.oficial_euro.value_buy,
      valueSell: lastestValues.oficial_euro.value_sell,
    },
    usd_blue: {
      valueAvg: lastestValues.blue.value_avg,
      valueBuy: lastestValues.blue.value_buy,
      valueSell: lastestValues.blue.value_sell,
    },
    usd_oficial: {
      valueAvg: lastestValues.oficial.value_avg,
      valueBuy: lastestValues.oficial.value_buy,
      valueSell: lastestValues.oficial.value_sell,
    },
    peso_argentino: {
      valueAvg: -1,
      valueBuy: -1,
      valueSell: -1,
    },
    last_update: lastestValues.last_update,
  };
}

export default mapServerLastestValuesToState;
