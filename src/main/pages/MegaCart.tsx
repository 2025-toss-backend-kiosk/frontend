import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../store/CartContext";
import { productData } from "../data/products";
import BackIcon from "../components/BackIcon";
import "../style/megaStyle.css";

const allProd = Object.values(productData).flat();

const MegaCart: React.FC = () => {
  const nav = useNavigate();
  const { items, changeQty, removeItem } = useCart();

  const total = items.reduce((sum, ci) => {
    const info = allProd.find(p => p.id === ci.id);
    return info ? sum + info.price * ci.qty : sum;
  }, 0);

  return (
    <div className="cart-page">
      {/* ─── 헤더 ─── */}
      <header className="cart-header">
        <BackIcon />
        <span className="cart-title">주문하기</span>
      </header>

      <section className="brand-bar">메가MGC커피</section>
      <h4 className="cart-sub">주문상품</h4>

      {/* ─── 상품 리스트 ─── */}
      <ul className="cart-list">
        {items.map((ci, idx) => {
          const info = allProd.find(p => p.id === ci.id);
          if (!info) return null;

          /* 옵션 요약: 문자열 값만 뽑아 두 줄까지 표시 */
          const optTxt = Object.values(ci.opts)
            .filter(v => typeof v === "string" && v)
            .slice(0, 2) as string[];

          return (
            <li key={idx} className="cart-item">
              {/* 썸네일 */}
              <img src={info.image} alt={info.name} className="cart-thumb" />

              {/* 이름 + 옵션 + 수량 컨트롤 */}
              <div className="cart-info">
                <strong className="cart-name">{info.name}</strong>
                {optTxt.map((t, i) => (
                  <p key={i} className="cart-option">{t}</p>
                ))}

                <div className="cart-controls">
                  <button onClick={() => changeQty(idx, -1)}>−</button>
                  <span>{ci.qty}</span>
                  <button onClick={() => changeQty(idx, +1)}>＋</button>
                </div>
              </div>

              {/* 개별 합계 */}
              <span className="cart-price">
                {(ci.qty * info.price).toLocaleString()} 원
              </span>

              {/* 삭제 */}
              <button className="cart-del" onClick={() => removeItem(idx)}>✕</button>
            </li>
          );
        })}
      </ul>

      {/* ─── 총액 ─── */}
      <div className="cart-total">
        <span className="cart-total-label">상품금액</span>
        <strong style={{ color: 'red' }}>{total.toLocaleString()} 원</strong>
      </div>

      {/* ─── 결제 버튼 ─── */}
      <button className="cart-pay-btn" onClick={() => nav("/pay")}>
        주문하기
      </button>
    </div>
  );
};

export default MegaCart;