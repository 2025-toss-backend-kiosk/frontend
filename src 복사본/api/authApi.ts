const API_BASE = "http://localhost:8080/api/auth";

export const requestAuthCode = async (phone: string): Promise<void> => {
  const res = await fetch(`${API_BASE}/phones`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "인증번호 요청 실패");
  }
};

export const verifyAuthCode = async (
  phone: string,
  code: string
): Promise<{ success: boolean; message: string }> => {
  const res = await fetch(`${API_BASE}/phones/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone, code }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "인증 실패");
  }

  return res.json();
};

export const login = async (phone: string): Promise<string> => {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "로그인 실패");
  }

  const data = await res.json();
  return data.token;
};

export const join = async (phone: string, nickname: string): Promise<string> => {
  const res = await fetch(`${API_BASE}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone, nickname }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "회원가입 실패");
  }

  const data = await res.json();
  return data.token;
};
