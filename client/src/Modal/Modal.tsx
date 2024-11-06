// import React from "react";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import { CloseOutlined } from "@ant-design/icons";

// import styles from "./Modal.module.css"; // Import the CSS Module



// const Modal = ({ message, status, onClose }) => {
//     const icon = status ? <FaCheckCircle size={50} /> : <FaTimesCircle size={50} />;
    
//     return (
//         <div className={styles.modalOverlay} onClick={onClose}>
//             <div className={styles.modalContent}>
//             <button className={styles.modalCloseBtn} onClick={onClose}> <CloseOutlined /></button>
//                 <div className={`${styles.modalIcon} ${status ? styles.success : styles.error}`}>
//                     {icon}
//                 </div>
//                 <h2 className={styles.modalTitle}>{status === "success" ? "Success!" : "Error!"}</h2>
//                 <p className={styles.modalMessage}>{message}</p>
              
//             </div>
//         </div>
//     );
// };

// export default Modal;
