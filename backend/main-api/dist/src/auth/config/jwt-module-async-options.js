"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const config_1 = require("@nestjs/config");
const JwtModuleOptions = (config) => ({
    secret: config.get('JWT_SECRET'),
    signOptions: {
        expiresIn: config.get('JWT_EXP', '60m'),
    }
});
const options = () => ({
    inject: [config_1.ConfigService],
    useFactory: (config) => JwtModuleOptions(config),
});
exports.options = options;
//# sourceMappingURL=jwt-module-async-options.js.map