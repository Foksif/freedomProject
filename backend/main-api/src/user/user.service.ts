import { Injectable } from '@nestjs/common';

import { User }  from '@prisma/client'
import {PrismaService} from "@prisma/prisma.service";
import {genSaltSync, hashSync} from "bcrypt";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService,) {}

    save(user: Partial<User>) {
        if (!user.email || !user.name || !user.password) {
            throw new Error('Missing required fields: email, name, or password');
        }

        const hashedPassword = this.hashPassword(user.password);
        return this.prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashedPassword,
                roles: ["USER"],
            }
        });
    }

    findOne(idEmailOrName: string) {
        // if (idEmailOrName === 'all') {
        //     return this.prisma.user.findMany();
        // }
        return this.prisma.user.findFirst({
            where: {
                OR: [{ email: idEmailOrName }, { name: idEmailOrName }, { id: idEmailOrName }],
            }
        })
    }

    getAllUsers() {
        return this.prisma.user.findMany();
    }

    getMe(token: string) {
        const tokenData = this.jwtService.verify(token);
        return {"user": tokenData, "isValid": true};
    }

    validToken(token: string) {
        try {
            const tokenData = this.jwtService.verify(token);

            if (tokenData) {
                return {"isValid": true};
            }
        } catch (e) {
            // Если произошла ошибка верификации, токен невалиден
            return { "isValid": false };
        }
    }

    delete(id:  string) {
        return this.prisma.user.delete({where: {id: id}});
    }

    private getAll(){
        return this.prisma.user.findMany()
    }

    private hashPassword(password: string): string {
        return hashSync(password, genSaltSync(10))
    }
}
