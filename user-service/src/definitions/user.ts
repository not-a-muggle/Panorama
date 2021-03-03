export interface User {
    firstName: string;
    lastName: string;
    birthday: string;
    phonenumber: string;
    email: string;
    password: string;
}

export interface UserWithoutPassword {
    firstName: string;
    lastName: string;
    birthday: string;
    phonenumber: string;
    email: string;
}

export interface UserAuthenticationResponse {
    authenticated: boolean;
    token: string;
}
export interface UserServiceResponse {
    success: boolean;
}