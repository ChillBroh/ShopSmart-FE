import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

function Toaster({ text, type, onClose }) {
  const [show, setShow] = useState(true);

  const toastStyles = {
    success: {
      backgroundColor: "#d4edda",
      color: "#155724",
    },
    error: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
    },
  };

  const currentStyle =
    type === "success" ? toastStyles.success : toastStyles.error;

  return (
    <ToastContainer className="p-3" position={"top-end"} style={{ zIndex: 1 }}>
      <Toast
        style={{
          ...currentStyle,
          border: "1px solid transparent",
          borderRadius: "8px",
        }}
        onClose={() => {
          setShow(false);
          onClose();
        }} // Call onClose when closing
        show={show} // Control visibility
        delay={3000} // Auto-dismiss after 3 seconds (optional)
        autohide // Optional: automatically hide after delay
      >
        <Toast.Header closeButton={true}>
          {type === "success" ? (
            <FaCheckCircle className="me-2" style={{ color: "#155724" }} />
          ) : (
            <FaExclamationCircle
              className="me-2"
              style={{ color: "#721c24" }}
            />
          )}
          <strong className="me-auto">ShopSmart</strong>
        </Toast.Header>
        <Toast.Body>{text}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default Toaster;
