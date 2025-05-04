import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MegaHome from '../main/pages/MegaHome';
import MegaFirstLogin from '../main/pages/MegaFirstLogin';
import MegaLogin from '../main/pages/MegaLogin';
import MegaOption from '../main/pages/MegaOption';


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<MegaHome />} />
        <Route path="/menu/:category" element={<MegaHome />} />
        <Route path="/" element={<MegaFirstLogin />} />
        <Route path="/login" element={<MegaLogin />} />
        <Route path="/option" element={<MegaOption />} />
        <Route path="/option/:menuId" element={<MegaOption />} />
      </Routes>
    </BrowserRouter>
  );
}