import { UsersService } from '../Services/users.service';
import { Controller, Query, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController  {
    constructor(private UsersService: UsersService
      ) {}

      @Get()
      getUser(@Query() query: string) {
        return this.UsersService.getUser(query);
      }

      @Get(':mail')
      getUserWithCars(@Param('mail') mail) {
        return this.UsersService.getUserWithCars(mail);
      }
}

