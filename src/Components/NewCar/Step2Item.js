import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStep2Forms } from '../../Store/NewCar/actions';


const Step2Item = ({
    index,
    text,
    description,
    imgClass,
    service,
}) => {
    const dispatch = useDispatch();
    const step2Forms = useSelector(state => state.NewCar.step2Forms);

    const [active, setActive] = useState(false);
    const changeCheckpoint = () => {
        active ? setActive(false) : setActive(true);
        let newData = [...step2Forms];
        !active ? newData[index] = true : newData[index] = false;
        
        dispatch(setStep2Forms(newData));
    }

    return (
        <div className={service ? "step2-item__container service" : "step2-item__container"}>
            <div className={imgClass}></div>
            <div className={service ? "step2-item__container-text service" : "step2-item__container-text"}>
                {text}{service && <span><br />{description}</span>}
            </div>
            {service ? 
            <div className={step2Forms[index] ? "step2-item__container-price active" : "step2-item__container-price"}>
                1 000 ₽
            </div> 
            : ""}
            <div 
            className={step2Forms[index] 
                ? (service ? "step2-item__container-checkpoint active service" : "step2-item__container-checkpoint active")
                : (service ? "step2-item__container-checkpoint service" : "step2-item__container-checkpoint")}
            style={{marginLeft: service ? "0px" : "auto"}}
            onClick={changeCheckpoint}>
                <div 
                className={step2Forms[index] 
                    ? "step2-item__container-checkpoint-circle active" :
                "step2-item__container-checkpoint-circle"}
                >
                </div>
            </div>
        </div>
    )
}

export default Step2Item;