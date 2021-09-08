import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.messagesService.findAll(query);
  }

  @Get('chat')
  findChat(@Query() query: any) {
    return this.messagesService.findChat(query);
  }

  @Put(':id')
  update(@Param('id') messageTime, @Body() payload) {
    return this.messagesService.update(messageTime, payload);
  }

  @Delete(':id')
  remove(@Param('id') messageTime: string, @Body() payload) {
    return this.messagesService.remove(+messageTime, payload);
  }
}
