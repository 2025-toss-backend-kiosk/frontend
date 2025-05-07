// src/routes/Router.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MegaHome from "../main/pages/MegaHome";
import MegaFirstLogin from "../main/pages/MegaFirstLogin";
import MegaLogin from "../main/pages/MegaLogin";
import MegaOption from "../main/pages/MegaOption";
import MegaCart from "../main/pages/MegaCart";       // 🆕 장바구니 페이지
import PaymentPage from "../main/pages/PaymentPage";
import SettingsPage   from "../main/pages/SettingsPage";
import PointsPage   from "../main/pages/PointsPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ───────── 로그인 플로우 ───────── */}
        <Route path="/"         element={<MegaFirstLogin />} />
        <Route path="/login"    element={<MegaLogin />} />

        {/* ───────── 카테고리 메뉴 ───────── */}
        <Route path="/home"         element={<Navigate to="/menu/coffee" replace />} />
        <Route path="/menu/:category" element={<MegaHome />} />

        {/* ───────── 상세 옵션 ───────── */}
        <Route path="/option/:itemId" element={<MegaOption />} />

        {/* ───────── 기타 페이지 ───────── */}
        <Route path="/cart"    element={<MegaCart />} />     {/* 🆕 추가 */}
        <Route path="/pay"  element={<PaymentPage />} />
        <Route path="/options" element={<div>추가 옵션 페이지</div>} />
        <Route path="/setting" element={<SettingsPage />} />
        <Route path="/points"  element={<PointsPage />} />

        {/* ───────── 모든 미매칭 경로 → 홈 ───────── */}
        <Route path="*" element={<Navigate to="/menu/coffee" replace />} />
      </Routes>
    </BrowserRouter>
  );
}