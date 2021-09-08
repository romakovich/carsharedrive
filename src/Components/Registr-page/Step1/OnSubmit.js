import React, { useEffect } from 'react';

export const OnSubmit = ({  buttonLoad, photosDoc, 
    isStep1, isStep2, isStep3, imgAvatar, 
    setStep3, setStep2, setFinishReg,
    regButtonActive1, regButtonActive2, regButtonActive3, 
    setRegButtonActive2, setRegButtonActive3,  }) => {
    
    useEffect(() => {
        imgAvatar ? setRegButtonActive2(true) : setRegButtonActive2(false);
        photosDoc.length ? setRegButtonActive3(true) : setRegButtonActive3(false) 
    } )
    return (

    <div className="submit-block">
        <div className="submit-block-rect"></div>
        <button type="submit" 
        className={ (regButtonActive1 && isStep1) 
            || (regButtonActive2 && isStep2)
            || (regButtonActive3 && isStep3)
            ? "" : "is-disable" }
        onClick={()=>{
            isStep2 && (setStep3(true), setStep2(false));
            isStep3 && setFinishReg()
            }}> 
        
                {buttonLoad ? " " : "Продолжить"}
        </button>
        <div className="cssload-container">
            <div className={buttonLoad 
                ? "cssload-zenith animate" : "cssload-zenith"}></div>
        </div>
    </div>
        
    )
}
