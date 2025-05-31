import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LowStockPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  const openPopup = () => setShowPopup(true);
  const closePopup = () => {
    setShowPopup(false);
    setShowWelcome(false);
  };

  const handleLoginClick = () => {
    navigate("/login");  // change if your login route is different
  };

  const handleSignupClick = () => {
    setShowWelcome(true);
  };

  const handleContinueAfterSignup = () => {
    navigate("/inventory");  // change if your inventory route is different
  };

  return (
    <>
      <button onClick={openPopup} className="check-stock-btn">
        Check Ur Stocks
      </button>

      {showPopup && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            {!showWelcome ? (
              <>
                <p>Already a user? <button onClick={handleLoginClick} style={styles.linkBtn}>Login</button></p>
                <p>New to FishNet? <button onClick={handleSignupClick} style={styles.linkBtn}>Signup</button></p>
                <button onClick={closePopup} style={styles.closeBtn}>Close</button>
              </>
            ) : (
              <>
                <h3>Welcome to FishNet!</h3>
                <p>Continue with your inventory to extract stock details.</p>
                <button onClick={handleContinueAfterSignup} style={styles.continueBtn}>Continue</button>
                <button onClick={closePopup} style={styles.closeBtn}>Close</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "#fff",
    padding: "25px 30px",
    borderRadius: "8px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0,0,0,0.25)",
  },
  linkBtn: {
    background: "none",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: "1rem",
    margin: "0 5px",
  },
  closeBtn: {
    marginTop: "20px",
    padding: "8px 16px",
    border: "none",
    backgroundColor: "#e74c3c",
    color: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
  },
  continueBtn: {
    padding: "8px 16px",
    border: "none",
    backgroundColor: "#27ae60",
    color: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
