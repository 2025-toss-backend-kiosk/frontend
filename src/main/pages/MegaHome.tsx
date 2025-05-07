// src/main/pages/MegaHome.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/megaStyle.css";
import CartIcon from "../components/CartIcon";
import menuIcon from "../images/menu.png";
import megacup from "../images/mega_cup.png";

type MenuItem = {
  menuItemId: string;
  name: string;
  basePrice: number;
};

const CATEGORY_LABELS: Record<string, string> = {
  coffee: "커피",
  noncoffee: "논커피",
  dessert: "디저트",
  md: "MD",
};

const MegaHome: React.FC = () => {
  const navigate = useNavigate();
  const { category = "coffee" } = useParams<{ category?: string }>();

  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/menus")
      .then((res) => {
        if (!res.ok) throw new Error("서버 응답 오류");
        return res.json();
      })
      .then((data: MenuItem[]) => setMenus(data))
      .catch(() => setError("메뉴 정보를 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-page">
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

      <div className="menu-category">
        {["coffee", "noncoffee", "dessert", "md"].map((cat) => (
          <button
            key={cat}
            className={`menu-tab ${category === cat ? "active" : ""}`}
            onClick={() => navigate(`/menu/${cat}`)}
          >
            {CATEGORY_LABELS[cat] || cat}
          </button>
        ))}
      </div>

      <div className="product-wrapper">
        <div className="product-list">
          {loading ? (
            <div className="empty-message">불러오는 중...</div>
          ) : error ? (
            <div className="empty-message">{error}</div>
          ) : menus.filter((m) => m.menuItemId.startsWith(category)).length === 0 ? (
            <div className="empty-message">등록된 메뉴가 없습니다.</div>
          ) : (
            menus
              .filter((m) => m.menuItemId.startsWith(category))
              .map((item) => (
                <div
                  key={item.menuItemId}
                  className="product-card"
                  onClick={() => navigate(`/option/${item.menuItemId}`)}
                >
                  <div className="product-name">{item.name}</div>
                  <div className="product-price">
                    {item.basePrice.toLocaleString()} <span className="won">원</span>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      <footer className="home-footer">
        <img src={megacup} alt="브랜드 로고" className="footer-logo" />
      </footer>
    </div>
  );
};

export default MegaHome;