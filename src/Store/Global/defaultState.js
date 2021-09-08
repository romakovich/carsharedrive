import { moveDate } from './config/moveDate';
import {setDateToArr} from './config/setDateToArr';

export const defaultState = {
    userBirthday: [2001,2,6],
    userPassportDate: [2001,2,6],
    userDriverDate: [2001,2,6],

    availableCar: setDateToArr(new Date()),
    availableCar2: setDateToArr(moveDate(new Date(), 7)),
    datePickerEnabled: false
}