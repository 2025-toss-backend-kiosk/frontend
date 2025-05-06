// src/components/BackButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../images/Vector .png'; // 너가 쓰는 이미지 경로로 수정

const BackIcon: React.FC = () => {
  const navigate = useNavigate();

  return (
    <img
      src={backIcon}
      alt="뒤로가기"
      onClick={() => navigate(-1)}
      style={{ 
        position: 'absolute',
        top: '50px',
        width: '15px', 
        height: '18px',
        marginTop: '8px', 
        marginLeft: '30px' 
      }} // 너가 원하는 스타일로 수정
    />
  );
};

export default BackIcon;