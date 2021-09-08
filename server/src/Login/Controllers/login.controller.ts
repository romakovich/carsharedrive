import { AuthLoginDto } from '../dto/auth.dto';
import { LoginService } from 'src/Login/Services/Login.service';
import { Body, Controller, Post, Response, Query } from '@nestjs/common';
import { getNewToken } from '../../config/getNewToken';
import { PassRecovery } from '../dto/passRecovery.dto';

@Controller('users/auth')
export class LoginController  {
    constructor(private LoginService: LoginService) {}

    @Post('access')
    auth(@Body() req: AuthLoginDto, @Response() res: any) {
        return getNewToken(req, res);
    }

    @Post('refresh')
    refreshToken(@Body() req: any, @Response() res: any) {

        return this.LoginService.refreshToken(req, res)
    }

    @Post('pass-recovery')
    sendMail(@Body() passRecovery:PassRecovery, @Response() res) {
        console.log(passRecovery)
        return this.LoginService.sendMail(passRecovery, res);
    }

    @Post('pass-reset')
    resetNewPass(@Body() authLoginDto: AuthLoginDto, @Response() res: any, @Query() param: string) {
        return this.LoginService.resetNewPass(authLoginDto, res, param);
    }
}