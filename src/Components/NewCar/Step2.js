import React from 'react';
import OnSubmit from './OnSubmit';
import Step2Item from './Step2Item';
import { step2Options } from './step2Options';
import step2Service from './step2Service.json';

const Step2 = ({
    
}) => {

    return (<>
        <form>
        <div className="form-container">
            <fieldset>
                <legend>Опции автомобиля</legend>
                {step2Options.map((el, i) => {
                    return <Step2Item key={i} index={i} text={el}
                    imgClass={`icon-newCar${i} step2-item__container-img`}
                    />
                })}
            </fieldset>
            <fieldset>
                <legend>Дополнительные услуги</legend>
                {step2Service.Services.map((el, i) => {
                    return <Step2Item key={i} index={i+step2Options.length} service
                    text={el.service} description={el.description} 
                    />
                })}
            </fieldset>
        </div>
        <OnSubmit />
        </form>

    </>)
}

export default Step2;