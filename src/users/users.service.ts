import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userService: Repository<User>,
  ) {}

  async allUsers(): Promise<User[]> {
    return this.userService.find();
  }
}
