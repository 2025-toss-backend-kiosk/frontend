// src/main/pages/MegaHome.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/megaStyle.css";
import api from "../../api/axios";
import CartIcon from "../components/CartIcon";
import menuIcon from "../images/menu.png";
import megacup from "../images/mega_cup.png";

import { productData } from "../data/products"; // 🔥 이미지가 포함된 로컬 데이터

type MenuItem = {
  menuItemId: string;
  name: string;
  basePrice: number;
};

const MegaHome: React.FC = () => {
  const navigate = useNavigate();
  const { category = "coffee" } = useParams<{ category?: string }>();

  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /** -------------------------------
   *  이름(또는 ID) ↔ 이미지 매핑
   *--------------------------------*/
  const imageMap = useMemo(() => {
    const map: { [key: string]: string } = {};
    Object.values(productData)
      .flat()
      .forEach((item) => {
        map[item.name] = item.image; // 필요하면 item.id 로 교체
      });
    return map;
  }, []);

  /** 메뉴 목록 API 호출 */
  useEffect(() => {
    api
      .get("/menus")
      .then((res) => setMenus(res.data))
      .catch(() => setError("메뉴 정보를 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, []);

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
        <button className="menu-tab active">{category}</button>
      </div>

      {/* 상품 영역 */}
      <div className="product-wrapper">
        <div className="product-list">
          {loading ? (
            <div className="empty-message">불러오는 중...</div>
          ) : error ? (
            <div className="empty-message">{error}</div>
          ) : menus.length === 0 ? (
            <div className="empty-message">등록된 메뉴가 없습니다.</div>
          ) : (
            menus.map((item) => (
              <div
                key={item.menuItemId}
                className="product-card"
                onClick={() => navigate(`/option/${item.menuItemId}`)}
              >
                {/* 🔽 이미지 삽입 (매핑이 있으면 표시) */}
                {imageMap[item.name] && (
                  <img
                    src={imageMap[item.name]}
                    alt={item.name}
                    className="product-image"
                  />
                )}

                <div className="product-name">{item.name}</div>
                <div className="product-price">
                  {item.basePrice.toLocaleString()} <span className="won">원</span>
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
