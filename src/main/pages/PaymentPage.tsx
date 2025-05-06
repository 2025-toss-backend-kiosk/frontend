// src/main/pages/PaymentPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../store/CartContext";
import { productData } from "../data/products";
import BackIcon from "../components/BackIcon";
import "../style/megaStyle.css";
import kakaoIcon from "../images/kakao.png";
import naverIcon from "../images/naver.png";
import cardIcon  from "../images/card.png";

const allProd = Object.values(productData).flat();

const PaymentPage: React.FC = () => {
  const nav = useNavigate();
  const { items } = useCart();
  const [expanded, setExpanded] = useState(true);
  const [method,   setMethod]   = useState<"kakao"|"naver"|"card"|"">("");

  // 총액 계산
  const total = items.reduce((sum, ci) => {
    const info = allProd.find((p) => p.id === ci.id);
    return info ? sum + info.price * ci.qty : sum;
  }, 0);
  const discount  = 0;
  const payAmount = total - discount;

  // 첫 번째 상품 이름 (없으면 빈 문자열)
  const firstName =
    items.length > 0
      ? allProd.find((p) => p.id === items[0].id)?.name ?? ""
      : "";

  return (
    <div className="payment-page">
      <header className="payment-header">
        <BackIcon />
        <h3 className="payment-title">주문하기</h3>
      </header>

      <section className="brand-bar1">메가MGC커피</section>

      {/* 주문 요약 토글 */}
      <div
        className="payment-summary-header"
        onClick={() => setExpanded(!expanded)}
      >
        <span style={{ color: '#2D73FF' }} className="summary-label">주문 상품</span>
        <span style={{ color: '#2D73FF' }} className="summary-toggle">
          {items.length > 1
            ? `${firstName} 외 ${items.length - 1}건`
            : firstName}
          {expanded ? " ▲" : " ▼"}
        </span>
      </div>

      {/* 상세 리스트 */}
      {expanded && (
        <ul className="summary-list">
          {items.map((ci, i) => {
            const info = allProd.find((p) => p.id === ci.id);
            if (!info) return null;
            return (
              <li key={i} className="summary-item">
                <img
                  src={info.image}
                  alt={info.name}
                  className="summary-thumb"
                />
                <span className="summary-name">{info.name}</span>
                <span className="summary-qty">{ci.qty} 개</span>
                <span className="summary-price">
                  {(ci.qty * info.price).toLocaleString()} 원
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {/* 결제수단 선택 */}
      <h4 className="payment-subtitle">결제수단을 선택해 주세요.</h4>
      <div className="payment-methods">
        <div
          className={`method-card ${method === "kakao" ? "selected" : ""}`}
          onClick={() => setMethod("kakao")}
        >
          <img src={kakaoIcon} alt="카카오페이" />
          <span>카카오페이</span>
        </div>
        <div
          className={`method-card ${method === "naver" ? "selected" : ""}`}
          onClick={() => setMethod("naver")}
        >
          <img src={naverIcon} alt="네이버페이" />
          <span>네이버페이</span>
        </div>
        <div
          className={`method-card ${method === "card" ? "selected" : ""}`}
          onClick={() => setMethod("card")}
        >
          <img src={cardIcon} alt="일반결제" />
          <span>일반결제</span>
        </div>
      </div>

      {/* 금액 요약 */}
      <div className="payment-totals">
        <div className="payment-line">
          <span>주문금액</span>
          <span>{total.toLocaleString()}원</span>
        </div>
        <div className="payment-line">
          <span>할인금액</span>
          <span>-{discount.toLocaleString()}원</span>
        </div>
        <div className="payment-line pay-amount">
          <span className="payment-line1">결제금액</span>
          <span className="pay-amount1">{payAmount.toLocaleString()}원</span>
        </div>
      </div>

      <button className="payment-btn" onClick={() => nav("/cart")}>
        결제하기
      </button>
    </div>
  );
};

export default PaymentPage;