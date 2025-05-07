import React from 'react';
import '../style/megaStyle.css';

interface Props {
  onHome:   () => void;
  onCancel: () => void;
}

const PaymentCompleteModal: React.FC<Props> = ({ onHome, onCancel }) => (
  <div className="modal-overlay start">
    <div className="modal-box" style={{ maxWidth: 370 }}>
      <h3 className="modal-title" style={{ background: "#FFCA08", padding: 12, margin: 0 }}>
        EasyKIOSK &gt;
      </h3>
      <div style={{ textAlign: 'center', margin: '24px 0', fontSize: 18, paddingTop: 40, paddingBottom: 40}}>
        결제가 완료 되었습니다
      </div>
      <div className="modal-actions" style={{ marginTop: 24 }}>
        <button className="orange-btn" onClick={onHome}>처음으로</button>
      </div>
    </div>
  </div>
);

export default PaymentCompleteModal;