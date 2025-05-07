// src/main/pages/MegaOption.tsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productData } from "../data/products";
import { useCart } from "../../store/CartContext";
import BackIcon from "../components/BackIcon";
import CartIcon from "../components/CartIcon";
import OptionModal from "../components/OptionModal";
import DisposableModal from "../components/DisposableModal";
import CartConfirmModal from "../components/CartConfirmModal";
import ConfirmModal from "../components/ConfirmModal";
import "../style/megaStyle.css";

const MegaOption: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const nav = useNavigate();
  const { addItem } = useCart();

  /* ───── state ───── */
  const [count, setCount] = useState(1);
  const [showOpt,  setOpt]  = useState(false);  // 옵션 모달
  const [showDisp, setDisp] = useState(false);  // 일회용품 모달
  const [showAsk,  setAsk]  = useState(false);  // 장바구니 확인 모달
  const [showMore, setMore] = useState(false);  // 추가 상품 모달

  /* ───── 상품 ───── */
  const item = Object.values(productData).flat().find(p => p.id === itemId);
  if (!item)        return <p>존재하지 않는 상품입니다.</p>;
  if (item.soldout) return <p>품절된 상품입니다.</p>;

  const total     = item.price * count;
  const hasOption = ["americano", "cookiefrappe"].includes(item.id);

  /* ───── 장바구니 추가 ───── */
  const addCart = (qty: number, opts: Record<string, any> = {}) =>
    addItem({ id: item.id, qty, opts: { ...item, ...opts, unitPrice: item.price } });

  /* 주문하기 → 일회용품 모달 */
  const handleOrder = () => {
    addCart(count);
    setDisp(true);
  };

  /* 옵션 모달 → 메뉴 담기 */
  const afterOption = (qty: number, opts: Record<string, any>) => {
    addCart(qty, opts);
    setOpt(false);
    setAsk(true);        // 장바구니 이동 여부 모달
  };

  /* 장바구니 담기 */
  const handleCartBtn = () => {
    addCart(count);
    setAsk(true);
  };

  return (
    <>
      {/* ───── 본 화면 ───── */}
      <div className="option-page">
        <div className="option-header">
          <BackIcon />
          <CartIcon />
        </div>

        <img src={item.image} alt={item.name} className="option-image" />
        <h3 className="option-name">{item.name}</h3>

        {/* 수량 + 단가 */}
        <div className="option-amount-row">
          <button className="qty-btn" onClick={() => count>1 && setCount(count-1)}>−</button>
          <span>{count}</span>
          <button className="qty-btn" onClick={() => setCount(count+1)}>＋</button>
          <span className="price">{item.price.toLocaleString()}원</span>
        </div>

        {/* 총 상품금액 */}
        <div className="option-total">
          <span className="price-total">총 상품금액</span>
          <span className="price-highlight">{total.toLocaleString()}원</span>
        </div>

        {/* 추가 옵션 (아메리카노·프라페) */}
        {hasOption && (
          <div className="option-extra" onClick={() => setOpt(true)}>
            <span className="plus-option">추가 옵션</span>
            <span className="plus-option2">〉</span>
          </div>
        )}

        {/* 액션 버튼 */}
        <div className="option-buttons">
          <button className="small-yellow-btn" onClick={handleOrder}>주문하기</button>
          <button className="small-orange-btn" onClick={handleCartBtn}>장바구니 담기</button>
        </div>
      </div>

      {/* ───── 모달들 ───── */}
      {showOpt && (
        <OptionModal
          itemId={item.id}
          unitPrice={item.price}
          onClose={() => setOpt(false)}
          onAddCart={afterOption}
        />
      )}

      {showDisp && (
        <DisposableModal
          onEat={()  => nav("/cart")}
          onTake={() => nav("/cart")}
        />
      )}

      {showAsk && (
        <CartConfirmModal
          onYes={() => nav("/cart")}
          onNo={() => {
            setAsk(false);   // 장바구니 모달 닫기
            setMore(true);   // 추가 상품 모달 열기
          }}
        />
      )}

      {showMore && (
        <ConfirmModal
          onMore={() => nav("/menu/coffee")} // 계속 담기
          onPay={()  => nav("/pay")}         // 바로 결제
        />
      )}
    </>
  );
};

export default MegaOption;