import { UserService } from './user.service';
import { UserResponse } from "@user/responses";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(dto: any): Promise<UserResponse>;
    findOneUser(idOrEmail: string): Promise<UserResponse>;
    findAllUser(): Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        roles: import(".prisma/client").$Enums.Roles[];
    }[]>;
    findMe(token: string): Promise<UserResponse>;
    validToken(token: string): Promise<{
        isValid: boolean;
    } | undefined>;
    deleteUser(id: string): Promise<UserResponse>;
}
