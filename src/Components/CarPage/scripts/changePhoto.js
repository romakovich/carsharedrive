export const changePhoto = (arrow, carPage, setPhotoNumber, photoNumber) => {
    let photo = photoNumber;
    if(arrow == "left") {
        if(photo == 1) {
            setPhotoNumber(carPage[0].photosCars.length);
        } else {
            photo -= 1;
            setPhotoNumber(photo);
        }
    } else {
        if(photo == carPage[0].photosCars.length) {
            setPhotoNumber(1);
        } else {
            photo +=1;
            setPhotoNumber(photo);
        }
    }
}