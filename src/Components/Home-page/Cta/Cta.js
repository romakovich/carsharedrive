import React from 'react';
import car5 from '../../../Assets/img/home-page/car5.svg';
import { Link } from 'react-router-dom';

const Cta = () => {


return (
    <section className="call__to__action">
        <div className="cta__container">
            <img src={ car5 } alt="Child and mini-car" />
            <h2>Попробуйте аренду на себе</h2>
            <Link to="Registration" rel="nofollow">
                <button >Зарегистрироваться</button>
            </Link>
        </div>
    </section>  
)
}
export default Cta;