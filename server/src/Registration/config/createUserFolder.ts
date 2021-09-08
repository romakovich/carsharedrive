const fs = require('fs'); 
const fsPromises = fs.promises;

export const createUserFolder = (userFolder, newUserDto, res) => {
    try {
        fsPromises.mkdir(userFolder)
        .then(()=> {
            fsPromises.mkdir(`${userFolder}/avatar`)
            .then(()=> {
                const ext = newUserDto.imgAvatar.slice(newUserDto.imgAvatar.indexOf("."))
                fsPromises.rename(`uploads/avatar/${newUserDto.imgAvatar}`,`${userFolder}/avatar/avatar${ext}`)
                .then(()=> {
                    fsPromises.mkdir(`${userFolder}/docs`)
                    let photosDocArray = newUserDto.photosDoc;
                    if(typeof photosDocArray == "string") {
                        photosDocArray = photosDocArray.replace(/[\[\]]/g,"").split(",")
                    }
                    
                    photosDocArray.forEach((el,i) => {
                        fsPromises.rename(`uploads/docs/${el}`,`${userFolder}/docs/${el}`)
                        .catch(err => console.log(err))
                    })
                    fsPromises.mkdir(`${userFolder}/carPhotos`);
                })                 
            })
        })
    } catch (err) {
        console.log(err);
    }
}