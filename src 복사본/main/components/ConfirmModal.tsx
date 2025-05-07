import React from "react";
import "../style/megaStyle.css";

interface ConfirmModalProps {
  onMore: () => void;  
  onPay:  () => void;  
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ onMore, onPay }) => (
  <div className="modal-overlay start">
    <div className="modal-box" style={{ maxWidth: 370 }}>
      <h3 className="modal-title" style={{ background: "#FFCA08", padding: 12, margin: 0 }}>
        추가 상품을 더 담으시겠습니까?
      </h3>

      <div className="modal-actions" style={{ marginTop: 24 }}>
        <button className="yellow-btn" style={{ fontSize: 18, fontWeight: "bold" }} onClick={onMore}>
          예
        </button>
        <button className="orange-btn" style={{ fontSize: 18, fontWeight: "bold" }} onClick={onPay}>
          아니요
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmModal;