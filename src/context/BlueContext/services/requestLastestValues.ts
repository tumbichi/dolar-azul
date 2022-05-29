import { StateLastestValues } from "../../../models";
import { ServerLastestValues } from "../../../models/ServerLastestValues";
import { mapServerLastestValuesToState } from "../../../utils";

async function requestLastestValues(): Promise<StateLastestValues> {
  const res = await fetch("api/currency");
  const data: ServerLastestValues = await res.json();

  return Promise.resolve(mapServerLastestValuesToState(data));
}

export default requestLastestValues;
