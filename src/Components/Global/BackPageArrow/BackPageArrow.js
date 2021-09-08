import React from 'react';

const BackPageArrow = (
    {isStep1, isStep2, isStep3,
    setStep1, setStep2, setStep3
    }) => {
    return (
        !isStep1 
        ? <div className="back-page-arrow" 
            onClick={()=> isStep2 
                ? (setStep1(true), setStep4(false), setStep2(false))
                : isStep3 ? (setStep2(true), setStep3(false)) : ""}>
            <span className="icon-back"></span>
            <span>Назад</span>
        </div> : ""
    )
}

export default BackPageArrow;