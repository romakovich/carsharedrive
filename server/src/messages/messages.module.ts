import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessagesGateway } from './messages.gateway';
import { MessagesRepository } from './Repositories/messages.repository';
import { authVerifyMiddleware } from 'src/config/authVerifyMiddleware';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository, MessagesGateway]
})
export class MessagesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(authVerifyMiddleware)
    .forRoutes('messages')
  }
}
