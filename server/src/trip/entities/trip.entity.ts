import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("TripEntity")
export class TripEntity {
    @ObjectIdColumn()
    _id;

    @Column()
    license: string;

    @Column()
    client: string;

    @Column()
    clientInfo;

    @Column()
    description: string;

    @Column()
    ownerCar: string;

    @Column()
    startRent

    @Column()
    endRent

    @Column()
    price: number;

    @Column()
    review: string;

    @Column()
    optionsDelivery: boolean;

    @Column()
    optionsBabyChair: boolean;

    @Column()
    optionsEndRentAnywhere: boolean;

    @Column()
    dateRent: Date;

    @Column()
    rate: number;

    @Column()
    statusStartRent: boolean;

    @Column()
    statusStartTalkOwner: boolean;

    @Column()
    statusStartTalkClient: boolean;

    @Column()
    days: number;

    @Column()
    car: object;
}
