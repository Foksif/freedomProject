import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base implements CanActivate {
    private readonly reflector;
    constructor(reflector: Reflector);
    canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
export {};
