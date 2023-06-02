import { Controller, Get } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.allUsers();
  }
}
