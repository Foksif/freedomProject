import { User } from '@prisma/client';
import { PrismaService } from "@prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
export declare class UserService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    save(user: Partial<User>): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        roles: import(".prisma/client").$Enums.Roles[];
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findOne(idEmailOrName: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        roles: import(".prisma/client").$Enums.Roles[];
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getAllUsers(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        roles: import(".prisma/client").$Enums.Roles[];
    }[]>;
    getMe(token: string): {
        user: any;
        isValid: boolean;
    };
    validToken(token: string): {
        isValid: boolean;
    } | undefined;
    delete(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        roles: import(".prisma/client").$Enums.Roles[];
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    private getAll;
    private hashPassword;
}
