import {User, Roles} from "@prisma/client";
import {Exclude} from "class-transformer";

export class UserResponse implements User {
    id: string;
    name: string;
    email: string;

    @Exclude()
    password: string;

    createdAt: Date;

    updatedAt: Date;
    roles: Roles[];

    constructor(user: User) {
        Object.assign(this, user)
    }
}