import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Admin } from '../types';

interface AuthState {
  user: User | null;
  admin: Admin | null;
  isAuthenticated: boolean;
  loading: boolean;
}

type AuthAction =
  | { type: 'LOGIN_USER'; payload: User }
  | { type: 'LOGIN_ADMIN'; payload: Admin }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AuthState = {
  user: null,
  admin: null,
  isAuthenticated: false,
  loading: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        user: action.payload,
        admin: null,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGIN_ADMIN':
      return {
        ...state,
        admin: action.payload,
        user: null,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        admin: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  loginUser: (userData: User) => void;
  loginAdmin: (adminData: Admin) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const [state, dispatch] = useReducer(authReducer, initialState);

  const loginUser = (userData: User) => {
    dispatch({ type: 'LOGIN_USER', payload: userData });
  };

  const loginAdmin = (adminData: Admin) => {
    dispatch({ type: 'LOGIN_ADMIN', payload: adminData });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        loginAdmin,
        logout,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};