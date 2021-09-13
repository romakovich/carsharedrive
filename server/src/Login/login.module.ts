import { checkMailMiddleware } from './Middleware/checkMail.middleware.js';
import { checkPasswordMiddleware } from './Middleware/checkPassword.middleware';

import { LoginController } from './Controllers/login.controller';
import { LoginService } from 'src/Login/Services/Login.service';
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { RentCarRepository } from 'src/Rent-car/repositories/rent-car.repository';

@Module({
    providers: [LoginService, RentCarRepository],
    controllers: [LoginController]
})
export class LoginModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(checkMailMiddleware, checkPasswordMiddleware)
        .forRoutes('users/auth/access')

        consumer
        .apply(checkMailMiddleware)
        .forRoutes('users/auth/pass-recovery', 'users/auth/pass-reset')
    }
}