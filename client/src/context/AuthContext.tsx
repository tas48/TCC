const urlRegister = "http://127.0.0.1:8000/auth/register";
const urlLogin = "http://127.0.0.1:8000/auth/login";

import { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";
import { removeToken, saveToken } from "./utils/localStorage";

interface User {
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      //implementar verificação de token depois
      const response = await axios.post(urlLogin, { email, password });
      saveToken(response.data.token);
      setUser({ email, token: response.data.token });
      return true;
    } catch (error: any) {
      alert(error.response?.data.detail || "Erro ao fazer login");
      return false;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await axios.post(urlRegister, { username, email, password });
      await login(email, password);
      alert("Cadastro realizado! Logado automaticamente.");
    } catch (error: any) {  
      alert(error.response?.data.detail || "Erro ao cadastrar");
    }
  };

  const logout = () => {
    setUser(null);
    removeToken();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
