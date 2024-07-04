import { createContext } from 'react'

export interface AuthContextProps {
    isAuth?: boolean;
    setIsAuth?: (isAuth: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps>({});