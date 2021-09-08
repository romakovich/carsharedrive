import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RentCarService } from './Services/rent-car.service';
import { RentCarController } from './rent-car.controller';
import { RentCarRepository } from './repositories/rent-car.repository';
import { CreateCarService } from './Services/create-car.service';
import { isLicenseInDb } from './Middleware/isLicenseInDb.middleware';

@Module({
  controllers: [RentCarController],
  providers: [RentCarService, CreateCarService, RentCarRepository]
})

export class RentCarModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(isLicenseInDb)
    .forRoutes('rent-car/step1')
  }

}
