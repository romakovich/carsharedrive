import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegistrationEntity } from 'src/Registration/entities/registration.entity';
import { getMongoManager } from 'typeorm';
import { RegistrationDocument } from '../../Schemas/registration.schema';
const jwt = require('jsonwebtoken');
const constants = require('../../config/constants');

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const sendMail = require("../config/sendMail");
//const getNewToken = require("../../config/getNewToken")
import {getNewToken} from '../../config/getNewToken';

@Injectable()
export class LoginService {
    constructor ( @InjectModel('Users') private registrationModel: Model<RegistrationDocument> ) {}

    async authorize(req, res) { 
        return getNewToken(req, res); 
    }

    async refreshToken(req, res) {
        jwt.verify(req.refreshToken, constants.REFRESH_TOKEN_SECRET, {}, (err) => {
            if(err) { return res.sendStatus(405); }
            else { return getNewToken(req, res) }
        })
    }

    async sendMail(req, res) {
        const manager = getMongoManager();
        const findMail = await manager.findOne( RegistrationEntity, {mail: req.mail} )
        if(!findMail) return res.status(400).send();
        const uniqID = uuidv4();
        await sendMail(findMail.name, `http://localhost:8080/reset-pass?id=${uniqID}`, req.mail)
        .then(async ()=> { 
            return await manager.update( RegistrationEntity, findMail, {idRecovery: uniqID} )
            .then(()=>res.status(200).send())
        } ) 
    }

    async resetNewPass(req, res, query) {
        
        const manager = getMongoManager();
        const findMail = await manager.findOne( RegistrationEntity, {mail: req.mail} );

        if(!findMail.idRecovery || findMail.idRecovery!= query.id ) return res.status(401).send("От вас запроса не поступало");
        
        bcrypt.compare(req.password, findMail.password, async(err, result) => {
            if(result) return res.status(401).send("Новый пароль должен отличаться от старого");
            const newPass = bcrypt.hashSync(req.password, bcrypt.genSaltSync(10))
            return await manager.update( RegistrationEntity, findMail, {password: newPass, idRecovery: ""} )
            .then(()=>{
                getNewToken(req, res)
            })
            .catch(err => console.log(err))
        }
        )
    }
}