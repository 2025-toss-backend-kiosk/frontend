import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CartIcon from '../components/CartIcon';
import menuIcon from '../images/menu.png';
import megacup from '../images/mega_cup.png';
import '../style/megaStyle.css';
import api from '../../api/axios';
import { productData, ProductItem } from '../data/products';

const categoryLabels: Record<string, string> = {
  coffee: '커피',
  noncoffee: '논커피',
  dessert: '디저트',
  md: 'MD',
};

interface APIMenuItem {
  menuItemId: string;
  name: string;
  basePrice: number;
  category: string;
}

const MegaHome: React.FC = () => {
  const navigate = useNavigate();
  const { category = 'coffee' } = useParams<{ category?: string }>();

  const [menus, setMenus] = useState<APIMenuItem[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/menus')
      .then(res => setMenus(res.data))
      .catch(() => setError('메뉴 정보를 불러오지 못했습니다.'));
  }, []);

  const imageMap = useMemo(() => {
    const map: { [name: string]: string } = {};
    Object.values(productData).flat().forEach((p: ProductItem) => {
      map[p.name] = p.image;
    });
    return map;
  }, []);

  const items = menus.filter(m => m.category === category);

  return (
    <div className="home-page">
      <header className="home-header">
        <img src={menuIcon} alt="메뉴" className="icon-button" onClick={() => navigate('/setting')} />
        <h3 className="korealogo">메가엠지씨커피</h3>
        <CartIcon />
      </header>

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

      <div className="product-wrapper">
        <div className="product-list">
          {error ? (
            <div className="empty-message">{error}</div>
          ) : items.length === 0 ? (
            <div className="empty-message">등록된 상품이 없습니다.</div>
          ) : (
            items.map((item) => (
              <div
                key={item.menuItemId}
                className="product-card"
                onClick={() => navigate(`/option/${item.menuItemId}`)}
              >
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

      <footer className="home-footer">
        <img src={megacup} alt="브랜드 로고" className="footer-logo" />
      </footer>
    </div>
  );
};

export default MegaHome;