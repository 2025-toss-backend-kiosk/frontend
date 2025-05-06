// src/App.tsx
import React from "react";
import AppRouter from "./routes/Router";
import { CartProvider } from "./store/CartContext";   // ✅ 추가
import "./App.css";

function App() {
  return (
    <CartProvider>          {/* 🟡 전역 장바구니 컨텍스트 */}
      <div className="app-wrapper">
        <AppRouter />
      </div>
    </CartProvider>
  );
}

export default App;