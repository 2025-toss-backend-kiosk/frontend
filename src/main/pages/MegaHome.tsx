// src/main/pages/MegaHome.tsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productData } from "../data/products";   // ✅ 공통 데이터 import
import "../style/megaStyle.css";

import CartIcon from "../components/CartIcon";
import menuIcon from "../images/menu.png";
import megacup from "../images/mega_cup.png";

type CategoryKey = keyof typeof productData;

const MegaHome: React.FC = () => {
  const navigate = useNavigate();
  const { category = "coffee" } = useParams<{ category?: string }>();

  const currentItems = productData[category as CategoryKey] ?? [];

  return (
    <div className="home-page">
      {/* ───────── 헤더 ───────── */}
      <header className="home-header">
        <img
          src={menuIcon}
          alt="메뉴"
          className="icon-button"
          onClick={() => navigate("/setting")}
        />
        <h3 className="korealogo">메가엠지씨커피</h3>
        <CartIcon />
      </header>

      {/* ───────── 카테고리 탭 ───────── */}
      <div className="menu-category">
        {(["coffee", "noncoffee", "dessert", "md"] as CategoryKey[]).map((cat) => (
          <button
            key={cat}
            className={`menu-tab ${category === cat ? "active" : ""}`}
            onClick={() => navigate(`/menu/${cat}`)}
          >
            {cat === "coffee"
              ? "커피"
              : cat === "noncoffee"
              ? "논커피"
              : cat === "dessert"
              ? "디저트"
              : "MD"}
          </button>
        ))}
      </div>

      {/* ───────── 상품 리스트 ───────── */}
      <div className="product-wrapper">
        <div className="product-list">
          {currentItems.length === 0 ? (
            <div className="empty-message">상품이 준비중입니다.</div>
          ) : (
            currentItems.map((item) => (
              <div
                key={item.id}
                className={`product-card ${item.soldout ? "sold-out" : ""}`}
                onClick={() => !item.soldout && navigate(`/option/${item.id}`)}
              >
                <img src={item.image} alt={item.name} className="product-image" />
                {item.soldout && <div className="sold-label">일시품절</div>}
                <div className="product-name">{item.name}</div>
                <div className="product-price">
                  {item.price.toLocaleString()} <span className="won">원</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ───────── 푸터 ───────── */}
      <footer className="home-footer">
        <img src={megacup} alt="브랜드 로고" className="footer-logo" />
      </footer>
    </div>
  );
};

export default MegaHome;