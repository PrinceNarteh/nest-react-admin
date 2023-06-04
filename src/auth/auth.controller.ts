import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/entity/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { Request, Response } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<User> {
    return this.authService.login(loginDto, res);
  }

  @Get('user')
  async user(@Req() req: Request): Promise<User> {
    return this.authService.user(req);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return {
      message: 'Logout successful',
    };
  }
}
