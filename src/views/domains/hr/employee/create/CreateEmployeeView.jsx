/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import CreateEmployeeModel from "./CreateEmployeeModel";

// Components
import StepperButton from "../../../../../components/stepper/StepperButton";
import StepperBar from "../../../../../components/stepper/StepperBar";

// Views
import PersonalInformationView from "./forms/PersonalInformationView";
import WorkInformationView from "./forms/WorkInformationView";
import EmergencyContactView from "./forms/EmergencyContactsView";
import ConfirmationModal from "./confirm/ConfirmationModal";

export default function CreateNewEmployeeView() {
  const { fetchers, values, validators, handlers, blurs } =
    CreateEmployeeModel();

  useEffect(() => {
    fetchers.roles();
    fetchers.jobs();
    fetchers.managers();
  }, []);

  const FORMS = [
    <PersonalInformationView
      values={values}
      validators={validators}
      handlers={handlers}
      blurs={blurs}
    />,
    <WorkInformationView
      values={values}
      handlers={handlers}
      validators={validators}
      blurs={blurs}
    />,
    <EmergencyContactView
      values={values}
      handlers={handlers}
      validators={validators}
      blurs={blurs}
    />,
  ];

  return (
    <div className="!px-10 body-container">
      <div className="flex justify-start w-full ps-20 lg:ps-36 mb-4 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-semibold">Create Employee</h1>
      </div>
      <div className="flex flex-col w-full justify-center mb-8">
        <StepperBar currentStep={values.currentStep} steps={values.steps} />
      </div>
      <div className="w-full mb-8 flex justify-center">
        {FORMS[values.currentStep]}
      </div>
      <div className="flex justify-around">
        <StepperButton
          currentStep={values.currentStep}
          steps={values.steps}
          nextCallback={handlers.next}
          prevCallback={handlers.prev}
          confirmCallback={handlers.confirm}
          backCallback={handlers.navigateBack}
        />
      </div>
      <ConfirmationModal values={values} submitCallback={handlers.submit} />
    </div>
  );
}
