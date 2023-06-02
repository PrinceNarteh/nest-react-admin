import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async register(createUserDto: CreateUserDto) {
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
}
