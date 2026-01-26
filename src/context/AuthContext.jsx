// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { 
  getCurrentUser, 
  setCurrentUser, 
  logout as logoutStorage,
  findUserByEmail,
  addUser,
  getAdmin
} from '../utils/storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário logado ao carregar
    const savedUser = getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  // Login de Cliente
  const login = (email, password) => {
    const foundUser = findUserByEmail(email);
    
    if (!foundUser) {
      return { success: false, message: 'Usuário não encontrado' };
    }
    
    if (foundUser.password !== password) {
      return { success: false, message: 'Senha incorreta' };
    }

    const userWithoutPassword = { ...foundUser };
    delete userWithoutPassword.password;
    
    setUser(userWithoutPassword);
    setCurrentUser(userWithoutPassword);
    
    return { success: true, user: userWithoutPassword };
  };

  // Login de Admin
  const loginAdmin = (email, password) => {
    const admin = getAdmin();
    
    if (email !== admin.email) {
      return { success: false, message: 'Email de administrador inválido' };
    }
    
    if (password !== admin.password) {
      return { success: false, message: 'Senha incorreta' };
    }

    const adminWithoutPassword = { ...admin };
    delete adminWithoutPassword.password;
    
    setUser(adminWithoutPassword);
    setCurrentUser(adminWithoutPassword);
    
    return { success: true, user: adminWithoutPassword };
  };

  // Registro de Cliente
  const register = (name, email, password, phone) => {
    const existingUser = findUserByEmail(email);
    
    if (existingUser) {
      return { success: false, message: 'Este email já está cadastrado' };
    }

    const newUser = addUser({
      name,
      email,
      password,
      phone,
      role: 'customer'
    });

    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    
    setUser(userWithoutPassword);
    setCurrentUser(userWithoutPassword);
    
    return { success: true, user: userWithoutPassword };
  };

  // Logout
  const logout = () => {
    setUser(null);
    logoutStorage();
  };

  // Verificar se é admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Verificar se está logado
  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      loginAdmin,
      register,
      logout,
      isAdmin,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};