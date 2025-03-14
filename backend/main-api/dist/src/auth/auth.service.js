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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = AuthService_1 = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async register(dto) {
        const [name, email] = await Promise.all([
            this.userService.findOne(dto.name).catch((err) => {
                this.logger.error(err);
                return null;
            }),
            this.userService.findOne(dto.email).catch((err) => {
                this.logger.error(err);
                return null;
            }),
        ]);
        if (name || email) {
            throw new common_1.BadRequestException(`Похоже что пользователь с такими данными уже существует`);
        }
        return this.userService.save(dto).catch((err) => {
            this.logger.error(err);
            return null;
        });
    }
    async login(dto) {
        const user = await this.userService.findOne(dto.name).catch((err) => {
            this.logger.error(err);
            return null;
        });
        if (!user || !(0, bcrypt_1.compareSync)(dto.password, user.password)) {
            throw new common_1.UnauthorizedException('Не верный логин или пароль');
        }
        const accessToken = this.jwtService.sign({
            id: user.id,
            name: user.name,
            role: user.roles,
        });
        return { accessToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map