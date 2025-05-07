// src/main/pages/SettingsPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/UserContext";
import { useCart } from "../../store/CartContext";
import BackIcon from "../components/BackIcon";
import LogoutConfirmModal from "../components/LogoutConfirmModal";
import "../style/megaStyle.css";

const SettingsPage: React.FC = () => {
  const nav = useNavigate();
  const { username, setUsername } = useUser();
  const { clearCart } = useCart();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    setShowLogout(true);
  };

  const confirmLogout = () => {
    // ① 사용자 컨텍스트 초기화
    setUsername("");
    // ② 장바구니 초기화
    clearCart();
    // ③ 로그인 화면으로
    nav("/");
  };

  return (
    <div className="settings-page">
      <header className="settings-header">
        <BackIcon />
        <h3 className="settings-title">회원 정보 관리</h3>
      </header>

      <div className="settings-user">
        {username
          ? <p className="settings-username">{username}님</p>
          : <p className="settings-guest">햇살강쥐</p>
        }
      </div>

      <ul className="settings-list">
        <li>회원 정보 수정</li>
        <li>멤버십</li>
        <li onClick={() => nav("/points")}>적립금</li>
        <li>쿠폰</li>
        <li onClick={handleLogout}>로그아웃</li>
      </ul>

      {showLogout && (
        <LogoutConfirmModal
          onConfirm={confirmLogout}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </div>
  );
};

export default SettingsPage;