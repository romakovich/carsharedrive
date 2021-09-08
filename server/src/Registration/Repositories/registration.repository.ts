import { Injectable } from "@nestjs/common";
import { getMongoRepository } from "typeorm";
import { RegistrationEntity } from "../entities/registration.entity";

@Injectable()
export class RegistrationRepository {
    async create( registartion: RegistrationEntity) {
        const repository = getMongoRepository(RegistrationEntity);
        return await repository.save(registartion);
    }
}