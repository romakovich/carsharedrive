import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessagesGateway } from './messages.gateway';
import { MessagesRepository } from './Repositories/messages.repository';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository, MessagesGateway]
})
export class MessagesModule {}
