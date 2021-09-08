export const getDaysBetweenDates = (startDate, endDate) => {
    return Math.floor((new Date (endDate).getTime() 
    -  new Date (startDate).getTime())/(1000*60*60*24));
}