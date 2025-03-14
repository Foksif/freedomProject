export interface ILogin {
    name: string;
    password: string;
}

export interface IRegister {
    name: string;
    email: string;
    password: string;
}

export interface IAuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}