import { z } from "zod";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRoles, getJobs } from "../../../../../app/services/api/public";
import { NotifContext } from "../../../../../app/context/notif";
import {
  getManagersList,
  postCreateNewEmployee,
} from "../../../../../app/services/api/employee";
import {
  personalInformationSchema,
  workInformationSchema,
  emergencyInformation,
} from "./CreateEmployeeSchema";

const initPayload = {
  fullName: "",
  email: "",
  contractType: "",
  avatar: null,
  nik: "",
  npwp: "",
  gender: "",
  religion: "",
  phoneNumber: "",
  address: "",
  birthDate: null,
  maritalStatus: "",
  emergencyFullName: "",
  emergencyPhoneNumber: "",
  emergencyRelation: "",
  roleId: "",
  jobId: "",
  managerId: "",
  roleName: "",
  jobName: "",
  managerName: "",
};

const initSteps = [
  { completed: false, name: "Personal Information" },
  { completed: false, name: "Work Information" },
  { completed: false, name: "Emergency Contact" },
];

export default function CreateNewEmployeeModel() {
  const [payload, setPayload] = useState(initPayload);
  const [roles, setRoles] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [managers, setManagers] = useState([]);
  const [managerButtonDisabled, setManagerButtonDisabled] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState(initSteps);
  const { showAlert } = useContext(NotifContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   ****************************
   * HANDLERS SECTION
   ****************************
   */
  const handleFullNameOnChange = (event) => {
    setPayload({ ...payload, fullName: event.target.value });
  };

  const handleEmailOnChange = (event) => {
    setPayload({ ...payload, email: event.target.value });
  };

  const handleContractTypeOnChange = (event) => {
    setPayload({ ...payload, contractType: event.target.value });
  };

  const handleNIKOnChange = (event) => {
    setPayload({ ...payload, nik: event.target.value });
  };

  const handleNPWPOnChange = (event) => {
    // xx.xxx.xxx.x-xxx.xxx
    // xx xxx xxx x xxx xxx
    let str = "";
    let input = event.target.value.split(".").join("").split("-").join("");
    for (let i = 0; i < input.length; i++) {
      if (i === 2 || i === 5 || i === 8 || i === 12) {
        str = str + "." + input[i];
      } else if (i === 9) {
        str = str + "-" + input[i];
      } else if (i < 15) {
        str = str + input[i];
      } else {
        // do nothing
      }
    }
    setPayload({ ...payload, npwp: str });
  };

  const handleGenderOnChange = (event) => {
    setPayload({ ...payload, gender: event.target.value });
  };

  const handleReligionOnChange = (event) => {
    setPayload({ ...payload, religion: event.target.value });
  };

  const handlePhoneNumberOnChange = (event) => {
    // 812-3427-4916
    let str = "";
    let input = event.target.value.split("-").join("");

    if (input.length) {
      if (input[0] === "0") {
        return;
      }
    }

    if (
      input.charCodeAt(input.length - 1) > 57 ||
      input.charCodeAt(input.length - 1) < 48
    ) {
      return;
    }

    for (let i = 0; i < input.length; i++) {
      if (i === 3 || i === 7) {
        str = str + "-" + input[i];
      } else if (i <= 11) {
        str = str + input[i];
      } else {
        // do nothing
      }
    }
    setPayload({ ...payload, phoneNumber: str });
  };

  const handleAddressOnChange = (event) => {
    setPayload({ ...payload, address: event.target.value });
  };

  const handleBirthDateOnChange = (value) => {
    // Using DatePicker
    setPayload({ ...payload, birthDate: value });
  };

  const handleMaritalStatus = (event) => {
    setPayload({ ...payload, maritalStatus: event.target.value });
  };

  const handleAvatarOnChange = (event) => {
    setPayload({ ...payload, avatar: event.target.files });
  };

  const handleJobIdOnChnage = (event) => {
    const job = jobs.find((item) => item.id === event.target.value);
    setPayload({ ...payload, jobId: event.target.value, jobName: job.name });
  };

  const handleRoleIdOnChange = (event) => {
    const role = roles.find((item) => item.id === event.target.value);
    if (role.code === "staff") {
      setManagerButtonDisabled(false);
    } else {
      setManagerButtonDisabled(true);
    }
    setPayload({ ...payload, roleId: event.target.value, roleName: role.name });
  };

  const handleManagerIdOnChange = (event) => {
    const manager = managers.find((item) => item.id === event.target.value);
    setPayload({
      ...payload,
      managerId: event.target.value,
      managerName: manager.fullName,
    });
  };

  const handleEmergencyFullNameOnChange = (event) => {
    setPayload({ ...payload, emergencyFullName: event.target.value });
  };

  const handleEmergencyPhoneNumberOnChange = (event) => {
    let str = "";
    let input = event.target.value.split("-").join("");

    if (input.length) {
      if (input[0] === "0") {
        return;
      }
    }

    if (
      input.charCodeAt(input.length - 1) > 57 ||
      input.charCodeAt(input.length - 1) < 48
    ) {
      return;
    }

    for (let i = 0; i < input.length; i++) {
      if (i === 3 || i === 7) {
        str = str + "-" + input[i];
      } else if (i <= 11) {
        str = str + input[i];
      } else {
        // do nothing
      }
    }
    setPayload({ ...payload, emergencyPhoneNumber: str });
  };

  const handleEmergencyRelationOnChange = (event) => {
    setPayload({ ...payload, emergencyRelation: event.target.value });
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNavigateBack = () => {
    setPayload(initPayload);
    navigate(-1);
  };

  const handleConfirm = () => {
    window.createEmployeeModal.showModal();
  };

  const handleSubmit = () => {
    setLoading(true);
    const form = new FormData();
    form.append("fullName", payload.fullName);
    form.append("email", payload.email);
    form.append("contractType", payload.contractType);
    form.append("nik", payload.nik);
    form.append("roleId", payload.roleId);
    form.append("jobId", payload.jobId);
    form.append("npwp", payload.npwp);
    form.append("gender", payload.gender);
    form.append("religion", payload.religion);
    form.append("phoneNumber", "+62-".concat(payload.phoneNumber));
    form.append("address", payload.address);
    form.append("birthDate", payload.birthDate.startDate);
    form.append(
      "maritalStatus",
      payload.maritalStatus === "MARRIED" ? true : false
    );
    form.append("emergencyFullName", payload.emergencyFullName);
    form.append(
      "emergencyPhoneNumber",
      "+62-".concat(payload.emergencyPhoneNumber)
    );
    form.append("emergencyRelation", payload.emergencyRelation);

    if (payload.avatar) {
      form.append("avatar", payload.avatar[0]);
    }

    if (payload.roleName === "Staff") {
      form.append("managerId", payload.managerId);
    }

    postCreateNewEmployee(form)
      .then(() => {
        setPayload(initPayload);
        navigate("/hr/employees");
      })
      .catch((err) => {
        window.createEmployeeModal.close();
        showAlert("ERROR", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   ****************************
   * FETCHERS SECTION
   ****************************
   */
  const fetchRoles = () => {
    getRoles()
      .then((data) => setRoles(data))
      .catch((err) => showAlert("ERROR", err));
  };

  const fetchJobs = () => {
    getJobs()
      .then((data) => setJobs(data))
      .catch((err) => showAlert("ERROR", err));
  };

  const fetchManagers = () => {
    getManagersList()
      .then((data) => setManagers(data))
      .catch((err) => showAlert("ERROR", err));
  };

  /**
   ****************************
   * VALIDATION SECTION
   ****************************
   */
  const validatePersonalInformationForm = () => {
    const res = personalInformationSchema.safeParse(payload);
    if (res.success) {
      setSteps(
        steps.map((item, index) =>
          index === currentStep ? { ...item, completed: true } : item
        )
      );
    } else {
      setSteps(
        steps.map((item, index) =>
          index === currentStep ? { ...item, completed: false } : item
        )
      );
    }
  };

  const validateWorkInformationForm = () => {
    const res = workInformationSchema.safeParse(payload);
    if (
      res.success &&
      (payload.roleName === "Staff" ? payload.managerId !== "" : true)
    ) {
      setSteps(
        steps.map((item, index) =>
          index === currentStep ? { ...item, completed: true } : item
        )
      );
    } else {
      setSteps(
        steps.map((item, index) =>
          index === currentStep ? { ...item, completed: false } : item
        )
      );
    }
  };

  const validateEmergencyInformation = () => {
    const res = emergencyInformation.safeParse(payload);
    if (res.success) {
      setSteps(
        steps.map((item, index) =>
          index === currentStep ? { ...item, completed: true } : item
        )
      );
    } else {
      setSteps(
        steps.map((item, index) =>
          index === currentStep ? { ...item, completed: false } : item
        )
      );
    }
  };

  /**
   ****************************
   * BLURS SECTION
   ****************************
   */
  const handleOnBlurFullName = (event) => {
    const res = z.string().min(5).max(100).safeParse(event.target.value);
    if (res.success) {
      event.target.classList.remove("border-red-500");
    } else {
      event.target.classList.add("border-red-500");
    }
  };

  const handleOnBlurEmail = (event) => {
    const res = z.string().email().safeParse(event.target.value);
    if (res.success) {
      event.target.classList.remove("border-red-500");
    } else {
      event.target.classList.add("border-red-500");
    }
  };

  const handleOnBlurAddress = (event) => {
    const res = z.string().min(20).max(1000).safeParse(event.target.value);
    if (res.success) {
      event.target.classList.remove("border-red-500");
    } else {
      event.target.classList.add("border-red-500");
    }
  };

  const handleOnBlurPhoneNumber = (event) => {
    const res = z
      .string()
      .regex(RegExp(/^\d{3}-\d{4}-\d{4,5}$/i))
      .safeParse(event.target.value);
    if (res.success) {
      event.target.classList.remove("border-red-500");
    } else {
      event.target.classList.add("border-red-500");
    }
  };

  const handleOnBlurDropdowns = (event) => {
    if (event.target.value === "" || event.target.value === "START") {
      event.target.classList.add("border-red-500");
    } else {
      event.target.classList.remove("border-red-500");
    }
  };

  const handleOnBlurDate = (event) => {
    if (!payload.birthDate) {
      event.target.classList.add("border-red-500");
    } else {
      event.target.classList.remove("border-red-500");
    }
  };

  const handleOnBlurNPWP = (event) => {
    const res = z
      .string()
      .regex(
        RegExp(
          /[\d]{2}[.]([\d]{3})[.]([\d]{3})[.][\d][-]([\d]{3})[.]([\d]{3})/i
        )
      )
      .safeParse(event.target.value);
    if (res.success) {
      event.target.classList.remove("border-red-500");
    } else {
      event.target.classList.add("border-red-500");
    }
  };

  const handleOnBlurNIK = (event) => {
    const res = z
      .string()
      .regex(
        RegExp(
          /(1[1-9]|21|[37][1-6]|5[1-3]|6[1-5]|[89][12])\d{2}\d{2}([04][1-9]|[1256][0-9]|[37][01])(0[1-9]|1[0-2])\d{2}\d{4}$/i
        )
      )
      .safeParse(event.target.value);
    if (res.success) {
      event.target.classList.remove("border-red-500");
    } else {
      event.target.classList.add("border-red-500");
    }
  };

  return {
    fetchers: {
      jobs: fetchJobs,
      roles: fetchRoles,
      managers: fetchManagers,
    },
    values: {
      currentStep,
      steps,
      nik: payload.nik,
      npwp: payload.npwp,
      email: payload.email,
      jobId: payload.jobId,
      gender: payload.gender,
      roleId: payload.roleId,
      address: payload.address,
      religion: payload.religion,
      fullName: payload.fullName,
      managerId: payload.managerId,
      phoneNumber: payload.phoneNumber,
      contractType: payload.contractType,
      birthDate: payload.birthDate,
      maritalStatus: payload.maritalStatus,
      emergencyFullName: payload.emergencyFullName,
      emergencyPhoneNumber: payload.emergencyPhoneNumber,
      emergencyRelation: payload.emergencyRelation,
      managerButtonDisabled: managerButtonDisabled,
      avatar: payload.avatar ? payload.avatar[0].name : "",
      roles: roles,
      jobs: jobs,
      managers: managers,
      roleName: payload.roleName,
      jobName: payload.jobName,
      managerName: payload.managerName,
      loading,
    },
    validators: {
      personalInformation: validatePersonalInformationForm,
      workInformation: validateWorkInformationForm,
      emergencyInformation: validateEmergencyInformation,
    },
    handlers: {
      fullName: handleFullNameOnChange,
      email: handleEmailOnChange,
      phoneNumber: handlePhoneNumberOnChange,
      avatar: handleAvatarOnChange,
      address: handleAddressOnChange,
      gender: handleGenderOnChange,
      birthDate: handleBirthDateOnChange,
      maritalStatus: handleMaritalStatus,
      nik: handleNIKOnChange,
      npwp: handleNPWPOnChange,
      religion: handleReligionOnChange,
      contractType: handleContractTypeOnChange,
      roleId: handleRoleIdOnChange,
      jobId: handleJobIdOnChnage,
      managerId: handleManagerIdOnChange,
      next: handleNextStep,
      prev: handlePrevStep,
      emergency: {
        fullName: handleEmergencyFullNameOnChange,
        phoneNumber: handleEmergencyPhoneNumberOnChange,
        relation: handleEmergencyRelationOnChange,
      },
      submit: handleSubmit,
      confirm: handleConfirm,
      navigateBack: handleNavigateBack,
    },
    blurs: {
      fullName: handleOnBlurFullName,
      email: handleOnBlurEmail,
      phoneNumber: handleOnBlurPhoneNumber,
      npwp: handleOnBlurNPWP,
      nik: handleOnBlurNIK,
      address: handleOnBlurAddress,
      dropdowns: handleOnBlurDropdowns,
      date: handleOnBlurDate,
    },
  };
}
