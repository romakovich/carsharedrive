import { createAction } from "@reduxjs/toolkit";

export const setUserBirthday = createAction('SET_USER_DAY');
export const setUserPassportDate = createAction('SET_USER_PASSPORT_DATE');
export const setUserDriverDate = createAction('SET_USER_DRIVER_DATE');

export const setDatePickerEnabled = createAction('SET_DATE_PICKER_ENABLED');

export const setAvailableCar = createAction('SET_AVAILABLE_CAR');
export const setAvailableCar2 = createAction('SET_AVAILABLE_CAR2');