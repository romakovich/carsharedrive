const jwt = require('jsonwebtoken');
const constants = require('./constants.js')

import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class authVerifyMiddleware implements NestMiddleware {
    async use(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];
    console.log(`Token - ${token}`);

    if(!token) { return res.sendStatus(401) }
    jwt.verify(token, constants.ACCESS_TOKEN_SECRET, {}, (err, payload) => {
        if(err) { return res.sendStatus(403); }
        req.payload = payload;
        next();
    })
    }
}