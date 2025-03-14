import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    UseInterceptors,
    Headers,
} from '@nestjs/common';
import {UserService} from './user.service';
import {UserResponse} from "@user/responses";
import {User} from "@prisma/client";
import { Public } from '@common/decorators';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    async createUser(@Body() dto) {
        const user = await this.userService.save(dto);

        return new UserResponse(user);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':idOrEmail')
    async findOneUser(@Param('idOrEmail') idOrEmail: string) {
        const user = await this.userService.findOne(idOrEmail);

        return new UserResponse(<User>user);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('get/all')
    async findAllUser() {
        return await this.userService.getAllUsers()
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('get/me')
    async findMe(@Headers('Authorization') token: string) {
        if (!token) {
            throw new Error('Authorization token is missing');
        }

        if (token.startsWith('Bearer ')) {
            token = token.replace('Bearer ', '');
        }

        return this.userService.getMe(token);
    }

    @Public()
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('get/token')
    async validToken(@Headers('Authorization') token: string) {
        if (!token) {
            throw new Error('Authorization token is missing');
        }

        if (token.startsWith('Bearer ')) {
            token = token.replace('Bearer ', '');
        }

        return this.userService.validToken(token);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Delete(':id')
    async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        const user = await this.userService.delete(id);

        return new UserResponse(user);
    }
}
