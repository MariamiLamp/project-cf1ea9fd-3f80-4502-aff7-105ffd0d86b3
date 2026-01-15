import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "company" | "user";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: Record<string, User & { password: string }> = {
  "admin@hr.com": {
    id: "1",
    email: "admin@hr.com",
    name: "مدير النظام",
    role: "admin",
    password: "admin123",
  },
  "company@hr.com": {
    id: "2",
    email: "company@hr.com",
    name: "شركة التقنية",
    role: "company",
    companyName: "شركة التقنية المتقدمة",
    password: "company123",
  },
  "user@hr.com": {
    id: "3",
    email: "user@hr.com",
    name: "أحمد محمد",
    role: "user",
    password: "user123",
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Read from localStorage on init
    try {
      const stored = localStorage.getItem("auth_user");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  const login = (email: string, password: string, role: UserRole): boolean => {
    const mockUser = mockUsers[email];
    if (mockUser && mockUser.password === password && mockUser.role === role) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem("auth_user", JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
