import React, { useEffect, useState } from 'react';
import cloud from '../../../Assets/img/Registration/upload-cloud.svg';
import OnSubmit from '../../NewCar/OnSubmit';
import UploaderCloudItem from './UploaderCloudItem';

const UploaderCloud = ({
    photos, setPhotos
}) => {

    const addPreviewPhoto = (photos, setPhotos, eTarget) => {
        let photosArray = [...photos];
        photosArray = photosArray.concat(Object.values(eTarget));
        setPhotos(photosArray); 
    }

    const onFileChange = e => { 
        addPreviewPhoto(photos, setPhotos, e.target.files);
    };

    const [drag, setDrag] = useState(true);

    const dragStartHandler = e => { 
        e.preventDefault();
        setDrag(false)
    }

    const dragLeaveHandler = e => { 
        e.preventDefault();
        setDrag(true);
    }

    const onDropHandler = e => { 
        e.preventDefault();
        addPreviewPhoto(photos, setPhotos, e.dataTransfer.files);
        setDrag(true);
    }

    return (<>
        <div className="cloud__container">
            {Object.values(photos).length ? photos.map((photo, i) => {
            return <UploaderCloudItem photo={photo} index={i} key={i} 
            setPhotos={setPhotos} photos={photos}
            />
            }) : ""}

            <div className={!photos.length 
            ? (drag ? "cloud__container-button-block default" 
            : "cloud__container-button-block default hover")
            : (drag ? "cloud__container-button-block"
            : "cloud__container-button-block hover")}
            onDragStart={e => dragStartHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragStartHandler(e)}
            onDrop={e => onDropHandler(e)} >
                <img className={!drag ? "cloud-icon none-pointer-events" : "cloud-icon"} src={ cloud } 
                onClick={()=> { document.querySelector(".input-doc").click(); }}/>
                {drag 
                ? <p className="cloud-icon-text">Перетащите или <span style={{color: '#61A199'}}>выберите файл</span></p> 
                : <p className="cloud-icon-text">Отпустите файлы, чтобы <span style={{color: '#61A199'}}>загрузить</span></p>}
                <p className="cloud-icon-text">JPG или PNG, не более 30 мб</p>

         <div className="mobil-container">
             <div className="mobil-container-circle"
             onClick={()=> { document.querySelector(".input-doc").click(); }}>+</div>
             <span>Загрузить файл
                 <p>JPG или PNG, не более 30 мб</p>
            </span>
         </div>
                <input type="file" multiple className="input-doc fake-input" 
                onChange={onFileChange}/>
            </div>
            <OnSubmit />
        </div>
        
    </>
    )
}

export default UploaderCloud;