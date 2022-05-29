import React, { BaseSyntheticEvent } from "react";
import { Button } from "@nextui-org/react";

export interface Tab<T> {
  label: string;
  value: T;
}

interface TabsProps<T> {
  selected: T;
  tabs: Tab<T>[];
  onClickTab: (selected?: Tab<T>) => void;
}

function Tabs<T>({ onClickTab, selected, tabs }: TabsProps<T>) {
  const handleClickTab = (
    e: BaseSyntheticEvent<any, HTMLButtonElement, HTMLSpanElement>
  ) => {
    const selectedTab = tabs.find((t) => t.label === e.target.innerHTML);
    onClickTab(selectedTab);
  };

  return (
    <>
      <Button.Group color="gradient" ghost>
        {tabs.map((tab: Tab<T>) => (
          <Button
            onClick={handleClickTab as any}
            key={tab.label}
            css={
              selected === tab.value
                ? {
                    background: "$gradient",
                    color: "$white",
                  }
                : undefined
            }
          >
            {tab.label}
          </Button>
        ))}
      </Button.Group>
    </>
  );
}

export default Tabs;
