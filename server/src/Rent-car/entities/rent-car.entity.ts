import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";
import { RegistrationEntity as Owner} from "../../Registration/Entities/registration.entity";

@Entity("RentCar")
export class RentCar {
    @ObjectIdColumn()
    _id;

    @Column()
    brand: string;
    
    @Column()
    model: string;

    @Column()
    year: string;

    @Column()
    city: string;

    @Column()
    street: string;

    @Column()
    geo: Array<any>;

    @Column()
    category: string;

    @Column()
    license: string;

    @Column()
    VIN: string;

    @Column()
    color: string;

    @Column()
    engine: string;

    @Column()
    volume: string;

    @Column()
    power: string;

    @Column()
    transmission: string;

    @Column()
    mileage: string;

    @Column()
    PTS: string;

    @Column()
    STS: string;

    @Column()
    price: number;

    @Column()
    price3: number;

    @Column()
    price5: number;

    @Column()
    OSAGO: string;

    @Column()
    CASCO: string;

    @Column()
    driveUnit: string;

    @Column()
    options: Array<any>;

    @Column()
    photosCars: Array<any>;

    @Column()
    photosCarsDocs: Array<any>;

    @Column(()=>Owner)
    owner: Owner

    @Column()
    ownerPhoto: string

    @Column()
    rating: number;

    @Column()
    ratingCount: number;

    @Column()
    photo: string

    @Column()
    review:  string;

    @Column()
    trip: Array<any>
}
