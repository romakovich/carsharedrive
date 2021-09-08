import React from 'react';
import CirclesBlock from '../CirclesBlock/CirclesBlock';

const Profit = () => {

    return (
    <section className="profit">
        <div className="profit__container">
            <h2>У вас есть автомобиль?</h2>
            <span className="profit__container-text">Чтобы он не простаивал — сдавайте его в аренду и зарабатывайте.</span>
            <div className="circles__container">

                <CirclesBlock span="Вы сами указываете цену" isIcon="icon-profit4" needLine/>
                <CirclesBlock span="Мы страхуем автомобили" isIcon="icon-profit3" needLine/>
                <CirclesBlock span="Наша комиссия всего 3%" isIcon="icon-profit1" needLine/>
                <CirclesBlock span="Выплаты каждую неделю" isIcon="icon-profit2"/>

            </div>
        </div>
    </section>
    )
}

export default Profit;