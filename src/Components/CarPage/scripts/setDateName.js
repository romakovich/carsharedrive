import { month } from '../../Global/Datepicker/Month';

export const setDateName = (date, areMonthsSame) => {
    const monthDefault = new Date(date).getMonth();


    return `${month[monthDefault]} ${date[0]}`;
    return areMonthsSame 
    ? `${month[monthDefault]} ${date[0]}`
    : `${month[monthDefault + 1]} ${date[0]}`
}