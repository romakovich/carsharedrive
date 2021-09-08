import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { TripRepository } from './repositories/trip.repository';
import { isDateAvailable } from './Middleware/isDateAvailable.middleware';

@Module({
  controllers: [TripController],
  providers: [TripService, TripRepository]
})

export class TripModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(isDateAvailable)
    .forRoutes(
      { path: 'trip', method: RequestMethod.POST }
      )
}
}
