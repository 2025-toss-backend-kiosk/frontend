// src/main/components/EarnPointsModal.tsx
import React from 'react';
import '../style/megaStyle.css';

interface EarnPointsModalProps {
  phone:    string;
  onKey:    (k: string) => void;
  onBack:   () => void;
  onSubmit: () => void;
}

const EarnPointsModal: React.FC<EarnPointsModalProps> = ({
  phone,
  onKey,
  onBack,
  onSubmit
}) => {
  // 3×4 키패드 배열
  const keys = ['1','2','3','4','5','6','7','8','9','010','0','←'];

  return (
    <div className="modal-overlay start">
      <div className="modal-box" style={{ maxWidth: 370 }}>
        <h3
          className="modal-title"
          style={{ background: "#FFCA08", padding: 12, margin: 0 }}
        >
          적립
        </h3>

        {/* 입력 디스플레이 */}
        <div className={`phone-display ${phone ? 'has-value' : 'placeholder'}`}>
          {phone || '010 - 0000 - 0000'}
        </div>

        {/* 3×4 키패드 */}
        <div className="keypad-grid">
          {keys.map(k => (
            <button
              key={k}
              className="key-btn"
              onClick={() => (k === '←' ? onBack() : onKey(k))}
            >
              {k}
            </button>
          ))}
        </div>

        {/* 적립 버튼 */}
        <button
          className="orange-btn full-btn"
          onClick={onSubmit}
        >
          적립
        </button>
      </div>
    </div>
  );
};

export default EarnPointsModal;