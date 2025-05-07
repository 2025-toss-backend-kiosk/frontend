import React from "react";
import "../style/megaStyle.css";

interface CartConfirmProps {
  onYes: () => void;  
  onNo:  () => void;  
}

const CartConfirmModal: React.FC<CartConfirmProps> = ({ onYes, onNo }) => (
  <div className="modal-overlay start">
    <div className="modal-box" style={{ maxWidth: 340 }}>
      <h3 className="modal-title" style={{ background: "#ffe066", padding: 12, margin: 0 }}>
        장바구니를 보러 가시겠습니까?
      </h3>

      <div className="modal-actions" style={{ marginTop: 24 }}>
        <button className="yellow-btn" onClick={onYes}>예</button>
        <button className="orange-btn" onClick={onNo}>아니요</button>
      </div>
    </div>
  </div>
);

export default CartConfirmModal;