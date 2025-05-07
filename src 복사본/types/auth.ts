// src/types/auth.ts
export interface JoinRequest {
  phone: string;
  nickname: string;
}

export interface LoginRequest {
  phone: string;
}

export interface AuthResponse {
  token: string;
}
