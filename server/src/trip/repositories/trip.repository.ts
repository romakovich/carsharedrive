import { Injectable } from "@nestjs/common";
import { getMongoRepository } from "typeorm";
import { TripEntity } from "../entities/trip.entity";

@Injectable()
export class TripRepository {
    async create(tripEntity: TripEntity) {
        const repository = getMongoRepository(TripEntity);
        return await repository.save(tripEntity);
    }
}