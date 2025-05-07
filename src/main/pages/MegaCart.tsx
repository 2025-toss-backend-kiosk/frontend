// src/main/pages/MegaCart.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useCart } from "../../store/CartContext";
import { productData } from "../data/products";
import BackIcon from "../components/BackIcon";
import "../style/megaStyle.css";

type MenuItem = {
  menuItemId: string;
  name: string;
  basePrice: number;
};

const MegaCart: React.FC = () => {
  const nav = useNavigate();
  const { items, changeQty, removeItem } = useCart();

  const [menuMap, setMenuMap] = useState<Record<string, MenuItem>>({});
  const [error,   setError]   = useState("");

  // ───── 모든 메뉴 리스트 한 번만 가져와 Map 생성
  useEffect(() => {
    api.get<MenuItem[]>("/menus")
      .then(res => {
        const map: Record<string, MenuItem> = {};
        res.data.forEach(m => { map[m.menuItemId] = m; });
        setMenuMap(map);
      })
      .catch(() => setError("메뉴 정보를 불러오지 못했습니다."));
  }, []);

  // ───── 이름 → 이미지 매핑
  const imageMap = useMemo(() => {
    const map: Record<string, string> = {};
    Object.values(productData).flat().forEach(p => { map[p.name] = p.image; });
    return map;
  }, []);

  // ───── 총액 계산
  const total = items.reduce((sum, ci) => {
    const info = menuMap[ci.id];
    return info ? sum + info.basePrice * ci.qty : sum;
  }, 0);

  if (error) return <p>{error}</p>;

  return (
    <div className="cart-page">
      {/* 헤더 */}
      <header className="cart-header">
        <BackIcon />
        <span className="cart-title">주문하기</span>
      </header>

      <section className="brand-bar">메가MGC커피</section>
      <h4 className="cart-sub">주문상품</h4>

      {/* 상품 리스트 */}
      <ul className="cart-list">
        {items.map((ci, idx) => {
          const info = menuMap[ci.id];
          if (!info) return null;

          const thumb = imageMap[info.name];

          // 옵션 요약 (문자열 값 최대 2줄)
          const optTxt = Object.values(ci.opts || {})
            .filter(v => typeof v === "string" && v)
            .slice(0, 2) as string[];

          return (
            <li key={idx} className="cart-item">
              {thumb && <img src={thumb} alt={info.name} className="cart-thumb" />}

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
                {(ci.qty * info.basePrice).toLocaleString()} 원
              </span>

              {/* 삭제 */}
              <button className="cart-del" onClick={() => removeItem(idx)}>✕</button>
            </li>
          );
        })}
      </ul>

      {/* 총액 */}
      <div className="cart-total">
        <span className="cart-total-label">상품금액</span>
        <strong style={{ color: "red" }}>{total.toLocaleString()} 원</strong>
      </div>

      {/* 결제 버튼 */}
      <button className="cart-pay-btn" onClick={() => nav("/pay")}>
        주문하기
      </button>
    </div>
  );
};

export default MegaCart;
