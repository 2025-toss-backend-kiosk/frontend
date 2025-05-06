import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/megaStyle.css';
import BackIcon from '../components/BackIcon';


const MegaLogin: React.FC = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [isSent, setIsSent] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(300);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [sendActive, setSendActive] = useState<boolean>(false);
  const [verifyActive, setVerifyActive] = useState<boolean>(false);

  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [checks, setChecks] = useState({
    terms: false,
    privacy: false,
    thirdParty: false,
    marketing: false
  });

  useEffect(() => {
    setSendActive(phone.length >= 10);
  }, [phone]);

  useEffect(() => {
    setVerifyActive(isSent && code.length > 0);
  }, [code, isSent]);

  useEffect(() => {
    if (isSent && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [isSent, timer]);

  const handleSend = () => {
    setIsSent(true);
    setTimer(300);
    setSendActive(false);
  };

  const handleVerify = () => {
    if (code === '123456') {
      setIsVerified(true);
      setIsSent(false);
    } else {
      alert('인증번호가 올바르지 않습니다.');
    }
  };

  const handleAllCheck = () => {
    const newState = !allChecked;
    setAllChecked(newState);
    setChecks({
      terms: newState,
      privacy: newState,
      thirdParty: newState,
      marketing: newState
    });
  };

  const handleCheck = (key: keyof typeof checks) => {
    const newChecks = { ...checks, [key]: !checks[key] };
    setChecks(newChecks);
    const allCheckedNow = Object.values(newChecks).every((v) => v);
    setAllChecked(allCheckedNow);
  };

  const formatTime = (sec: number): string => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className='loginscreen'>
      <div className='header'>
        <BackIcon />
        <h3 className='login-title'>로그인/회원가입</h3>
      </div>

      <div className='text-login'>
        휴대전화를 등록하셔야 적립이 가능합니다.<br />
        개인 정보 수탁사: NHN <br />
        업무의 내용: 인증번호 문자 발송 대행
      </div>

      <p className='text-phone'>휴대전화번호 등록</p>

      <div className='login-form'>
        <div className='phone-input-wrapper'>
          <input
            type='text'
            placeholder='휴대전화번호 입력'
            className='login-phone'
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

        <div className='code-input-wrapper'>
          <input
            type='text'
            placeholder='인증번호 입력'
            className='login-number'
            value={code}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
          />
          <span className='code-timer'>{isSent ? formatTime(timer) : '05:00'}</span>
        </div>

        <button
          className={`number-check-btn ${verifyActive ? 'active' : 'disabled'}`}
          onClick={handleVerify}
          disabled={!verifyActive}
        >
          인증번호 확인
        </button>

        {isVerified && <p className='success-text'>✅ 인증 성공</p>}

        <div className='checkmessage'>
          * 기존 가입 고객은 별도의 회원가입 없이 로그인 화면으로 전환됩니다.
        </div>

        <div className='agreement-section'>
          <label className='all-check'>
            <input type='checkbox' checked={allChecked} onChange={handleAllCheck} /> 전체 동의
          </label><br />
          <label className='terms'>
            <input type='checkbox' checked={checks.terms} onChange={() => handleCheck('terms')} /> 서비스 이용약관 (필수)
          </label>
          <div className='lookup'>전문보기</div>
          <label className='privacy'>
            <input type='checkbox' checked={checks.privacy} onChange={() => handleCheck('privacy')} /> 개인정보 처리방침 (필수)
          </label>
          <div className='lookup2'>전문보기</div>
          <div className='promise-section'>
            <div className='promise'>개인정보 수집</div>
            <div className='promise2'>목적: 적립금 사용 및 취소 정보, CS신청정보 <br />
            항목: 휴대전화번호<br /> 보유기간: 회원탈퇴 즉시 또는 이용 목적 달성 즉시 파기</div>
          </div>
          <label className='third-party'>
            <input type='checkbox' checked={checks.thirdParty} onChange={() => handleCheck('thirdParty')} /> 제3자 개인정보 활용 동의 (필수)
          </label>
          <div className='lookup3'>전문보기</div>
          <label className='marketing'>
            <input type='checkbox' checked={checks.marketing} onChange={() => handleCheck('marketing')} /> 마케팅 활용 동의 (필수)
          </label>
          <div className='lookup4'>전문보기</div>
        </div>
      </div>
      <button className="big-black-btn" type="button" onClick={() => navigate("/home")}>
        로그인/회원가입
      </button>
    </div>
  );
};

export default MegaLogin;
