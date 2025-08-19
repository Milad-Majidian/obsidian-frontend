 interface Tokens  {
    accessToken: string;
    refreshToken: string;
}

 interface User  {
    id: string;
    email: string;
}

// type RegisteredUser = User & {
//     fullName: string;
// }

interface RegisteredUser extends User {
    fullName: string;
}

export interface RegisteredResponse {
    success: boolean;
    user: RegisteredUser;
    tokens: Tokens;
}

export interface RegisterRequest  {
    fullName: string;
    email: string;
    password: string;
}