import React from 'react';
import AppRouter from './routes/Router';
import './App.css'; // 여기에 스타일 작성할 거야

function App() {
  return (
    <div className="app-wrapper">
      <AppRouter />
    </div>
  );
}
export default App;