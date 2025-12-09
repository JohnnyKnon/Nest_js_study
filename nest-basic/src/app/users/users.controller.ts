import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

interface User {
  id: string;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User {
    return this.usersService.findOne(id);
  }
}
