import React from 'react';
import '../style/megaStyle.css';
import pmIcon from '../images/payment.png'; // 간편결제 아이콘

interface Props {
  amount: number;
  onCancel: () => void;
  onApprove:()=> void;
}

const PaymentMethodModal: React.FC<Props> = ({ amount, onCancel, onApprove }) => (
  <div className="modal-overlay start">
    <div className="modal-box" style={{ maxWidth: 370, border: '2px solid #2D73FF' }}>
      <h3 className="modal-title" style={{ background: '#2D73FF', color: '#fff', padding: 12, margin: 0 }}>
        카드 결제 (간편 결제)
      </h3>
      <div style={{ textAlign: 'center', margin: '24px 0' }}>
        <img src={pmIcon} alt="간편결제" style={{ width: 80, height: 80 }} />
      </div>
      <div className="modal-total">
        총 결제금액&nbsp;<strong style={{ color: '#c00' }}>{amount.toLocaleString()}원</strong>
      </div>
      <div className="modal-actions" style={{ marginTop: 24 }}>
        <button className="yellow-btn" onClick={onCancel}>취소</button>
        <button className="orange-btn" onClick={onApprove}>승인 요청</button>
      </div>
    </div>
  </div>
);

export default PaymentMethodModal;