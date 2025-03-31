import React from "react";

function ProgressState({ max, value }) {
  const normalizedValue = Math.min(Math.max(value, 0), max);

  const steps = Array.from({ length: max }, (_, index) => {
    const stepNumber = index + 1;
    return (
      <Step
        key={"step" + index}
        isActive={stepNumber === 1 || stepNumber <= normalizedValue + 1}
        stepNumber={stepNumber}
      />
    );
  });

  const connectors = Array.from({ length: max - 1 }, (_, index) => (
    <Connector key={"connector" + index} isActive={index < normalizedValue} />
  ));

  return (
    <div className="flex items-center justify-between gap-2">
      {steps.map((step, index) => (
        <React.Fragment key={"step-connector-" + index}>
          {step}
          {index < connectors.length && connectors[index]}
        </React.Fragment>
      ))}
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
