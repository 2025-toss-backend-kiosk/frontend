import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import americano from '../images/mega_ice.png';
import BackIcon from '../../components/BackIcon';
import CartIcon from '../../components/CartIcon';
import '../style/megaStyle.css';

const MegaOption: React.FC = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const unitPrice = 1500;
  const totalPrice = unitPrice * count;

  const increase = () => setCount(count + 1);
  const decrease = () => count > 1 && setCount(count - 1);

  return (
    <div className="option-page">
      <div className="option-header">
        <BackIcon />
        <CartIcon />
      </div>

      <img src={americano} alt="아메리카노" className="option-image" />
      <h3 className="option-name">아메리카노</h3>
      <p className="option-description">
        메가MGC커피 블렌드 원두로 추출한 에스프레소에<br />
        물을 더해, 풍부한 바디감을 느낄 수 있는 스탠다드 커피.
      </p>

      <div className="option-amount-row">
        <button onClick={decrease} 
        style={{
          border: 'none',
          borderRadius: '50px',
          margin: '22px'}}>➖</button>
        <span>{count}</span>
        <button onClick={increase} 
         style={{
          border: 'none',
          borderRadius: '50px',
          margin: '22px'}}>➕</button>
        <span className="price">{unitPrice}</span>
      </div>

      <div className="option-total">
        <span className="price-total">총 상품금액</span>
        <span className="price-highlight">{totalPrice.toLocaleString()}</span>
      </div>

      <div className="option-extra" onClick={() => navigate("/options")}>
        <span className="plus-option">추가 옵션</span>
        <span className="plus-option2">〉</span>
      </div>

      <div className="option-buttons">
        <button className="small-yellow-btn">주문하기</button>
        <button className="small-orange-btn">장바구니 담기</button>
      </div>
    </div>
  );
};

export default MegaOption;