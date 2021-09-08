import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { getMongoManager } from 'typeorm';
import { RentCar } from '../entities/rent-car.entity';

@Injectable()
export class isLicenseInDb implements NestMiddleware {

  async use(req: Request, res: Response, next: NextFunction) {
    const { license } = req.body;

    console.log(req.body);

    const manager = getMongoManager();
    const findCar = await manager.findOne( RentCar, { license } )
    if(findCar) return res.status(401).send("Машина с такой лицензией уже зарегистрирована");
    next();
  }
}