import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/megaStyle.css";
import megaLogo from "../images/mega_logo.png";

const MegaFirstLogin: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <img src={megaLogo} alt="로고" className="logo" />
      <button className="big-yellow-btn" type="button" onClick={() => navigate("/login")}>
        로그인 / 회원가입
      </button>
      <button className="big-brown-btn" type="button" onClick={() => navigate("/home")}>
        비회원으로 시작
      </button>
    </div>
  );
};

export default MegaFirstLogin;