import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { getMongoManager } from 'typeorm';
import { RegistrationEntity } from 'src/Registration/entities/registration.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class checkPasswordMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const manager = getMongoManager();

    const findMail = await manager.findOne( RegistrationEntity, {mail: req.body.mail} )
    bcrypt.compare(req.body.password, findMail.password, function(err, result) {
      if(err) {
        console.log(err);
        return;
      }
      if(!result) { return res.status(401).send("Неправильный пароль") }
      next(); 
    });
  }
}