import { Schema } from 'mongoose';
import { Document } from 'mongoose';
export type RegistrationDocument = typeof registrationSchema & Document;

export const registrationSchema =  new Schema({
    _id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        maxlength: 10,
        minlength: 10,
        required: true
    },
    mail: {
        type: String,
        match: /\w+@\w+\.\w+/,
        required: true
    },
    phone: {
        type: Number,
        maxlength: 15,
    },
    passport: {
        type: Number,
        required: true,
        maxlength: 10,
        minlength: 10,
    },
    passportDate: {
        type: String,
        required: true,
        maxlength: 10
    },
    passportOrgan: {
        type: String,
        required: true
    },
    passportCode: {
        type: Number,
        required: true
    },
    driver: {
        type: Number,
        required: true
    },
    driverDate: {
        type: String,
        required: true,
        maxlength: 10,
        minlength: 10
    },
    idRecovery: {
        type: String
    },
    imgAvatar: {
        type: String,
    },
    photosDoc: {
        type: Array
    }
})