import { IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}