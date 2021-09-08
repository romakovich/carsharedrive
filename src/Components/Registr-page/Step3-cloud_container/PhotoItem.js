import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const PhotoItem = ({ 
    index, 
    removePhotoDoc 
}) => {
    const photosDoc = useSelector(state => state.registration.photosDoc);
    const removePhotoDocFunc = () => { 
        fetch('http://localhost:8000/users/registration/removePhoto', { 
            method: 'POST',  
            headers: { 'Content-Type': 'application/json' },  
            body: JSON.stringify(
                {fileName: photosDoc[index].imgName,
                fileType: "doc"}) })
            .then(()=> {
                removePhotoDoc(photosDoc
                .filter(el => el != photosDoc[index]))
            })
    }
    const [imgLoad, setImgLoad] = useState(true);



    return (
        <div className="cloud__container-photo">
            <div className="cloud__container-photo-frame">
                <img 
                onLoad={ ()=> setImgLoad(false) }
                src={ photosDoc[index].imgUrl }></img>
                {imgLoad ? <div className="cssload-container">
                    <div className="avatar-circle" />
                    <span className="cancel-cross" 
                    onClick={ removePhotoDocFunc }>×</span>
                    <div className="cssload-zenith animate"></div>
                </div> : ""}
            </div>
            <div className="cloud__container-photo-description">
                <p >{ photosDoc[index].imgName }</p>
                <p>{ `${photosDoc[index].imgSize} Mb, ${photosDoc[index].imgExt}` }</p>
                <span className="icon-trash" 
                onClick={ removePhotoDocFunc }>
                </span>
            </div>
        </div>
    )
}