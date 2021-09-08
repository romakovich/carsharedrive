import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { getMongoManager } from 'typeorm';
import { TripEntity } from '../entities/trip.entity';

@Injectable()
export class isDateAvailable implements NestMiddleware {

  async use(req: Request, res: Response, next: NextFunction) {
    const { license } = req.body;

    const startRent = new Date(req.body.startRent).getTime(),
      endRent = new Date(req.body.endRent).getTime()

    const manager = getMongoManager();

    const filterTrip = await manager.find(TripEntity, {where: {
      license,
      $or: [{
        startRent: {$lte: Number(endRent), $gte: Number(startRent)},
      },
      {
        startRent: {$lte: Number(startRent)},
        endRent: {$gte: Number(endRent)}
      },
      {
        endRent: {$lte: Number(endRent), $gte: Number(startRent)},
      }
  ]
      }
    })

    if(filterTrip.length) return res.status(401).send("Такая дата уже занята");
    next();
  }
}