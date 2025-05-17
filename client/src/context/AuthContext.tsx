import { createContext, useState, useContext, ReactNode } from "react";
import api from '../utils/api';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      setUser({ email });
      return true;
    } catch (error: any) {
      alert(error.response?.data.detail || "Erro ao fazer login");
      return false;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await api.post('/auth/register', { username, email, password });
      await login(email, password);
      alert("Cadastro realizado! Logado automaticamente.");
    } catch (error: any) {  
      alert(error.response?.data.detail || "Erro ao cadastrar");
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
    } catch (error: any) {
      console.error("Erro ao fazer logout:", error);
      setUser(null);
    }
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
