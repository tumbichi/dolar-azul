import { StateCurrencyValue } from "./StateCurrencyValue";

export interface StateLastestValues {
  usd_blue: StateCurrencyValue;
  euro_blue: StateCurrencyValue;
  usd_oficial: StateCurrencyValue;
  euro_oficial: StateCurrencyValue;
  peso_argentino: StateCurrencyValue;
  last_update: Date;
}
