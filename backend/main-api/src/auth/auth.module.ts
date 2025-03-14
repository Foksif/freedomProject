import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "@user/user.module";
import {options} from "./config";
import {STRATEGIES} from "./strategies";
import {GUARDS} from "./guards";

@Module({
  imports: [PassportModule, JwtModule.registerAsync(options()), UserModule],
  controllers: [AuthController],
  providers: [AuthService, ...STRATEGIES, ...GUARDS],
})
export class AuthModule {}
