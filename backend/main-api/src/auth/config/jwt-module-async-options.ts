import {JwtModuleAsyncOptions, JwtModuleOptions} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

const JwtModuleOptions = (config: ConfigService): JwtModuleOptions => ({
    secret: config.get('JWT_SECRET'),
    signOptions: {
        expiresIn: config.get('JWT_EXP', '60m'),
    }
})

export const options = (): JwtModuleAsyncOptions => ({
    inject: [ConfigService],
    useFactory: (config:  ConfigService) => JwtModuleOptions(config),
})
