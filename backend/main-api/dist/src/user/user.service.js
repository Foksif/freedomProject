"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    save(user) {
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
    findOne(idEmailOrName) {
        return this.prisma.user.findFirst({
            where: {
                OR: [{ email: idEmailOrName }, { name: idEmailOrName }, { id: idEmailOrName }],
            }
        });
    }
    getAllUsers() {
        return this.prisma.user.findMany();
    }
    getMe(token) {
        const tokenData = this.jwtService.verify(token);
        const { id } = tokenData;
        const profileData = this.findOne(id);
        return profileData;
    }
    validToken(token) {
        try {
            const tokenData = this.jwtService.verify(token);
            if (tokenData) {
                return { "isValid": true };
            }
        }
        catch (e) {
            return { "isValid": false };
        }
    }
    delete(id) {
        return this.prisma.user.delete({ where: { id: id } });
    }
    getAll() {
        return this.prisma.user.findMany();
    }
    hashPassword(password) {
        return (0, bcrypt_1.hashSync)(password, (0, bcrypt_1.genSaltSync)(10));
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map