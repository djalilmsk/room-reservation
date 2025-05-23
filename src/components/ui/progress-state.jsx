import React from "react";

function ProgressState({ max, value }) {
  const normalizedValue = Math.min(Math.max(value, 0), max);

  const items = [];
  for (let i = 0; i < max; i++) {
    const stepNumber = i + 1;
    items.push(
      <Step
        key={"step" + i}
        isActive={stepNumber === 1 || stepNumber <= normalizedValue + 1}
        stepNumber={stepNumber}
      />
    );
    if (i < max - 1) {
      items.push(
        <Connector
          key={"connector" + i}
          isActive={i < normalizedValue}
        />
      );
    }
  }

  return (
    <div className="flex w-full items-center gap-4 justify-between">
      {items}
    </div>
  );
}

const Step = ({ isActive, stepNumber }) => {
  return (
    <div
      className={`flex h-7 min-w-7 items-center justify-center rounded-full text-sm ${
        isActive ? "bg-primary text-background" : "bg-secondary text-background"
      }`}
    >
      {stepNumber}
    </div>
  );
};

const Connector = ({ isActive }) => (
  <div
    className={`h-[1px] w-full rounded-full ${
      isActive ? "bg-primary" : "bg-secondary"
    }`}
  />
);

export { ProgressState };
