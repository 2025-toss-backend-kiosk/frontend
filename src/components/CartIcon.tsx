// src/components/BackButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import cartIcon from '../main/images/cart.png'; // 너가 쓰는 이미지 경로로 수정

const CartIcon: React.FC = () => {
  const navigate = useNavigate();

  return (
    <img
      src={cartIcon}
      alt="장바구니"
      onClick={() => navigate('/cart')}
      style={{ 
        position: 'absolute',
        top: '50px',
        right: '225px',
        width: '30px', 
        height: '25px', 
        marginRight: '20px' 
      }} // 너가 원하는 스타일로 수정
    />
  );
};

export default CartIcon;