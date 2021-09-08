export const getName = () => {
    fetch(`http://localhost:8000/users?mail=${localStorage.getItem("userMail")}`)
    .then(data=> data.json()
    .then(json=>{
        const formatName = json[0].name.slice(0, json[0].name.indexOf(" ")) 
        + " " + json[0].name.slice(json[0].name.lastIndexOf(" "))[1] + ".";
        localStorage.setItem("userName", formatName);
    }))
}