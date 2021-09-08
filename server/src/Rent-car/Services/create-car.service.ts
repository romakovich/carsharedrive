import { Injectable } from "@nestjs/common";
import { RentCarRepository } from "../repositories/rent-car.repository";
import { writeFile, ensureDir } from 'fs-extra';
import { CreateRentCarDto } from "../dto/create-rent-car.dto";
const mongoose = require('mongoose');
import { RentCar as RentCarEntity } from '../entities/rent-car.entity';
import { createUniqName } from "../config/createUniqName";
import { RegistrationEntity } from "src/Registration/entities/registration.entity";
import { getMongoManager } from "typeorm";

@Injectable()
export class CreateCarService {
  constructor(private rentCarRepository: RentCarRepository
    
    ) {}

  async create(createRentCarDto: CreateRentCarDto, img) {
    const id = mongoose.Types.ObjectId();
    const uploadFolderCar = `users/${createRentCarDto.owner}/${id}/imgCar/`;
    const uploadForlderDocs = `users/${createRentCarDto.owner}/${id}/imgDocs/`
    
    await ensureDir(uploadFolderCar);
    await ensureDir(uploadForlderDocs);

    const carPhotos = [];
    const carDocs = [];

    const newRentCar = new RentCarEntity();
    for(const file of img) {
      if(file.fieldname == "imgCar") {
        const newName = createUniqName(file);
        await writeFile(`${uploadFolderCar}/${newName}`, file.buffer);
        carPhotos.push(`http://localhost:8000/img-car/${createRentCarDto.owner}/${id}/imgCar/${newName}`)
      } else if(file.fieldname == "imgDoc") {
        const newName = createUniqName(file);
        await writeFile(`${uploadForlderDocs}/${newName}`, file.buffer);
        carDocs.push(`http://localhost:8000/img-car/${createRentCarDto.owner}/${id}/imgDocs/${newName}`)
      }
    }

    const randomGeo = 
    [
      Number(createRentCarDto.geo.split(",")[0]) + Number((Math.random()*0.01).toFixed(5)),
      Number(createRentCarDto.geo.split(",")[1]) + Number((Math.random()*0.01).toFixed(5))
    ]

    const manager = getMongoManager();

    newRentCar._id = id
    newRentCar.brand = createRentCarDto.brand;
    newRentCar.model = createRentCarDto.model;
    newRentCar.year = createRentCarDto.year;
    newRentCar.city = createRentCarDto.city;
    newRentCar.street = createRentCarDto.street;
    newRentCar.geo = randomGeo;
    newRentCar.category = createRentCarDto.category;
    newRentCar.license = createRentCarDto.license;
    newRentCar.VIN = createRentCarDto.VIN;
    newRentCar.color = createRentCarDto.color;
    newRentCar.engine = createRentCarDto.engine;
    newRentCar.volume = createRentCarDto.volume;
    newRentCar.power = createRentCarDto.power;
    newRentCar.transmission = createRentCarDto.transmission;
    newRentCar.mileage = createRentCarDto.mileage;
    newRentCar.PTS = createRentCarDto.PTS;
    newRentCar.STS = createRentCarDto.STS;
    newRentCar.price = Number(createRentCarDto.price);
    newRentCar.price3 = Number(createRentCarDto.price3);
    newRentCar.price5 = Number(createRentCarDto.price5);
    newRentCar.OSAGO = createRentCarDto.OSAGO;
    newRentCar.CASCO = createRentCarDto.CASCO;
    newRentCar.driveUnit = createRentCarDto.driveUnit + " привод";
    newRentCar.options = createRentCarDto.options.split(",");
    newRentCar.photosCars = carPhotos;
    newRentCar.photosCarsDocs = carDocs;
    newRentCar.rating = 0;
    newRentCar.ratingCount = 0;
    newRentCar.review = "";

    newRentCar.owner = new RegistrationEntity();
    newRentCar.owner.mail = createRentCarDto.owner;
    const findUser = await manager.findOne(RegistrationEntity, {mail: createRentCarDto.owner})
    newRentCar.owner.imgAvatar = `http://localhost:8000/img-car/${createRentCarDto.owner}/avatar/${findUser.imgAvatar}`;
    newRentCar.owner.name = findUser.name;
    return await this.rentCarRepository.create(newRentCar)
  }
}