import { IsEmail, IsNotEmpty, Length} from 'class-validator';

export class AuthLoginDto {

    @IsNotEmpty()
    @IsEmail()
    mail: string

    @IsNotEmpty()
    password: string

    passwordRepeat: string

    idRecovery: string;
}