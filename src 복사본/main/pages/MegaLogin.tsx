// src/main/pages/MegaLogin.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/megaStyle.css';
import BackIcon from '../components/BackIcon';
import { requestAuthCode, verifyAuthCode, login, join } from '../../api/authApi';

// 랜덤 닉네임 생성 유틸 (숫자 없이)
const adjectives = ['행복한','멋진','신나는','귀여운','용감한','별빛','달빛','하늘','바다','숲속'];
const nouns      = ['토끼','고양이','강아지','사자','호랑이','음표','별','구름','나무','꽃'];
function generateRandomName(): string {
  const adj  = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj}${noun}`;
}

const MegaLogin: React.FC = () => {
  const navigate = useNavigate();

  // 입력 상태
  const [phone, setPhone]           = useState('');
  const [code, setCode]             = useState('');
  const [isSent, setIsSent]         = useState(false);
  const [timer, setTimer]           = useState(300);
  const [isVerified, setIsVerified] = useState(false);
  const [sendActive, setSendActive] = useState(false);
  const [verifyActive, setVerifyActive] = useState(false);

  // 약관 동의 상태
  const [allChecked, setAllChecked] = useState(false);
  const [checks, setChecks] = useState({
    terms: false,
    privacy: false,
    thirdParty: false,
    marketing: false,
  });

  // “인증번호 발송” 버튼 활성화
  useEffect(() => {
    // 숫자만 추출했을 때 10자리 이상이면 활성
    setSendActive(phone.replace(/\D/g, '').length >= 10);
  }, [phone]);

  // “인증번호 확인” 버튼 활성화
  useEffect(() => {
    setVerifyActive(isSent && code.trim().length > 0);
  }, [code, isSent]);

  // 타이머 카운트다운
  useEffect(() => {
    if (isSent && timer > 0) {
      const id = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(id);
    }
  }, [isSent, timer]);

  // 발송 핸들러
  const handleSend = async () => {
    try {
      await requestAuthCode(phone);
      setIsSent(true);
      setTimer(300);
      setSendActive(false);
      alert('인증번호를 발송했습니다.');
    } catch {
      alert('인증번호 발송 실패');
    }
  };

  // 인증 핸들러
  const handleVerify = async () => {
    try {
      await verifyAuthCode(phone, code);
      setIsVerified(true);
      setIsSent(false);
      alert('인증 성공!');
    } catch {
      alert('인증 실패');
    }
  };

  // 전체 동의 토글
  const handleAllCheck = () => {
    const v = !allChecked;
    setAllChecked(v);
    setChecks({ terms: v, privacy: v, thirdParty: v, marketing: v });
  };
  // 개별 약관 토글
  const handleCheck = (key: keyof typeof checks) => {
    const next = { ...checks, [key]: !checks[key] };
    setChecks(next);
    setAllChecked(Object.values(next).every(x => x));
  };

  // 타이머 문자열 포맷
  const formatTime = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  // 로그인 or 회원가입
  const handleLoginOrJoin = async () => {
    // 필수 인증 및 약관 체크
    if (!isVerified || !checks.terms || !checks.privacy || !checks.thirdParty) {
      alert('인증 및 필수 약관 동의를 완료해주세요.');
      return;
    }

    try {
      // 기존 회원 로그인 시도
      const token = await login(phone);
      localStorage.setItem('token', token);
      alert('로그인 성공!');
    } catch {
      // 로그인 실패 → 회원가입
      const randomName = generateRandomName();
      try {
        const token = await join(phone, randomName);
        localStorage.setItem('token', token);
        alert(`회원가입 성공! 닉네임: ${randomName}님`);
      } catch {
        alert('회원가입 실패');
        return;
      }
    }

    navigate('/menu/coffee');
  };

  return (
    <div className="loginscreen">
      <div className="header">
        <BackIcon />
        <h3 className="login-title">로그인/회원가입</h3>
      </div>

      <div className="text-login">
        휴대전화를 등록하셔야 적립이 가능합니다.<br />
        개인 정보 수탁사: NHN<br />
        업무의 내용: 인증번호 문자 발송 대행
      </div>

      <p className="text-phone">휴대전화번호 등록</p>

      <div className="login-form">
        {/* 휴대폰 입력 + 발송 버튼 */}
        <div className="phone-input-wrapper">
          <input
            type="text"
            placeholder="휴대전화번호 입력"
            className="login-phone"
            value={phone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
          />
          <button
            className={`send-number-btn ${sendActive ? 'active' : 'disabled'}`}
            onClick={handleSend}
            disabled={!sendActive}
          >
            인증번호 발송
          </button>
        </div>

        {/* 인증번호 입력 + 타이머 */}
        <div className="code-input-wrapper">
          <input
            type="text"
            placeholder="인증번호 입력"
            className="login-number"
            value={code}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
          />
          <span className="code-timer">
            {isSent ? formatTime(timer) : '05:00'}
          </span>
        </div>

        {/* 인증 확인 버튼 */}
        <button
          className={`number-check-btn ${verifyActive ? 'active' : 'disabled'}`}
          onClick={handleVerify}
          disabled={!verifyActive}
        >
          인증번호 확인
        </button>

        {isVerified && <p className="success-text">✅ 인증 성공</p>}

        <div className="checkmessage">
          * 기존 가입 고객은 별도 회원가입 없이 로그인됩니다.
        </div>

        {/* 약관 동의 */}
        <div className="agreement-section">
          <label className="all-check">
            <input
              type="checkbox"
              checked={allChecked}
              onChange={handleAllCheck}
            /> 전체 동의
          </label>
          <br />
          <label className="terms">
            <input
              type="checkbox"
              checked={checks.terms}
              onChange={() => handleCheck('terms')}
            /> 서비스 이용약관 (필수)
          </label>
          <div className="lookup">전문보기</div>

          <label className="privacy">
            <input
              type="checkbox"
              checked={checks.privacy}
              onChange={() => handleCheck('privacy')}
            /> 개인정보 처리방침 (필수)
          </label>
          <div className="lookup2">전문보기</div>

          <label className="third-party">
            <input
              type="checkbox"
              checked={checks.thirdParty}
              onChange={() => handleCheck('thirdParty')}
            /> 제3자 개인정보 활용 동의 (필수)
          </label>
          <div className="lookup3">전문보기</div>

          <label className="marketing">
            <input
              type="checkbox"
              checked={checks.marketing}
              onChange={() => handleCheck('marketing')}
            /> 마케팅 활용 동의
          </label>
          <div className="lookup4">전문보기</div>
        </div>
      </div>

      {/* 로그인/회원가입 버튼 */}
      <button
        className="big-black-btn"
        onClick={handleLoginOrJoin}
        disabled={
          !isVerified ||
          !checks.terms ||
          !checks.privacy ||
          !checks.thirdParty
        }
      >
        로그인/회원가입
      </button>
    </div>
  );
};

export default MegaLogin;