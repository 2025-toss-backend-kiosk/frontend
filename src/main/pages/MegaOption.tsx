// src/main/pages/MegaOption.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { useCart } from "../../store/CartContext";
import BackIcon from "../components/BackIcon";
import CartIcon from "../components/CartIcon";
import OptionModal from "../components/OptionModal";
import DisposableModal from "../components/DisposableModal";
import CartConfirmModal from "../components/CartConfirmModal";
import ConfirmModal from "../components/ConfirmModal";
import "../style/megaStyle.css";
import { productData } from "../data/products";

type MenuItem = {
  menuItemId: string;
  name: string;
  basePrice: number;
  category: string;
};

const MegaOption: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const nav = useNavigate();
  const { addItem } = useCart();

  // ───── state
  const [count, setCount] = useState(1);
  const [showOpt, setOpt] = useState(false);
  const [showDisp, setDisp] = useState(false);
  const [showAsk, setAsk] = useState(false);
  const [showMore, setMore] = useState(false);
  const [item, setItem] = useState<MenuItem | null>(null);
  const [error, setError] = useState("");

  // ───── 이미지 매핑 (name → image)
  const imageMap = useMemo(() => {
    const map: { [name: string]: string } = {};
    Object.values(productData).flat().forEach(p => {
      map[p.name] = p.image;
    });
    return map;
  }, []);

  // ───── 메뉴 상세 API 호출
  useEffect(() => {
    if (!itemId) return;
    api.get(`/menus/${itemId}`)
      .then(res => setItem(res.data))
      .catch(() => setError("메뉴 정보를 불러오지 못했습니다."));
  }, [itemId]);

  if (error)   return <p>{error}</p>;
  if (!item)   return <p>로딩 중...</p>;

  const total     = item.basePrice * count;
  const hasOption = ["아메리카노", "쿠키 프라페"].includes(item.name);
  const image     = imageMap[item.name];

  // ───── 장바구니 추가
  const addCart = (qty: number, opts: Record<string, any> = {}) =>
    addItem({
      id: item.menuItemId,           // 장바구니에는 UUID 저장
      qty,
      opts: { ...opts, unitPrice: item.basePrice }
    });

  /* 주문하기 → 일회용품 모달 */
  const handleOrder = () => {
    addCart(count);
    setDisp(true);
  };

  /* 옵션 모달 → 메뉴 담기 */
  const afterOption = (qty: number, opts: Record<string, any>) => {
    addCart(qty, opts);
    setOpt(false);
    setAsk(true);
  };

  /* 장바구니 담기 */
  const handleCartBtn = () => {
    addCart(count);
    setAsk(true);
  };

  return (
    <>
      <div className="option-page">
        <div className="option-header">
          <BackIcon />
          <CartIcon />
        </div>

        {image && <img src={image} alt={item.name} className="option-image" />}
        <h3 className="option-name">{item.name}</h3>

        {/* 수량 + 단가 */}
        <div className="option-amount-row">
          <button className="qty-btn" onClick={() => count > 1 && setCount(count - 1)}>−</button>
          <span>{count}</span>
          <button className="qty-btn" onClick={() => setCount(count + 1)}>＋</button>
          <span className="price">{item.basePrice.toLocaleString()}원</span>
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
          itemId={item.menuItemId}
          unitPrice={item.basePrice}
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
            setAsk(false);
            setMore(true);
          }}
        />
      )}

      {showMore && (
        <ConfirmModal
          onMore={() => nav("/menu/coffee")}
          onPay={()  => nav("/pay")}
        />
      )}
    </>
  );
};

export default MegaOption;
