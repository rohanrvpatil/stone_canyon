// UserDataModal.tsx
import React from "react";
import { UserData } from "../interfaces/userInterfaces";
import styles from "./Chatbot.module.css";

interface UserDataModalProps {
  dispatch: any;
  isOpen: boolean;
  userData: UserData;
  onClose: () => void;
}

const UserDataModal: React.FC<UserDataModalProps> = ({
  dispatch,
  isOpen,
  userData,
  onClose,
}) => {
  if (!isOpen) return null; // Don't render anything if the modal isn't open
  const fields: Array<{ label: string; value: string }> = [
    { label: "Name", value: userData.fullName },
    { label: "Email", value: userData.emailAddress },
    { label: "Phone Number", value: userData.phoneNumber },
    { label: "Zip Code", value: userData.zipCode },
    { label: "Address", value: userData.fullAddress },
    { label: "Service ID", value: String(userData.serviceId) },
  ];
  return (
    <div className={styles.userDataModalContainer}>
      <h2 style={{ color: "black", marginTop: "0px" }}>User Data</h2>
      {fields.map(({ label, value }, index) => (
        <div key={index} style={{ display: "flex", flexDirection: "column" }}>
          <label className={styles.userDataModalLabel}>{label}:</label>
          <input className={styles.userDataModalInput} value={value} readOnly />
        </div>
      ))}

      <button
        className={styles.userDataModalButton}
        onClick={() => dispatch(onClose())}
      >
        Confirm
      </button>
    </div>
  );
};

export default UserDataModal;
