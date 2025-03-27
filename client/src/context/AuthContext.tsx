const urlRegister = "http://127.0.0.1:8000/register"
const urlLogin = "http://127.0.0.1:8000/login"
import { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";

interface User {
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(urlLogin, { email, password });
      setUser({ email, token: response.data.token });
    } catch (error: any) {
      alert(error.response?.data.detail || "Erro ao fazer login");
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await axios.post(urlRegister, { email, password });
      await login(email, password);
      alert("Cadastro realizado! Logado automaticamente.");
    } catch (error: any) {
      alert(error.response?.data.detail || "Erro ao cadastrar");
    }
  };

  const logout = () => {
    setUser(null);
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
