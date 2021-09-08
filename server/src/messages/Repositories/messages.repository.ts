import { Injectable } from "@nestjs/common";
import { getMongoRepository } from "typeorm";
import { MessagesEntity } from "../entities/message.entity";

@Injectable()
export class MessagesRepository {
    async create( messages: MessagesEntity) {
        const repository = getMongoRepository(MessagesEntity);
        return await repository.save(messages);
    }
}