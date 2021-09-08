export const filterCarBrand = (eTargetValue, setList) => {
    
    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/car_brand";
    const token = "7560a435a70e3b34f9bc651710e0a3486a64a000";
    let query = eTargetValue;

    let options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({query: query})
    }
    fetch(url, options)
    .then(response => response.json())
    .then(result => {
    let carsCategory = [];
    result.suggestions.forEach(el=>{
        carsCategory.push(el.value); 
    });
    setList([...new Set(carsCategory)])
})
.catch(error => console.log("error", error));
}




