"use client";

type ConfirmModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({ message, onConfirm, onCancel }: ConfirmModalProps) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <p style={{ fontSize: "1rem", color: "var(--foreground)", margin: 0 }}>
          {message}
        </p>
        <div
          style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}
        >
          <button
            className="chrome-btn"
            style={{ padding: "0.6rem 1.4rem" }}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="chrome-btn chrome-btn-danger"
            style={{ padding: "0.6rem 1.4rem" }}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
