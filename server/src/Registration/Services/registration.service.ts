import { RegistrationEntity } from '../Entities/registration.entity';
import { Injectable } from '@nestjs/common';
import { RegistrationRepository } from '../Repositories/registration.repository';
import { newUserDto } from '../dto/newUser.dto';
import { createUserFolder } from '../config/createUserFolder';
import { getNewToken } from 'src/config/getNewToken';

const bcrypt = require('bcrypt');
const fs = require('fs'); 
const fsPromises = fs.promises;
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class RegistrationService {
    constructor(private registrationRepository: RegistrationRepository
    ) {}

    async step3removeDoc(req, res) {
        console.log(req)
        fsPromises
        .rm(`uploads/${req.fileType=="doc" ? "docs" : "avatar"}/${req.fileName}`)
        .then(()=>res.status(200).send("Delete"))
        .catch(err=> console.log(err))
    }

    async step3registration(newUserDto: newUserDto, res) {
        newUserDto.password = bcrypt.hashSync(newUserDto.password, bcrypt.genSaltSync(10));
        const userFolder = `users/${newUserDto.mail}`;

        const newUser = new RegistrationEntity();

        newUser.name = newUserDto.name;
        newUser.password = newUserDto.password;
        newUser.birthday = newUserDto.birthday;
        newUser.mail = newUserDto.mail;
        newUser.phone = newUserDto.phone;
        newUser.passport = newUserDto.passport;
        newUser.passportDate = newUserDto.passportDate;
        newUser.passportOrgan = newUserDto.passportOrgan;
        newUser.passportCode = newUserDto.passportCode;
        newUser.driver = newUserDto.driver;
        newUser.driverDate = newUserDto.driverDate;
        newUser.imgAvatar = "avatar.jpg";
        newUser.photosDoc = newUserDto.photosDoc;
        newUser.idRecovery = "";
        newUser.haveNotReadMessage = false;

        return await this.registrationRepository.create(newUser)
        .then(()=> {
            getNewToken(newUserDto, res);
            createUserFolder(userFolder, newUserDto, res)
        })
    }
    
}