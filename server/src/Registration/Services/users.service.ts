import { Injectable } from "@nestjs/common";
import { MessagesEntity } from "src/messages/entities/message.entity";
import { RentCar } from "src/Rent-car/entities/rent-car.entity";
import { TripEntity } from "src/trip/entities/trip.entity";
import { getMongoManager } from "typeorm";
import { RegistrationEntity } from '../entities/registration.entity';

@Injectable()
export class UsersService {

    async getUser(param) {
    const manager = getMongoManager();
    
    const users = await manager.find( RegistrationEntity, {
        where: { mail: { $ne: param.mail } }
    } );

    const noReadMessage = await manager.find( MessagesEntity, {
        where: {
            toUser: param.mail,
            isRead: false
        }
    } )

    const trips = await manager.find(TripEntity, {});

    noReadMessage.length 
    ? users.forEach(elUsers => {
        
        noReadMessage.forEach(elMessage => {
            elUsers.mail == elMessage.fromUser 
            ? elUsers["isRead"] = false
            : elUsers["isRead"] = true
        })

    })
    : users.forEach(elUsers => elUsers["isRead"] = true);

    users.forEach(elUsers => {
        trips.forEach(elTrip => {
            if(elTrip.client == elUsers.mail || elTrip.ownerCar == elUsers.mail) {
                elUsers["lastTrip"] = elTrip} 
        })
    })
    
    return users;
    }

    async getUserWithCars(mail) {
        const manager = getMongoManager();

        console.log(mail)

        const findUser = await manager.findOne( RegistrationEntity, {mail});
        if(!findUser) return "Нет таких юзеров";
        findUser["cars"] = await manager.find( RentCar, { where: {
            ["owner.mail"]: mail
        }});

        return findUser;
    }
}