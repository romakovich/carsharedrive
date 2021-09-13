import { RegistrationModule } from './Registration/registration.module';
import { LoginModule } from './Login/login.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RentCarModule } from './Rent-car/rent-car.module';
import { TripModule } from './trip/trip.module';
import { MessagesModule } from './messages/messages.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { RentCar } from './Rent-car/entities/rent-car.entity';

@Module({
  imports: 
  [
    TypeOrmModule.forRoot({
      name: "default",
      type: "mongodb",
      host: "localhost",
      port: 27017,
      database: "skilldrive-db",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      entities: [
        RentCar,
        `${__dirname}/**/*.entity.{ts,js}`
      ],
    }),
    MongooseModule.forRoot('mongodb://localhost/skilldrive2'),
    RegistrationModule,
    LoginModule,
    RentCarModule,
    TripModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
