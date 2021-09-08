import { isMailInDb } from './Middleware/isMailInDb.middleware';
import { RegistrationController } from './Controllers/registration.controller';
import { RegistrationService } from './Services/registration.service';

import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { RegistrationRepository } from './Repositories/registration.repository';
import { UsersService } from './Services/users.service';
import { UsersController } from './Controllers/users.controller';

@Module({
    providers: [RegistrationService, UsersService, RegistrationRepository],
    controllers: [RegistrationController, UsersController]
})
export class RegistrationModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(isMailInDb)
        .forRoutes('users/registration/step1')
    }
}