import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RentCarService } from './Services/rent-car.service';
import { RentCarController } from './rent-car.controller';
import { RentCarRepository } from './repositories/rent-car.repository';
import { CreateCarService } from './Services/create-car.service';
import { isLicenseInDb } from './Middleware/isLicenseInDb.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentCar } from './entities/rent-car.entity';
import { authVerifyMiddleware } from 'src/config/authVerifyMiddleware';

@Module({
  imports: [TypeOrmModule.forFeature([RentCar])],
  controllers: [RentCarController],
  providers: [RentCarService, CreateCarService, RentCarRepository]
})

export class RentCarModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(authVerifyMiddleware)
    .forRoutes('rent-car')

    .apply(isLicenseInDb)
    .forRoutes('rent-car/step1')
  }
}
