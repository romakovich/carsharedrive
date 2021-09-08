import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { getMongoManager } from 'typeorm';
import { RegistrationEntity } from '../entities/registration.entity';

@Injectable()
export class isMailInDb implements NestMiddleware {

  async use(req: Request, res: Response, next: NextFunction) {
    const { mail } = req.body;

    const manager = getMongoManager();
    const findMail = await manager.findOne( RegistrationEntity, { mail } )
    if(findMail) return res.status(401).send("Такой почтовый ящик уже зарегистрирован");
    next();
  }
}