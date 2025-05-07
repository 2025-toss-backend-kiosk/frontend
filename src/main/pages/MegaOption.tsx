// src/main/pages/MegaOption.tsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productData, ProductItem } from "../data/products";
import { useCart } from "../../store/CartContext";
import BackIcon from "../components/BackIcon";
import CartIcon from "../components/CartIcon";
import OptionModal from "../components/OptionModal";
import ConfirmModal from "../components/ConfirmModal";
import DisposableModal from "../components/DisposableModal";
import "../style/megaStyle.css";

const MegaOption: React.FC = () => {
  const { itemId }   = useParams<{ itemId: string }>();
  const navigate     = useNavigate();
  const { addItem }  = useCart();

  const [count,       setCount]       = useState(1);
  const [showOpt,     setShowOpt]     = useState(false);
  const [showAddMore, setShowAddMore] = useState(false);
  const [showDisp,    setShowDisp]    = useState(false);

  const allItems: ProductItem[] = Object.values(productData).flat();
  const item = allItems.find(p => p.id === itemId);
  if (!item) return <p>존재하지 않는 상품입니다.</p>;

  const total     = item.price * count;
  const hasOption = ["americano", "cookiefrappe"].includes(item.id);

  const addCart = (qty: number, opts: Record<string, any> = {}) => {
    addItem({ id: item.id, qty, opts });
  };

  const handleOrder = () => {
    addCart(count);
    setShowDisp(true);
  };

  const handleAfterOption = (qty: number, opts: Record<string, any>) => {
    addCart(qty, opts);
    setShowOpt(false);
    setShowAddMore(true);
  };

  const handleCartBtn = () => {
    addCart(count);
    setShowAddMore(true);
  };

  return (
    <>
      <div className="option-page">
        <div className="option-header">
          <BackIcon />
          <CartIcon />
        </div>

        <img src={item.image} alt={item.name} className="option-image" />
        <h3 className="option-name">{item.name}</h3>

        <div className="option-amount-row">
          <button className="qty-btn" onClick={()=>count>1&&setCount(count-1)}>−</button>
          <span className="qty-count">{count}</span>
          <button className="qty-btn" onClick={()=>setCount(count+1)}>＋</button>
          <span className="price">{item.price.toLocaleString()}원</span>
        </div>

        <div className="option-total">
          <span className="price-total">총 상품금액</span>
          <span className="price-highlight">{total.toLocaleString()}원</span>
        </div>

        {hasOption && (
          <div className="option-extra" onClick={() => setShowOpt(true)}>
            <span className="plus-option">옵션</span>
            <span className="plus-option2">〉</span>
          </div>
        )}
      </div>

      {/* 이 래퍼가 버튼 2개를 화면 하단에 고정합니다 */}
      <div className="option-buttons-wrapper">
        <button className="small-yellow-btn" onClick={handleOrder}>
          주문하기
        </button>
        <button className="small-orange-btn" onClick={handleCartBtn}>
          장바구니 담기
        </button>
      </div>

      {showOpt && (
        <OptionModal itemId={item.id} unitPrice={item.price}
          onClose={()=>setShowOpt(false)} onAddCart={handleAfterOption} />
      )}

      {showAddMore && (
        <ConfirmModal
          onMore={()=>{ setShowAddMore(false);
            const cat = item.id==="cookiefrappe"?"noncoffee":"coffee";
            navigate(`/menu/${cat}`);
          }}
          onPay={()=>{ setShowAddMore(false); setShowDisp(true); }}
        />
      )}

      {showDisp && (
        <DisposableModal
          onEat={()=>navigate("/cart")}
          onTake={()=>navigate("/cart")}
        />
      )}
    </>
  );
};

export default MegaOption;