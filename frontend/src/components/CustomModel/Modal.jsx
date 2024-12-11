import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className={styles.buttons}>
          <button onClick={onConfirm} className={styles.confirmButton}>
            Yes
          </button>
          <button onClick={onCancel} className={styles.cancelButton}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
