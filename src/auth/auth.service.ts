import {
  ConflictException,
  Injectable,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/auth.dto';
import { User } from 'src/users/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { password, email } = createUserDto;

    let userExists = await this.userService.findOne({ where: { email } });
    if (userExists) {
      throw new ConflictException('Email already in use');
    }
    const hashedPassword: string = await bcrypt.hash(password, 12);
    const user = this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return user;
  }

  async login(
    login: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<User> {
    const { email, password } = login;
    const user = await this.userService.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credential');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    res.cookie('jwt', jwt, { httpOnly: true });

    return user;
  }
}
