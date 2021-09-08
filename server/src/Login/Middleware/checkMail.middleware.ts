import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { getMongoManager } from 'typeorm';
import { RegistrationEntity } from 'src/Registration/entities/registration.entity';

@Injectable()
export class checkMailMiddleware implements NestMiddleware {

    async use(req: Request, res: Response, next: NextFunction) {
      const manager = getMongoManager();
      const findMail = await manager.findOne( RegistrationEntity, {mail: req.body.mail} )
      if(!findMail) return res.status(400).send();
      next();
    }
}