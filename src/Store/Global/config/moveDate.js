export const moveDate = (date, day) => {
    let newDate = date;
    newDate.setDate(newDate.getDate() + day);
    return newDate;
}