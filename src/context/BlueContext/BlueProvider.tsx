import BlueContext from "./BlueContext";

import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { requestLastestValues } from "./services";
import { StateLastestValues } from "../../models";

const BlueProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [lastestValues, setLastestvalues] = useState<
    StateLastestValues | undefined
  >(undefined);

  useEffect(() => {
    setLoading(true);
    requestLastestValues().then((data) => {
      setLastestvalues(data);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
  }, []);

  return (
    <BlueContext.Provider value={{ loading, lastestValues }}>
      {children}
    </BlueContext.Provider>
  );
};

export default BlueProvider;
