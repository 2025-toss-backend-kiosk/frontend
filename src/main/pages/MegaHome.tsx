// src/main/pages/MegaHome.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CartIcon from '../components/CartIcon';
import menuIcon from '../images/menu.png';
import megacup from '../images/mega_cup.png';
import '../style/megaStyle.css';
import { productData, ProductItem } from '../data/products';

const categoryLabels: Record<string, string> = {
  coffee: '커피',
  noncoffee: '논커피',
  dessert: '디저트',
  md: 'MD',
};

const MegaHome: React.FC = () => {
  const navigate = useNavigate();
  const { category = 'coffee' } = useParams<{ category?: string }>();

  // 선택된 카테고리에 맞는 상품 목록
  const items: ProductItem[] =
    productData[category as keyof typeof productData] || [];

  return (
    <div className="home-page">
      {/* 헤더 */}
      <header className="home-header">
        <img
          src={menuIcon}
          alt="메뉴"
          className="icon-button"
          onClick={() => navigate('/setting')}
        />
        <h3 className="korealogo">메가엠지씨커피</h3>
        <CartIcon />
      </header>

      {/* 카테고리 탭 */}
      <div className="menu-category">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            className={`menu-tab ${category === key ? 'active' : ''}`}
            onClick={() => navigate(`/menu/${key}`)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 상품 리스트 */}
      <div className="product-wrapper">
        <div className="product-list">
          {items.length === 0 ? (
            <div className="empty-message">등록된 상품이 없습니다.</div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="product-card"               // sold-out 처리 제거
                onClick={() => navigate(`/option/${item.id}`)}  // soldout 체크 제거
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="product-image"
                />
                <div className="product-name">{item.name}</div>
                <div className="product-price">
                  {item.price.toLocaleString()} 원
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