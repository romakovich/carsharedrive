import React from 'react';
import car1 from '../../../Assets/img/home-page/car1.svg';
import car1Mobile from '../../../Assets/img/home-page/car1-mobile.svg';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


const Heading = () => {

const registrationWithId = `Registration?${uuidv4()}`;
const testNext = () => {
    fetch('http://localhost:8000/user-page/ddd')
}

return (
    <section className="heading">
            <div className="heading__container">
                <div className="heading__container__registration">
                    <h1 onClick={testNext}>Каршеринг в любой точке России</h1>
                    <span>Будьте всегда за рулём во время путешествий и командировок.</span>
                    <Link to={ registrationWithId } className="heading__container__registration-link" rel="nofollow">
                        <button>Зарегистрироваться</button>
                    </Link>
                </div>
                <img src={ car1 } alt="Woman near a car" />
                <img className="is-mobile" src={ car1Mobile } alt="Woman near a car" />
            </div>
    </section>
)
}
export default Heading;