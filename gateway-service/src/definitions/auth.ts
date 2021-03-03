export interface BasicCreds {
    username: string;
    password: string;
}

export interface AuthResult {
    success: boolean;
    token: string;
}

export interface AuthCrudResult {
    success: boolean
}