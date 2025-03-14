import {BadRequestException, Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors} from '@nestjs/common';

import { LoginDto, RegisterDto } from './dto';
import { AuthService } from './auth.service';
import { Public } from '@common/decorators';
import {UserResponse} from "@user/responses";

@Public()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    async register(@Body() dto: RegisterDto) {
        const user = await this.authService.register(dto);
        if (!user) {
            throw new BadRequestException(`Ну удалось зарегистрировать пользователя`);
        }

        return new UserResponse(user);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        const token = this.authService.login(dto);
        if (!token) {
            throw new BadRequestException('Не удалось войти в систему')
        }
        return token;
    }
}
