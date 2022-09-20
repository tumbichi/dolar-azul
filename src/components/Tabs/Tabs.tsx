import React, { ChangeEvent, ReactNode } from "react";
import styles from "./Tabs.module.css";
export interface Tab {
  label: string;
  value: string;
}

interface TabsProps {
  selected: string;
  tabs: Tab[];
  onClickTab: (selected?: Tab) => void;
}

function Tabs({ onClickTab, selected, tabs }: TabsProps) {
  const handleChangeTab = (e: ChangeEvent<HTMLInputElement>) => {
    const [value, label] = e.target.value.replace(",", ".").split(",");

    onClickTab({
      value: value.replace(".", ","),
      label,
    });
  };

  return (
    <div>
      <div className={styles.tabs__container} onChange={handleChangeTab}>
        {tabs.map((t, index) => (
          <>
            {index === 1 && <div className={styles.divider} />}
            <div key={t.label} className={` ${styles.tab__container} `}>
              <input
                className={styles.tab__input}
                id={`currency${index}`}
                name="currency"
                type="radio"
                defaultChecked={selected === t.label}
                value={[String(t.value), t.label]}
              />
              <label
                className={`${
                  styles["tab__label-" + getClassnamePositionByIndex(index)]
                } ${styles.tab__label}`}
                htmlFor={`currency${index}`}
              >
                <div className={styles.tab__label_container}>
                  <h5 className={styles.tab__title}>{t.label}</h5>
                  <p className={styles.tab__value}>{t.value as ReactNode}</p>
                </div>
              </label>
            </div>
            {index === 1 && <div className={styles.divider} />}
          </>
        ))}
      </div>
    </div>
  );
}

const getClassnamePositionByIndex = (i: number) => {
  if (i === 0) {
    return "left";
  }
  if (i === 1) {
    return "center";
  }
  if (i === 2) {
    return "right";
  }
};

export default Tabs;
