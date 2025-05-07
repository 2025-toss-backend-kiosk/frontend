// src/components/BackButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../images/Vector .png'; 

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
      }}
    />
  );
};

export default BackIcon;