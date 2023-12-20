export interface User {
    email: string;
    password: string;
    admin: string;
}

export interface UserID extends User {
    id?: number;
}

export interface UserPartial extends Partial<User> {

}