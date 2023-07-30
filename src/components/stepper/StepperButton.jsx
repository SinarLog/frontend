/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

export default function StepperButton({
  currentStep,
  steps,
  nextCallback,
  prevCallback,
  confirmCallback,
  backCallback,
}) {
  const [isLastItem, setIsLastItem] = useState(false);
  const [isFirstItem, setIsFirstItem] = useState(true);

  useEffect(() => {
    if (currentStep === steps.length - 1) {
      setIsLastItem(true);
    } else if (currentStep === 0) {
      setIsFirstItem(true);
    } else {
      setIsLastItem(false);
      setIsFirstItem(false);
    }
  }, [currentStep]);

  const handleNext = (event) => {
    if (isLastItem) {
      confirmCallback();
    } else {
      nextCallback(event);
    }
  };

  const handleBack = (event) => {
    if (isFirstItem) {
      backCallback();
    } else {
      prevCallback(event);
    }
  };

  return (
    <>
      <button
        className="btn btn-ghost-neuro w-52 normal-case"
        onClick={handleBack}
      >
        {isFirstItem ? "Back" : "Previous"}
      </button>
      <button
        className="btn btn-secondary-normal text-white w-52 normal-case"
        disabled={!steps[currentStep].completed}
        onClick={handleNext}
      >
        {isLastItem ? "Confirm" : "Next"}
      </button>
    </>
  );
}
