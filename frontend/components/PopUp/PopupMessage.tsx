import { useState } from "react";

export function PopupMessage({mensagem}: {mensagem: string | undefined}) {
  const [isVisible, setIsVisible] = useState(true);

  const closePopup = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {isVisible && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "300px",
          }}
        >
          <span>{mensagem}</span>
          <button
            onClick={closePopup}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#721c24",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
}
