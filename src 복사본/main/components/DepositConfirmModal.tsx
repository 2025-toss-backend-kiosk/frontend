import React from 'react';
import '../style/megaStyle.css';

interface Props {
  onYes: () => void;
  onNo:  () => void; 
}

const DepositConfirmModal: React.FC<Props> = ({ onYes, onNo }) => (
  <div className="modal-overlay start">
    <div className="modal-box" style={{ maxWidth: 370 }}>
      <p className="modal-title" style={{ background: "#FFCA08", color: "#FFF", padding: 12, margin: 0,  }}>
        EasyKIOSK &gt;
      </p>
      <div style={{ textAlign: 'center', margin: '24px 0', fontSize: 18 }}>
        적립하시겠습니까?
      </div>
      <div className="modal-actions" style={{ marginTop: 24 }}>
        <button className="yellow-btn" onClick={onYes}>예</button>
        <button className="orange-btn" onClick={onNo}>아니요</button>
      </div>
    </div>
  </div>
);

export default DepositConfirmModal;