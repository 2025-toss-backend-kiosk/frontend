import React from 'react';
import BackIcon from '../components/BackIcon';
import '../style/megaStyle.css';

interface PointRecord {
  date: string;
  desc: string;
  orderNo: number;
  amt: number;
}

const dummyData: PointRecord[] = [
  { date: '2025.04.13', desc: '주문 적립', orderNo: 342, amt: 30 },
  { date: '2025.02.21', desc: '주문 적립', orderNo: 578, amt: 33 },
  { date: '2024.11.23', desc: '주문 적립', orderNo: 236, amt: 4 },
  { date: '2024.07.11', desc: '주문 적립', orderNo: 100, amt: 24 },
];

const totalPoints = dummyData.reduce((s, r) => s + r.amt, 0);

const PointsPage: React.FC = () => {
  return (
    <div className="points-page">
      <header className="payment-header">
        <BackIcon />
        <h3 className="payment-title">적립금</h3>
      </header>

      {/* 카드 */}
      <div className="points-card">
        <p className="points-card-title">사용 가능한 적립금액</p>
        <p className="points-amount">{totalPoints.toLocaleString()}P</p>
        <p className="points-sub">당월 소멸 예정 0P</p>
      </div>

      {/* 리스트 */}
      <ul className="points-list">
        {dummyData.map((r, i) => (
          <li key={i} className="points-item">
            <span className="points-date">{r.date}</span>
            <span className="points-desc">{r.desc}</span>
            <span className="points-order">주문번호: {r.orderNo}</span>
            <span className="points-amt">+ {r.amt}P</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PointsPage;