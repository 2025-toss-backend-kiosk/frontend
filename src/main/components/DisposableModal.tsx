import React, { useState } from "react";
import "../style/megaStyle.css";

interface DisposableModalProps {
  onEat: () => void;   // 먹고가기
  onTake: () => void;  // 포장하기
}

const checkList = ["선택안함", "포크/나이프", "캐리어/봉투", "직접 가져 갈게요"];

const DisposableModal: React.FC<DisposableModalProps> = ({ onEat, onTake }) => {
  const [checked, setChecked] = useState<string>("선택안함");

  return (
    <div className="modal-overlay start">
      <div className="modal-box" style={{ maxWidth: 340 }}>
        <h3
          className="modal-title"
          style={{ background: "#ffe066", padding: 12, margin: 0, marginBottom: 20 }}
        >
          일회용품 필요여부를 선택해 주세요
        </h3>

        {/* 체크박스 리스트 */}
        {checkList.map((text) => (
          <label key={text} style={{ display: "flex", gap: 8, margin: "8px 0" }}>
            <input
              type="checkbox"
              checked={checked === text}
              onChange={() => setChecked(text)}
            />
            {text}
          </label>
        ))}

        <p style={{ color: "red", fontSize: 18, textAlign: "center", fontWeight: "bold", marginTop: 16 }}>
          ❗️매장 이용 시 일회용컵 사용 불가
        </p>

        <div className="modal-actions" style={{ marginTop: 16 }}>
          <button className="yellow-btn" onClick={onEat}>먹고가기</button>
          <button className="orange-btn" onClick={onTake}>포장하기</button>
        </div>
      </div>
    </div>
  );
};

export default DisposableModal;