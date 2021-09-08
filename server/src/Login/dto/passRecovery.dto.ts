import { IsEmail, IsNotEmpty, Length} from 'class-validator';

export class PassRecovery {
    @IsNotEmpty()
    @IsEmail()
    mail: string
    idRecovery: string;
}