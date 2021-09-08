import { Injectable } from '@nestjs/common';
import { TripEntity } from 'src/trip/entities/trip.entity';
import { getMongoManager } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesEntity } from './entities/message.entity';
import { MessagesRepository } from './Repositories/messages.repository';

@Injectable()
export class MessagesService {
  constructor(private messagesRepository: MessagesRepository
    
    ) {}

  async create(createMessageDto: CreateMessageDto) {
    const newMessage = new MessagesEntity();

    newMessage.time = createMessageDto.time;
    newMessage.message = createMessageDto.message;
    newMessage.isRead = createMessageDto.isRead;

    newMessage.fromUser = createMessageDto.fromUser;
    newMessage.toUser = createMessageDto.toUser;
    newMessage.emoji = createMessageDto.emoji;

    newMessage.chatBot = createMessageDto.chatBot;
    newMessage.lastTrip = createMessageDto.lastTrip;

    return await this.messagesRepository.create(newMessage);
  }

  async findAll(query) {
    const manager = getMongoManager();
    return await manager.find( MessagesEntity, query )
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  async findChat(query) {
    const manager = getMongoManager();
    const findChat = await manager.find( MessagesEntity,  {  
     order: {time: 1}
    } )

    this.updateReadMessage(query)
    return findChat;
  }

  async update(messageTime, payload) {
    const manager = getMongoManager();
    const findMessage = await manager.findOne(MessagesEntity, {time: Number(messageTime)});
    
    if(payload.emoji) {
      const newEmojiArray = [...findMessage.emoji, payload.emoji];
      await manager.update(
        MessagesEntity, 
        { time: Number(messageTime) },
        { emoji: newEmojiArray }
      )
    } else {
      await manager.update(
        MessagesEntity, 
        { time: payload.messageTime },
        payload
      )
    }
  }

  async updateTrip(payload) {
    const manager = getMongoManager();
    await manager.update(
      TripEntity, 
      { dateRent: new Date(payload.tripTime) },
      payload.update
    )
  }

  async updateReadMessage(query) {
    const manager = getMongoManager();
    await manager.updateMany(
      MessagesEntity, {
      fromUser: query.toUser,
      toUser: query.fromUser
    }, 
    { $set: {  isRead: true }});
  }

  async remove(messageTime, payload) {
    console.log(payload)
    const manager = getMongoManager();
    return payload.chatBot 
    ? await manager.deleteMany(MessagesEntity, payload)
    : await manager.delete(MessagesEntity, {time: messageTime})
  }
}
