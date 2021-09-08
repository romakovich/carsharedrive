import { Column, Entity, ObjectIdColumn } from "typeorm";
import { Document } from 'mongoose';
export type RegistrationDocument = typeof RegistrationEntity & Document;

@Entity("Users")
export class RegistrationEntity {
    @ObjectIdColumn()
    _id;

    @Column()
    name: string;
    
    @Column()
    birthday: string;

    @Column()
    mail: string;

    @Column()
    phone: string;

    @Column()
    passport: string;

    @Column()
    passportDate: string

    @Column()
    passportOrgan: string;

    @Column()
    passportCode: string;

    @Column()
    driver: string;

    @Column()
    driverDate: string;

    @Column()
    password: string

    @Column()
    imgAvatar: string;

    @Column()
    photosDoc: Array<any>
    
    @Column()
    idRecovery: string;

    @Column()
    haveNotReadMessage: boolean;
}
