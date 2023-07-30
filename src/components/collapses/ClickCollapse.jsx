export default function ClickCollapse({
  children,
  text,
  twBgPassive,
  twBgActive = twBgPassive,
}) {
  // [input:checked~&]:bg-secondary [input:checked~&]:text-secondary-content

  return (
    <div className={`collapse collapse-arrow body-container-color`}>
      <input type="checkbox" className="peer" />
      <div
        className={`collapse-title text-dark-content dark:text-white font-semibold body-container-color`}
      >
        {text}
      </div>
      <div
        className={`collapse-content text-dark-content body-container-color dark:text-white`}
      >
        {children}
      </div>
    </div>
  );
}
