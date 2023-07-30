/* eslint-disable default-case */
import { z } from "zod";
import { useContext, useRef, useState } from "react";
import { NotifContext } from "../../app/context/notif";
import usePagination from "../../components/pagination/usePagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyChangeLogs,
  getMyProfile,
  updateAvatar,
  updatePassword,
  updateProfileData,
} from "../../app/services/api/profile";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../../app/store/slices";

const initLogs = {
  logs: null,
  paging: {},
};

const initBiodataPayload = {
  address: "",
  phoneNumber: "",
  contacts: [],
};

const initContactPayload = {
  name: "",
  phoneNumber: "",
  relation: "",
};

export default function ProfileModel() {
  const { showAlert } = useContext(NotifContext);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);

  // Payloads: Avatar
  const [avatarPayload, setAvatarPayload] = useState({ avatar: null });
  const [preview, setPreview] = useState();
  const [avatarLoading, setAvatarLoading] = useState(false);

  // Payloads: Biodata
  const [biodataPayload, setBiodataPayload] = useState(initBiodataPayload);
  const [biodataCopy, setBiodataCopy] = useState(initBiodataPayload);
  const [biodataDisabled, setBiodataDisabled] = useState(true);
  const [biodataLoading, setBiodataLoading] = useState(false);
  const [contactPayload, setContactPayload] = useState(initContactPayload);
  const [contactDisabled, setContactDisabled] = useState(true);

  // Payloads: Password
  const [passwordPayload, setPasswordPayload] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [newPassVisible, setNewPassVisible] = useState(false);
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);
  const [passwordSubmitDisabled, setPasswordSubmitDisabled] = useState(true);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const newPassInput = useRef(null);
  const confirmPassInput = useRef(null);

  // Logs
  const [logs, setLogs] = useState(initLogs);
  const [logsLoading, setLogsLoading] = useState(false);
  const [currentPage, handlePagination] = usePagination();

  const strongPass =
    /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{7,}$/;
  /*
   ****************************
   * FETCHERS SECTION
   ****************************
   */
  const fetchProfile = () => {
    getMyProfile()
      .then((data) => {
        setProfile(data);
        setBiodataPayload({
          address: data.biodata.address,
          phoneNumber: data.biodata.phoneNumber.replace("+62-", ""),
          contacts: data.emergencyContacts ?? [],
        });
        setBiodataCopy({
          address: data.biodata.address,
          phoneNumber: data.biodata.phoneNumber.replace("+62-", ""),
          contacts: data.emergencyContacts ?? [],
        });
        if (currentUser.avatar !== "" || data.avatar !== undefined) {
          dispatch(
            setCurrentUser({
              ...currentUser,
              avatar: data.avatar + `?random=${Date.now()}`,
            })
          );
        }
      })
      .catch((err) => {
        showAlert("ERROR", err);
      });
  };

  const fetchLogs = (q = { page: currentPage, size: 10, sort: "DESC" }) => {
    setLogsLoading(true);
    getMyChangeLogs(q)
      .then((data) => {
        if (data.data) {
          setLogs({
            logs: data.data.map((item) => ({ ...item, show: false })),
            paging: data.paging,
          });
        }
      })
      .catch((err) => {
        showAlert("ERROR", err);
      })
      .finally(() => {
        setLogsLoading(false);
      });
  };

  /*
   ****************************
   * HANDLERS SECTION
   *
   * GLOBAL
   ****************************
   */
  const handleGoBack = () => {
    navigate(-1);
  };

  /*
   ****************************
   * HANDLERS SECTION
   *
   * AVATAR
   ****************************
   */
  const handleUploadImage = (event) => {
    setAvatarPayload({ avatar: event.target.files[0] });
  };

  const handleSubmitAvatar = (event) => {
    event.preventDefault();
    setAvatarLoading(true);

    const form = new FormData();
    form.append("avatar", avatarPayload.avatar);
    updateAvatar(form)
      .then(() => {
        showAlert("SUCCESS", "Successfully updated avatar");
        setAvatarPayload({ avatar: null });
        fetchProfile();
      })
      .catch((err) => {
        showAlert("ERROR", err);
      })
      .finally(() => {
        setAvatarLoading(false);
      });
  };

  /*
   ****************************
   * HANDLERS SECTION
   *
   * PASSWORD
   ****************************
   */
  const handleOpenUpdatePassword = () => {
    window.updatePasswordModal.showModal();
  };

  const handlePasswordVisibility = (event) => {
    switch (event.target.name) {
      case "confirm": {
        setConfirmPassVisible(!confirmPassVisible);
        break;
      }
      case "new": {
        setNewPassVisible(!newPassVisible);
        break;
      }
    }
  };

  const handleNewOnChange = (event) => {
    const p = {
      ...passwordPayload,
      newPassword: event.target.value,
    };
    handleValidatePasswordPayload(p);
    setPasswordPayload(p);
  };

  const handleConfirmOnChange = (event) => {
    const p = {
      ...passwordPayload,
      confirmPassword: event.target.value,
    };
    handleValidatePasswordPayload(p);
    setPasswordPayload(p);
  };

  const handleValidatePasswordPayload = (p = passwordPayload) => {
    if (p.newPassword !== p.confirmPassword) {
      setPasswordSubmitDisabled(true);
      newPassInput.current.classList.add("border-red-500");
      confirmPassInput.current.classList.add("border-red-500");
    } else {
      let wrong1 = false;
      let wrong2 = false;
      if (strongPass.test(p.newPassword)) {
        wrong1 = false;
        newPassInput.current.classList.remove("border-red-500");
      } else {
        wrong1 = true;
        newPassInput.current.classList.add("border-red-500");
      }

      if (strongPass.test(p.confirmPassword)) {
        wrong2 = false;
        confirmPassInput.current.classList.remove("border-red-500");
      } else {
        wrong2 = true;
        confirmPassInput.current.classList.add("border-red-500");
      }

      setPasswordSubmitDisabled(wrong1 || wrong2);
    }
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    setPasswordLoading(true);
    setPasswordSubmitDisabled(true);
    updatePassword(passwordPayload)
      .then(() => {
        window.updatePasswordModal.querySelector("form").submit();
        showAlert("SUCCESS", "Password saved successfully");
      })
      .catch((err) => {
        showAlert("ERROR", err);
      })
      .finally(() => {
        setPasswordSubmitDisabled(false);
        setPasswordLoading(false);
      });
  };

  /*
   ****************************
   * HANDLERS SECTION
   *
   * BIODATA
   ****************************
   */
  const handleOpenEditBiodata = () => {
    window.updateBiodataModal.showModal();
  };

  const handleBiodataPhoneNumberOnChange = (event) => {
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
    const p = { ...biodataPayload, phoneNumber: str };
    handleValidateBiodata(p);
    setBiodataPayload(p);
  };

  const handleAddressOnChange = (event) => {
    const p = { ...biodataPayload, address: event.target.value };
    handleValidateBiodata(p);
    setBiodataPayload(p);
  };

  const handleValidateBiodata = (p = biodataPayload) => {
    if (
      !z.string().min(20).max(1000).safeParse(p.address).success |
      !z
        .string()
        .regex(RegExp(/^\d{3}-\d{4}-\d{4,5}$/i))
        .safeParse(p.phoneNumber).success
    ) {
      if (p.contacts.length === biodataCopy.contacts.length) {
        setBiodataDisabled(true);
      } else {
        setBiodataDisabled(false);
      }
    } else if (
      p.address === biodataCopy.address &&
      p.contacts.length === biodataCopy.contacts.length &&
      p.phoneNumber === biodataCopy.phoneNumber
    ) {
      setBiodataDisabled(true);
    } else {
      setBiodataDisabled(false);
    }
  };

  const handleSubmitBiodata = (event) => {
    event.preventDefault();
    setBiodataDisabled(true);
    setBiodataLoading(true);
    updateProfileData({
      id: currentUser.id,
      ...biodataPayload,
      phoneNumber: "+62-" + biodataPayload.phoneNumber,
      contacts: biodataPayload.contacts.map((item) => ({
        ...item,
        phoneNumber: "+62-" + item.phoneNumber,
      })),
    })
      .then(() => {
        showAlert("SUCCESS", "Successfully saved your profile data.");
        window.updateBiodataModal.querySelector("form").submit();
        fetchProfile();
        fetchLogs();
      })
      .catch((err) => {
        showAlert("ERROR", err);
      })
      .finally(() => {
        setBiodataDisabled(false);
        setBiodataLoading(false);
      });
  };

  /*
   ****************************
   * HANDLERS SECTION
   *
   * CONTACT
   ****************************
   */
  const handleContactNameOnChange = (event) => {
    const p = { ...contactPayload, name: event.target.value };
    setContactPayload(p);
    handleValidateContact(p);
  };

  const handleContactPhoneNumberOnChange = (event) => {
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
    const p = { ...contactPayload, phoneNumber: str };
    handleValidateContact(p);
    setContactPayload(p);
  };

  const handleRelationOnChange = (event) => {
    const p = { ...contactPayload, relation: event.target.value };
    handleValidateContact(p);
    setContactPayload(p);
  };

  const handleValidateContact = (p = contactPayload) => {
    if (
      !z.string().min(5).safeParse(p.name).success |
      !z
        .string()
        .regex(RegExp(/^\d{3}-\d{4}-\d{4,5}$/i))
        .safeParse(p.phoneNumber).success |
      (p.relation === "")
    ) {
      setContactDisabled(true);
    } else {
      setContactDisabled(false);
    }
  };

  const handleSubmitContact = (event) => {
    event.preventDefault();
    const p = {
      ...biodataPayload,
      contacts: [
        ...biodataPayload.contacts,
        { ...contactPayload, fullName: contactPayload.name },
      ],
    };
    setBiodataPayload(p);
    handleValidateBiodata(p);
    setContactPayload(initContactPayload);
    setContactDisabled(true);
  };

  /**
   ****************************
   * HANDLERS SECTION
   *
   * CHANGES LOG
   ****************************
   */
  const handleShowChanges = (id) => () => {
    setLogs({
      ...logs,
      logs: logs.logs.map((item) =>
        item.id === id ? { ...item, show: !item.show } : item
      ),
    });
  };

  /*
   ****************************
   * BLURS SECTION
   ****************************
   */
  const blurAddress = (event) => {
    const res = z.string().min(20).max(1000).safeParse(event.target.value);
    if (res.success) {
      event.target.classList.remove("border-red-500");
    } else {
      event.target.classList.add("border-red-500");
    }
  };

  const blurPhoneNumber = (event) => {
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

  const blurDropdowns = (event) => {
    if (event.target.value === "") {
      event.target.classList.add("border-red-500");
    } else {
      event.target.classList.remove("border-red-500");
    }
  };

  const blurName = (event) => {
    const res = z.string().min(5).max(100).safeParse(event.target.value);
    if (res.success) {
      event.target.classList.remove("border-red-500");
    } else {
      event.target.classList.add("border-red-500");
    }
  };

  return {
    values: {
      profile,
      logs: {
        ...logs,
        loading: logsLoading,
      },
      currentPage,
      avatar: avatarPayload.avatar,
      avatarLoading,
      preview,
      password: {
        new: passwordPayload.newPassword,
        confirm: passwordPayload.confirmPassword,
        newVisible: newPassVisible,
        confirmVisible: confirmPassVisible,
        disabled: passwordSubmitDisabled,
        loading: passwordLoading,
      },
      biodata: {
        ...biodataPayload,
        disabled: biodataDisabled,
        loading: biodataLoading,
      },
      contact: {
        ...contactPayload,
        disabled: contactDisabled,
      },
    },
    handlers: {
      back: handleGoBack,
      preview: setPreview,
      logs: {
        pagination: handlePagination,
        detail: handleShowChanges,
      },
      password: {
        open: handleOpenUpdatePassword,
        vis: handlePasswordVisibility,
        new: handleNewOnChange,
        confirm: handleConfirmOnChange,
        validate: handleValidatePasswordPayload,
        submit: handlePasswordSubmit,
      },
      biodata: {
        open: handleOpenEditBiodata,
        phoneNumber: handleBiodataPhoneNumberOnChange,
        address: handleAddressOnChange,
        submit: handleSubmitBiodata,
      },
      contact: {
        name: handleContactNameOnChange,
        phoneNumber: handleContactPhoneNumberOnChange,
        relation: handleRelationOnChange,
        submit: handleSubmitContact,
      },
      avatar: {
        change: handleUploadImage,
        submit: handleSubmitAvatar,
      },
    },
    fetchers: {
      profile: fetchProfile,
      logs: fetchLogs,
    },
    refs: {
      password: {
        new: newPassInput,
        confirm: confirmPassInput,
      },
    },
    blurs: {
      phoneNumber: blurPhoneNumber,
      name: blurName,
      address: blurAddress,
      dropdown: blurDropdowns,
    },
  };
}
