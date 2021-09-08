import { month as monthName} from '../../Global/Datepicker/Month';

export const formatDate = date => {
    let day = new Date(date).getDate(),
    monthNumber = new Date(date).getMonth(),
    month = monthName[monthNumber].toLowerCase(),
    year = new Date(date).getFullYear();
    
    /[йь]/.test(month)
    ? month = month.replaceAll(/[йь]/g, "я") 
    : month = month + "а";

    return `${(day + "").length == 2 ? day : "0" + day} ${month} ${year}`;
}