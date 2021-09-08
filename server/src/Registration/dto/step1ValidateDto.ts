import { IsEmail, IsNotEmpty, IsDate, Length} from 'class-validator';

export class step1ValidateDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    @Length(8,12)
    birthday: string

    @IsNotEmpty()
    @IsEmail()
    mail: string

    @IsNotEmpty()
    phone: string

    @IsNotEmpty()
    passport: string

    @IsNotEmpty()
    @Length(8,12)
    passportDate: string

    @IsNotEmpty()
    passportOrgan: string

    @IsNotEmpty()
    passportCode: string

    @IsNotEmpty()
    driver: string

    @IsNotEmpty()
    @Length(8,12)
    driverDate: string

    idRecovery;
}