export type User = {
    id: number;
    username: string;
    role: 'admin' | 'user';
}

export type UserWithPassword = User & {
    password: string;
}

export type UserModel = {
    username:string,
    password:string,
    isAdmin:boolean
}