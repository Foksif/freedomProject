import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare const PUBLIC_KEY = "public";
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare const isPublic: (ctx: ExecutionContext, reflector: Reflector) => boolean;
