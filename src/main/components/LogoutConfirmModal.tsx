import React from 'react';
import '../style/megaStyle.css';

interface LogoutConfirmModalProps {
  onConfirm: () => void;
  onCancel:  () => void;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  onConfirm,
  onCancel
}) => (
  <div className="modal-overlay start">
    <div className="modal-box" style={{ maxWidth: 340 }}>
      <h3
        className="modal-title"
        style={{ background: "#FFCA08", padding: 12, margin: 0 }}
      >
        로그아웃 하시겠습니까?
      </h3>
      <div className="modal-actions" style={{ marginTop: 24 }}>
        <button className="yellow-btn" onClick={onConfirm}>예</button>
        <button className="orange-btn" onClick={onCancel}>아니요</button>
      </div>
    </div>
  </div>
);

export default LogoutConfirmModal;