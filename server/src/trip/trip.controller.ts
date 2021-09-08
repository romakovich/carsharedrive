import { Controller, Get, Post, Body, Put, Param, Delete, Response, Request, HttpCode, Query } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  create(@Body() createTripDto: CreateTripDto, @Response() res: any) {
    return this.tripService.create(createTripDto, res);
  }


  @Get()
  find(@Query() data: string) {
    console.log("te22st")
    return this.tripService.find(data);
  }

  @Put(':id')
  update(@Param('id') tripTime: string, @Body() payload) {
    return this.tripService.update(tripTime, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tripService.remove(+id);
  }

  @Get('test')
  test() {
    console.log("test")
    return "test"
  }
}
