// src/main/pages/MegaHome.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/megaStyle.css";
import api from "../../api/axios";
import CartIcon from "../components/CartIcon";
import menuIcon from "../images/menu.png";
import megacup from "../images/mega_cup.png";
import { productData, ProductItem } from "../data/products";

const categoryLabels: Record<string, string> = {
  coffee:    "커피",
  noncoffee: "논커피",
  dessert:   "디저트",
  md:        "MD",
};

interface APIMenuItem {
  menuItemId: string;
  name:       string;
  basePrice:  number;
  category:   string;
}

const MegaHome: React.FC = () => {
  const navigate = useNavigate();
  const { category = "coffee" } = useParams<{ category?: string }>();

  // API에서 받아온 메뉴
  const [menus, setMenus]     = useState<APIMenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  // 로컬 productData로부터 이미지 매핑
  const imageMap = useMemo(() => {
    const m: Record<string,string> = {};
    Object.values(productData)
      .flat()
      .forEach((p: ProductItem) => {
        m[p.name] = p.image;
      });
    return m;
  }, []);

  useEffect(() => {
    async function fetchMenus() {
      setLoading(true);
      try {
        const res = await api.get<APIMenuItem[]>("/menus");
        setMenus(res.data);
        setError("");
      } catch {
        setError("메뉴 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }
    fetchMenus();
  }, []);

  // ② 필터링: 카테고리별
  const filtered = menus.filter(m => m.category === category);

  if (loading) return <p className="empty-message">불러오는 중…</p>;
  if (error)   return <p className="empty-message">{error}</p>;

  return (
    <div className="home-page">
      {/* 헤더 */}
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

      {/* 카테고리 탭 */}
      <div className="menu-category">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            className={`menu-tab ${category === key ? "active" : ""}`}
            onClick={() => navigate(`/menu/${key}`)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 상품 리스트 */}
      <div className="product-wrapper">
        <div className="product-list">
          {filtered.length === 0 ? (
            <div className="empty-message">등록된 상품이 없습니다.</div>
          ) : (
            filtered.map(item => (
              <div
                key={item.menuItemId}
                className="product-card"
                onClick={() => navigate(`/option/${item.menuItemId}`)}
              >
                {/* API엔 이미지 없으니 로컬맵에서 꺼냄 */}
                {imageMap[item.name] && (
                  <img
                    src={imageMap[item.name]}
                    alt={item.name}
                    className="product-image"
                  />
                )}
                <div className="product-name">{item.name}</div>
                <div className="product-price">
                  {item.basePrice.toLocaleString()} 원
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 푸터 */}
      <footer className="home-footer">
        <img src={megacup} alt="브랜드 로고" className="footer-logo" />
      </footer>
    </div>
  );
};

export default MegaHome;