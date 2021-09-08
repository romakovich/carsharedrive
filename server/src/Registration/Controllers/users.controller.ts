import { testDto } from '../dto/testDto';
import { UsersService } from '../Services/users.service';
import { Body, Controller, Query, Post, HttpCode, Response, UseInterceptors, UploadedFile, Get, UploadedFiles, Param } from '@nestjs/common';

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

