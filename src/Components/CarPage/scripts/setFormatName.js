export const setFormatName = (name) => {
    return name.slice(0, name.indexOf(" "))
    + " "
    + name.slice(name.lastIndexOf(" "))[1] 
    + "."
}