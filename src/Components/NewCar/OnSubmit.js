import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCar, setPhotosCarsDocs, setStep, setStep1Forms } from '../../Store/NewCar/actions';

const OnSubmit = ({ 
    step1Values, step1OK,
 }) => {
    const dispatch = useDispatch();
    const isStep = useSelector(state => state.NewCar.isStep);
    const buttonLoad = useSelector(state => state.NewCar.buttonLoad);
    const photosCars = useSelector(state => state.NewCar.photosCars);
    const photosCarsDocs = useSelector(state => state.NewCar.photosCarsDocs);

    return (
        <div className="submit-block">
            <div className="submit-block-rect"></div>
            <div className="button-wrapper">
            <button type="submit" 
            className={
                (isStep == 1 && step1OK) 
                || (isStep == 2)
                || (isStep == 3 && photosCars.length)
                || (isStep == 4 && photosCarsDocs.length)
                ? "" : "is-disable"}
            onClick={()=>{
            
            isStep == 1 ? dispatch(setStep1Forms(step1Values)) : "";
            isStep == 2 ? dispatch(setStep(3)) : "";
            isStep == 3 ? dispatch(setStep(4)) : "";
            isStep == 4 ? dispatch(createCar()) : "";
            }}
            > 
            {buttonLoad ? " " : "Продолжить"}
            </button>
            <div className="cssload-container">
                <div className={buttonLoad 
                    ? "cssload-zenith animate" : "cssload-zenith"}></div>
            </div>
            </div>
        </div>
    )
}

export default OnSubmit;