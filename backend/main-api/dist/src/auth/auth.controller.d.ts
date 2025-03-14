import { LoginDto, RegisterDto } from './dto';
import { AuthService } from './auth.service';
import { UserResponse } from "@user/responses";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<UserResponse>;
    login(dto: LoginDto): Promise<import("./interfaces").IToken>;
}
