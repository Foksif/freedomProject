import { BadRequestException, Injectable, Logger, UnauthorizedException, } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { UserService } from '@user/user.service';
import { IToken } from './interfaces';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const [name, email] = await Promise.all([
      this.userService.findOne(dto.name).catch((err) => {
        this.logger.error(err);
        return null;
      }),
      this.userService.findOne(dto.email).catch((err) => {
        this.logger.error(err);
        return null;
      }),
    ]);

    if (name || email) {
      throw new BadRequestException(
        `Похоже что пользователь с такими данными уже существует`,
      );
    }

    return this.userService.save(dto).catch((err) => {
      this.logger.error(err);
      return null;
    });
  }

  async login(dto: LoginDto): Promise<IToken> {
    // type UserCredentials = Pick<User, 'id' | 'name' | 'password' | 'roles'>;

    // const user: UserCredentials | null = await this.userService.findOne(dto.name).catch((err) => {
    const user: any = await this.userService.findOne(dto.name).catch((err) => {
      //Only DEV
      this.logger.error(err);
      return null;
    });

    if (!user || !compareSync(dto.password, user.password)) {
      throw new UnauthorizedException('Не верный логин или пароль');
    }

    const accessToken =
      this.jwtService.sign({
        id: user.id,
        name: user.name,
        role: user.roles,
      });

    return { accessToken };
  }
}
