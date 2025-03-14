"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPublic = exports.Public = exports.PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.PUBLIC_KEY = 'public';
const Public = () => (0, common_1.SetMetadata)(exports.PUBLIC_KEY, true);
exports.Public = Public;
const isPublic = (ctx, reflector) => {
    const isPublic = reflector.getAllAndOverride(exports.PUBLIC_KEY, [ctx.getHandler(), ctx.getClass()]);
    return isPublic;
};
exports.isPublic = isPublic;
//# sourceMappingURL=public.decortor.js.map