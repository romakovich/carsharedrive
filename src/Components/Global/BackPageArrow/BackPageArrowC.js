import React from 'react';
import { Link } from 'react-router-dom';

const BackPageArrowC = ({ isStep, setStep, url }) => {
    return (<>

        <div className="back-page-arrow" 
            
            onClick={()=> {
                isStep == 2 ? setStep(1)
                : isStep == 3 ? setStep(2) 
                : isStep == 4 ? setStep(3) : ""}}>
            <span className="icon-back"></span>
            <span>Назад</span>
        </div>
    </>)
}

export default BackPageArrowC;