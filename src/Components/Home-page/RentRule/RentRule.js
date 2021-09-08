import React from 'react';
import CirclesBlock from '../CirclesBlock/CirclesBlock';

const RentRule = () => (
    <section className="rent-rule">
        <div className="rent-rule__container">
            <h2>Как арендовать автомобиль</h2>
            <div className="circles__container">
                <CirclesBlock span="Выберите автомобиль" isIcon="1" needLine/>
                <CirclesBlock span="Забронируйте дату и время" isIcon="2" needLine/>
                <CirclesBlock span="Наша комиссия всего 3%" isIcon="3"/>
            </div>
        </div>
    </section>
)

export default RentRule;