// src/store/UserContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface UserContextType {
  username: string;
  setUsername: (name: string) => void;
}

// 기본값 설정
const UserContext = createContext<UserContextType>({
  username: "",
  setUsername: () => {},
});

interface UserProviderProps {
  children: ReactNode;   // ← 여기에 children 을 명시
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string>("");

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);