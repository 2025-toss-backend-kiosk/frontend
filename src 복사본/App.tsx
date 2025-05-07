// src/App.tsx
import React from "react";
import AppRouter from "./routes/Router";
import { CartProvider } from "./store/CartContext";     // 장바구니 컨텍스트
import { UserProvider } from "./store/UserContext";     // 사용자 컨텍스트
import "./App.css";

function App() {
  return (
    <UserProvider>              {/* 🟡 전역 사용자 컨텍스트 */}
      <CartProvider>            {/* 🟡 전역 장바구니 컨텍스트 */}
        <div className="app-wrapper">
          <AppRouter />
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;