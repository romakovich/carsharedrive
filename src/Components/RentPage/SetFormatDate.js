export const setFormatDate = (date, registration) => {
    let formatDate = [...date].reverse();
    if((formatDate[0] + "").length == 1) formatDate[0] = "0" + formatDate[0];
    if((formatDate[1] + "").length == 1) formatDate[1] = "0" + formatDate[1];
    if(!registration) formatDate[2] = (formatDate[2] + "").slice(2);
    return formatDate.join(".");
}