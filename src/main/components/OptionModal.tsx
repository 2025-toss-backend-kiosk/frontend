// src/main/components/OptionModal.tsx
import React, { useState } from "react";
import "../style/megaStyle.css";

interface OptionModalProps {
  itemId: string;
  unitPrice: number;
  onClose: () => void;
  onAddCart: (qty: number, opts: Record<string, any>) => void;
}

const OptionModal: React.FC<OptionModalProps> = ({
  itemId,
  unitPrice,
  onClose,
  onAddCart,
}) => {
  /* 공통 */
  const [menuQty, setMenuQty] = useState(1);
  const [shotCnt, setShotCnt] = useState(0);
  const [tumbler, setTumbler] = useState<"PERSONAL" | "SHOP">("PERSONAL");

  const isFrappe = itemId === "cookiefrappe";

  /* 아메리카노 전용 */
  const [hotIce, setHotIce] = useState<"HOT" | "ICE">("ICE");
  const [size,   setSize]   = useState<"S" | "M" | "L">("M");   // L +500

  /* 프라페 전용 */
  const [whip, setWhip] = useState(false);

  /* 가격 계산 */
  const shotPrice = shotCnt * 500;
  const sizePrice = !isFrappe && size === "L" ? 500 : 0;        // 프라페는 사이즈 추가금 X
  const single    = unitPrice + shotPrice + sizePrice;
  const total     = single * menuQty;

  return (
    <div className="modal-overlay">
      <div className="modal-box tall">
        <h3 className="modal-title">옵션 선택</h3>
        <p className="modal-sub">해당 제품의 옵션을 선택해 주세요.</p>

        {/* ───── 아메리카노 전용 ───── */}
        {!isFrappe && (
          <>
            <div className="modal-row">
              <span className="modal-label">HOT / ICE</span>
              <label><input type="radio" checked={hotIce==="HOT"} onChange={()=>setHotIce("HOT")} /> HOT</label>
              <label><input type="radio" checked={hotIce==="ICE"} onChange={()=>setHotIce("ICE")} /> ICE</label>
            </div>

            <div className="modal-row">
              <span className="modal-label">SIZE</span>
              <label><input type="radio" checked={size==="S"} onChange={()=>setSize("S")} /> S&nbsp;(1샷)</label>
              <label><input type="radio" checked={size==="M"} onChange={()=>setSize("M")} /> M&nbsp;(2샷)</label>
              <label><input type="radio" checked={size==="L"} onChange={()=>setSize("L")} /> L&nbsp;(3샷&nbsp;+500)</label>
            </div>
          </>
        )}

        {/* ───── 공통: 텀블러 ───── */}
        <div className="modal-row">
          <span className="modal-label">개인 텀블러</span>
          <label><input type="radio" checked={tumbler==="PERSONAL"} onChange={()=>setTumbler("PERSONAL")} /> 개인 컵</label>
          <label><input type="radio" checked={tumbler==="SHOP"} onChange={()=>setTumbler("SHOP")} /> 매장용</label>
        </div>

        {/* ───── 샷 추가 ───── */}
        <div className="modal-row">
          <span className="modal-label">샷 추가</span>
          <button className="qty-btn" onClick={()=>shotCnt>0&&setShotCnt(shotCnt-1)}>−</button>
          <span className="qty-count">{shotCnt}</span>
          <button className="qty-btn" onClick={()=>setShotCnt(shotCnt+1)}>＋</button>
          <span className="shot-price">({shotPrice.toLocaleString()}원)</span>
        </div>

        {/* ───── 프라페 전용: 휘핑 ───── */}
        {isFrappe && (
          <div className="modal-row">
            <span className="modal-label">휘핑 크림</span>
            <label><input type="radio" name="whip" checked={!whip} onChange={()=>setWhip(false)} /> 제외</label>
            <label><input type="radio" name="whip" checked={whip}  onChange={()=>setWhip(true)}  /> 추가</label>
          </div>
        )}

        {/* 수량 */}
        <div className="modal-row">
          <span className="modal-label">수량</span>
          <button className="qty-btn" onClick={()=>menuQty>1&&setMenuQty(menuQty-1)}>−</button>
          <span className="qty-count">{menuQty}</span>
          <button className="qty-btn" onClick={()=>setMenuQty(menuQty+1)}>＋</button>
        </div>

        {/* 금액 */}
        <div className="modal-total">
          주문금액&nbsp;<strong>{total.toLocaleString()}원</strong>
        </div>

        <div className="modal-actions">
          <button
            className="yellow-btn"
            onClick={()=>{
              onAddCart(menuQty,{
                tumbler,
                shotCnt,
                whip,
                ...(isFrappe ? {} : { hotIce, size })
              });
              onClose();
            }}
          >
            메뉴 담기
          </button>
          <button className="orange-btn" onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default OptionModal;