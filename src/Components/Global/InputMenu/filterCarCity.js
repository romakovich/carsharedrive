import { cityRegion } from "../../NewCar/city";

export const filterCarCity = (eTargetValue, setData) => {
    let regExp = new RegExp('^' + eTargetValue, "i");
    let findCity = cityRegion.map(el => el.city);
    findCity = findCity.filter(el => regExp.test(el));
    if(eTargetValue == "") findCity=[];
    setData(findCity)
}