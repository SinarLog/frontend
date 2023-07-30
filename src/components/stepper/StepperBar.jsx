// TODO: Use custom stepper bar
export default function StepperBar({ steps, currentStep }) {
  return (
    <ul className="steps">
      {steps.map((item, index) => (
        <li
          key={index}
          className={`step ${
            (currentStep >= index || item.completed) && "step-success"
          } mx-2`}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
