import { ObjectId } from "mongoose";
import { IsNotEmpty } from 'class-validator';

export class CreateRentCarDto {
    _id: ObjectId;

    @IsNotEmpty()
    brand: string

    @IsNotEmpty()
    model: string

    @IsNotEmpty()
    year: string

    @IsNotEmpty()
    city: string

    street: string

    geo: string

    @IsNotEmpty()
    category: string

    @IsNotEmpty()
    license: string

    @IsNotEmpty()
    VIN: string

    @IsNotEmpty()
    color: string

    @IsNotEmpty()
    engine: string

    @IsNotEmpty()
    volume: string

    @IsNotEmpty()
    power: string

    @IsNotEmpty()
    transmission: string

    @IsNotEmpty()
    mileage: string

    @IsNotEmpty()
    PTS: string

    @IsNotEmpty()
    STS: string

    @IsNotEmpty()
    price: any

    @IsNotEmpty()
    price3: any

    @IsNotEmpty()
    price5: any

    @IsNotEmpty()
    OSAGO: string

    @IsNotEmpty()
    CASCO: string

    @IsNotEmpty()
    driveUnit: string

    @IsNotEmpty()
    options: any

    review: string

<<<<<<< HEAD
    photosCars: Array<string>

    photosCarsDocs: Array<string>
=======
    photosCars: Array<String>

    photosCarsDocs: Array<String>
>>>>>>> 5f24eae1934ef3c1d1a5e045611b10c1da813f6f

    rating: number
    ratingCount: number
    owner: string
    ownerPhoto: string;
}
