import { User, Roles } from "@prisma/client";
export declare class UserResponse implements User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    roles: Roles[];
    constructor(user: User);
}
