import React, { BaseSyntheticEvent } from "react";
import { Button } from "@nextui-org/react";

export interface Tab<T> {
  label: string;
  value: T;
}

interface TabsProps<T> {
  selected: string;
  tabs: Tab<T>[];
  onClickTab: (selected?: Tab<T>) => void;
}

function Tabs<T>({ onClickTab, selected, tabs }: TabsProps<T>) {
  const handleClickTab = (
    e: BaseSyntheticEvent<any, HTMLButtonElement, HTMLSpanElement>
  ) => {
    const selectedTab = tabs.find((t) => {
      const tabElement = e.currentTarget.firstChild?.firstChild
        ?.firstChild as HTMLElement;
      if (tabElement !== null) {
        const tabLabel: string = tabElement.innerHTML;
        return t.label === tabLabel;
      }
      return false;
    });
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
              selected === tab.label
                ? {
                    background: "$gradient",
                    color: "$white",
                    height: "54px",
                  }
                : {
                    height: "54px",
                  }
            }
            auto
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0 8px",
              }}
            >
              <h6
                style={{
                  margin: "0",
                  padding: 0,
                  lineHeight: 1,
                  fontWeight: "300",
                }}
              >
                {tab.label}
              </h6>
              {typeof tab.value === "string" && (
                <p style={{ fontWeight: "500" }}>{tab.value}</p>
              )}
            </div>
          </Button>
        ))}
      </Button.Group>
    </>
  );
}

export default Tabs;
