import { Injectable } from "@nestjs/common";
import { getMongoRepository } from "typeorm";
import { RentCar } from "../entities/rent-car.entity";

@Injectable()
export class RentCarRepository {
    async create( rentCar: RentCar) {
        const repository = getMongoRepository(RentCar);
        return await repository.save(rentCar);
    }
}