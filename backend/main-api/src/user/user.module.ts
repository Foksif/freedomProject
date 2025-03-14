import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {PrismaModule} from "@prisma/prisma.module";
import {JwtModule} from "@nestjs/jwt";
import {options} from "@auth/config";

@Module({
  imports: [PrismaModule, JwtModule.registerAsync(options()), UserModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
