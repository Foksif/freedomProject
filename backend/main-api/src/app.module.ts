import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import {JwtAuthGuard} from "./auth/guards/jwt-auth.guard";
import {APP_GUARD} from "@nestjs/core";
import { NewsModule } from './news/news.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, ConfigModule.forRoot({isGlobal: true}), NewsModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
