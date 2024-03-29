import React, { FC } from "react";
import styles from "./CurrencyInput.module.css";

interface CurrencyInputProps {
  value: string;
  moneySign: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}

const CurrencyInput: FC<CurrencyInputProps> = ({
  moneySign = "$",
  value,
  onChange,
  onKeyDown,
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.moneySign}>{moneySign}</p>
      <input
        className={styles.input}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        size={value.length}
        readOnly={!Boolean(onChange)}
      />
    </div>
  );
};

export default CurrencyInput;
