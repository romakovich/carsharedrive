import React, { useEffect, useState } from 'react';

export const PhotoAvatar = ({
    imgAvatar,
    buttonLoad, 
    setImgAvatarUrl,
    imgAvatarFile,
    setImgAvatarFile,
    uploadAvatar 
}) => {

    const [imgLoad, setImgLoad] = useState(true);
    const removePhotoAvatarFunc = () => { 
        fetch('http://localhost:8000/users/registration/removePhoto', { 
            method: 'POST',  
            headers: { 'Content-Type': 'application/json' },  
            body: JSON.stringify(
                {fileName: imgAvatar.img,
                fileType: "avatar"}) })
                .then(()=> setImgAvatarUrl(''))
        ;
    }
    const onFileChange = e => { 
        setImgAvatarFile(e.target.files[0]); 
    };

    useEffect(() => {
        if(imgAvatarFile != null) {
            uploadAvatar();
            setImgAvatarFile(null);
            document.querySelector(".input-avatar").value= ""
        } 
        if(imgAvatar) setImgLoad(false)
    })

    return (
        <div className="registration__container-photo" onLoad={()=>{ setImgLoad(false) }}
        // style={{background: imgAvatar ? "" : "$camera-color"}}
        style={imgAvatar ? {backgroundImage: `url(${imgAvatar.url})`} : {background: "#F7F7F8"}}
        >
            <div className="registration__container-photo-frame">

                {imgLoad && imgAvatar
                ? <div className="cssload-container" 
                style={{pointerEvents: buttonLoad ? "none" : "all"}}>
                <div className="avatar-circle">
                    <span className="cancel-cross">×</span>
                </div>
                
                <div className="cssload-zenith animate"></div> 
                </div> : ""}
                {!imgAvatar 
                ? <span className="icon-camera" 
                onClick={()=> { document.querySelector(".input-avatar").click(); } }>
                </span> : ""}
                {imgAvatar 
                ? <div className="avatar-circle"
                onClick={ removePhotoAvatarFunc }>
                    <span className="icon-trash" />
                </div> : ""}


            </div>
            <input type="file" className="input-avatar fake-input" onChange={onFileChange} />

            </div>
    )
}
