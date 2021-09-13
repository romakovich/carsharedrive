import { Controller, Get, Query, Post, Body, Param, Delete, Put, HttpCode, UseInterceptors, UploadedFiles, UploadedFile, UsePipes, ValidationPipe } from '@nestjs/common';
import { RentCarService } from './Services/rent-car.service';
import { CreateRentCarDto } from './dto/create-rent-car.dto';
import { step1ValidateDto } from './dto/step1-validate.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateCarService } from './Services/create-car.service';

@Controller('rent-car')
export class RentCarController {
  constructor(
    private readonly rentCarService: RentCarService,
    private readonly createCarService: CreateCarService
    ) {}

  @Post('create')
  @UseInterceptors(AnyFilesInterceptor())
  async create(
    @Body() createRentCarDto: CreateRentCarDto,
    @UploadedFiles() img: Express.Multer.File,
  ) {
    return this.createCarService.create(createRentCarDto, img);
  }

  @Post('step1')
  @HttpCode(200)
  async step1Validate(@Body() step1ValidateDto: step1ValidateDto) {
    console.log(step1ValidateDto);
    return;
  }

  @Put(':_id')
  async update(@Body() payload, @Param() param: string) {
    return this.rentCarService.update(payload, param);
  }

  @Get()
  find(@Query() param: any) {
    return this.rentCarService.find(param);
  }

  @Get('start')
  findStart(@Query() param: any) {
    return this.rentCarService.findStart(param);
  }

  @Get(':mail')
  GetByOwner(@Param() param: string) {
    return this.rentCarService.getByOwner(param)
  }

  @Get('car-page/:id')
  GetCar(@Param() param: string) {
    console.log(param);
    return this.rentCarService.getCar(param)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentCarService.remove(+id);
  }
}