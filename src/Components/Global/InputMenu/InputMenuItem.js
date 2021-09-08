import React, { useEffect, useState } from 'react';
import { cityRegion } from '../../NewCar/city';

const InputMenuItem = ({ city, onMouseDown, selectedCity, category, index, menuCity }) => {
    
    return (
        <div className="input__menu__container-list-item"
        onMouseDown={onMouseDown}>
            {city}
            {selectedCity == city && <div className="icon-check-mark">🗸</div>}
            {category && 
            <div className="input__menu__container-list-item-description">
                {city == "Легковая" ? "Категория B, BE" 
                : city == "Грузовая" ? "Категория C, CE" 
                : city == "Мотоциклы" ? "Категория A" : ""

                }
            </div>}
            {menuCity && 
                <div className="input__menu__container-list-item-description">
                    {cityRegion.filter(el => el.city.trim() == city.trim())[0] && cityRegion.filter(el => el.city.trim() == city.trim())[0].region}
                </div>}
        </div>
    )
}

export default InputMenuItem;