import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../style/megaStyle.css";
import CartIcon from '../../components/CartIcon';
import menuIcon from "../images/menu.png";
import americano from "../images/mega_ice.png";
import cookiefrappe from "../images/mega_icecookie.png";
import honeyblack from "../images/mega_iceblack.png";
import hamncheese from "../images/mega_sand.png";
import macadamia from "../images/mega_cookie.png";
import smorecookie from "../images/mega_choco.png";
import megacup from "../images/mega_cup.png";

type ProductItem = {
  name: string;
  price: number;
  image: string;
  soldout?: boolean;
};

type ProductData = {
  [key: string]: ProductItem[];
};

const productData: ProductData = {
  coffee: [
    { name: '아메리카노', price: 1500, image: americano }
  ],
  noncoffee: [
    { name: '쿠키 프라페', price: 2200, image: cookiefrappe },
    { name: '허니자몽블랙티', price: 3700, image: honeyblack, soldout: true }
  ],
  dessert: [
    { name: '햄앤치즈샌드', price: 2000, image: hamncheese },
    { name: '마카다미아 쿠키', price: 2000, image: macadamia, soldout: true },
    { name: '초코스모어쿠키', price: 2900, image: smorecookie }
  ],
  md: []
};

const MegaHome: React.FC = () => {
  const navigate = useNavigate();
  const { category = 'coffee' } = useParams<{ category: string }>();
  const currentItems = productData[category as keyof typeof productData] || [];

  return (
    <div className="home-page">
      <header className="home-header">
        <img src={menuIcon} alt="메뉴" className='icon-button' onClick={() => navigate('/setting')} />
        <h3 className='korealogo'>메가엠지씨커피</h3>
        <CartIcon />
      </header>

      <div className="menu-category">
        {['coffee', 'noncoffee', 'dessert', 'md'].map((cat) => (
          <button
            key={cat}
            className={`menu-tab ${category === cat ? 'active' : ''}`}
            onClick={() => navigate(`/menu/${cat}`)}
          >
            {cat === 'coffee' ? '커피' : cat === 'noncoffee' ? '논커피' : cat === 'dessert' ? '디저트' : 'MD'}
          </button>
        ))}
      </div>

      {/* ✅ 흰 배경 박스를 위한 래퍼 */}
      <div className="product-wrapper">
        <div className="product-list">
          {currentItems.length === 0 ? (
            <div className="empty-message">상품이 준비중입니다.</div>
          ) : (
            currentItems.map((item, i) => (
              <div
                key={i}
                className={`product-card ${item.soldout ? 'sold-out' : ''}`}
                onClick={() => !item.soldout && navigate('/option')}
              >
                <img src={item.image} alt={item.name} className="product-image" />
                {item.soldout && <div className="sold-label">일시품절</div>}
                <div className="product-name">{item.name}</div>
                <div className="product-price">{item.price.toLocaleString()} <span className="won">원</span></div>
              </div>
            ))
          )}
        </div>
      </div>

      <footer className='home-footer'>
        <img src={megacup} alt="브랜드 로고" className='footer-logo' />
      </footer>
    </div>
  );
};

export default MegaHome;
