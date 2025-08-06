export type Tokens = {
    accessToken: string;
    refreshToken: string;
}

export type User = {
    id: string;
    email: string;
}

export type RegisteredUser = User & {
    fullName: string;
}

export type RegisteredResponse = {
    success: boolean;
    user: RegisteredUser;
    tokens: Tokens;
}

export type LoginResponse = {
    success: boolean;
    user: User;
    tokens: Tokens;
}

export type RegisterRequest = {
    fullName: string;
    email: string;
    password: string;
}

export type LoginRequest = {
    email: string;
    password: string;
}

