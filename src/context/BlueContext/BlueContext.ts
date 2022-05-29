import { createContext } from "react";
import { StateLastestValues } from "../../models";

interface BlueContext {
  loading: boolean;
  lastestValues?: StateLastestValues;
}

export default createContext<BlueContext | undefined>(undefined);
