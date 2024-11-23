
export interface RegisterUser {
    userName: string;
    email: string;
    password: string
}

export interface RegisterUserResponse {
    message: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface LoginUserResponse {
    email: string;
    userName: string;
    token: string;
}