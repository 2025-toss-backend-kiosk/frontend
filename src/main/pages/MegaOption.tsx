// src/main/pages/MegaOption.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";                  // ★ API 호출
import { useCart } from "../../store/CartContext"; // ★ cart 컨텍스트
import BackIcon from "../components/BackIcon";
import CartIcon from "../components/CartIcon";
import OptionModal from "../components/OptionModal";
import ConfirmModal from "../components/ConfirmModal";
import DisposableModal from "../components/DisposableModal";
import "../style/megaStyle.css";

type MenuItem = {
  menuItemId: string;
  name:       string;
  image:      string;
  basePrice:  number;
};

const MegaOption: React.FC = () => {
  const { itemId }  = useParams<{ itemId: string }>();
  const navigate    = useNavigate();
  const { addItem } = useCart();

  // ───── state ─────
  const [item, setItem]           = useState<MenuItem | null>(null);
  const [error, setError]         = useState<string>("");
  const [count, setCount]         = useState<number>(1);
  const [showOpt, setShowOpt]     = useState<boolean>(false);
  const [showAddMore, setAddMore] = useState<boolean>(false);
  const [showDisp, setDisp]       = useState<boolean>(false);

  // ───── 메뉴 상세 조회 ─────
  useEffect(() => {
    if (!itemId) return;
    api.get<MenuItem>(`/menus/${itemId}`)
      .then(res => setItem(res.data))
      .catch(() => setError("메뉴 정보를 불러오지 못했습니다."));
  }, [itemId]);

  if (error)  return <p className="empty-message">{error}</p>;
  if (!item)  return <p className="empty-message">로딩 중...</p>;

  // ───── 계산 값 ─────
  const total     = item.basePrice * count;
  const hasOption = item.name === "아메리카노" || item.name === "쿠키 프라페";

  // ───── 장바구니 담기 ─────
  const handleAddCart = (qty: number, opts: Record<string, any> = {}) => {
    addItem({
      id: item.menuItemId,
      qty,
      opts: { ...opts, unitPrice: item.basePrice },
    });
  };

  // ───── 버튼 핸들러들 ─────
  const handleOrder = () => {
    handleAddCart(count);
    setDisp(true);
  };
  const handleAfterOption = (qty: number, opts: Record<string, any>) => {
    handleAddCart(qty, opts);
    setShowOpt(false);
    setAddMore(true);
  };
  const handleCartBtn = () => {
    handleAddCart(count);
    setAddMore(true);
  };

  return (
    <>
      <div className="option-page">
        <div className="option-header">
          <BackIcon />
          <CartIcon />
        </div>

        <img
          src={item.image}
          alt={item.name}
          className="option-image"
        />
        <h3 className="option-name">{item.name}</h3>

        <div className="option-amount-row">
          <button
            className="qty-btn"
            onClick={() => count > 1 && setCount(count - 1)}
          >
            −
          </button>
          <span>{count}</span>
          <button
            className="qty-btn"
            onClick={() => setCount(count + 1)}
          >
            ＋
          </button>
          <span className="price">
            {item.basePrice.toLocaleString()}원
          </span>
        </div>

        <div className="option-total">
          <span className="price-total">총 상품금액</span>
          <span className="price-highlight">
            {total.toLocaleString()}원
          </span>
        </div>

        {hasOption && (
          <div
            className="option-extra"
            onClick={() => setShowOpt(true)}
          >
            <span className="plus-option">추가 옵션</span>
            <span className="plus-option2">〉</span>
          </div>
        )}
      </div>

      {/* ───── 하단 고정 버튼 ───── */}
      <div className="option-buttons-wrapper">
        <button
          className="small-yellow-btn"
          onClick={handleOrder}
        >
          주문하기
        </button>
        <button
          className="small-orange-btn"
          onClick={handleCartBtn}
        >
          장바구니 담기
        </button>
      </div>

      {/* ───── 모달들 ───── */}
      {showOpt && (
        <OptionModal
          itemId={item.menuItemId}
          unitPrice={item.basePrice}
          onClose={() => setShowOpt(false)}
          onAddCart={handleAfterOption}
        />
      )}

      {showAddMore && (
        <ConfirmModal
          onMore={() => {
            setAddMore(false);
            // 같은 카테고리로 돌아가기
            const cat = item.name === "쿠키 프라페" ? "noncoffee" : "coffee";
            navigate(`/menu/${cat}`);
          }}
          onPay={() => {
            setAddMore(false);
            setDisp(true);
          }}
        />
      )}

      {showDisp && (
        <DisposableModal
          onEat={()  => navigate("/cart")}
          onTake={() => navigate("/cart")}
        />
      )}
    </>
  );
};

export default MegaOption;