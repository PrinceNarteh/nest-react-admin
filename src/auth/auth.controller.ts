import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/entity/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<User> {
    return this.authService.login(loginDto);
  }
}
