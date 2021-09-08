import { IsNotEmpty } from 'class-validator';

export class step1ValidateDto {

    @IsNotEmpty()
    brand: string

    @IsNotEmpty()
    model: string

    @IsNotEmpty()
    year: string

    @IsNotEmpty()
    city: string

    @IsNotEmpty()
    category: string

    @IsNotEmpty()
    driveUnit: string

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
}