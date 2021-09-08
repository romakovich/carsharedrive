import React from 'react';
import DescriptionBlock from './DescriptionBlock';
import car2 from '../../../Assets/img/home-page/car2.svg';
import car3 from '../../../Assets/img/home-page/car3.svg';
import car4 from '../../../Assets/img/home-page/car4.svg';

const Description = () => {

    return (
    <section className="main-description">
        <div className="main-description__container">
            <DescriptionBlock h="Аренда напрямую от владельцев" img={ car2 } alt = "car1" 
            span="Вы получите автомобиль от его собственника, а мы проверим юридическую чистоту и техническую исправность." />
            <DescriptionBlock h="Автомобили на любой вкус" img={ car3 } alt = "car2" 
            span="Вы всегда можете подобрать автомобиль любого класса от бюджетных моделей до премиум-класса и спорткаров." />
            <DescriptionBlock h="Гарантия честной аренды" img={ car4 } alt = "car3" 
            span="Общение и оплата происходит через наш сервис, что предотвращает вас от обмана." />
        </div>
    </section>
    )
}

export default Description;

