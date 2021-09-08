import React, { Fragment } from 'react';
import dogImg from '../../../Assets/img/About-page/AboutUs.svg'

const DescrContacts = () => (
    <Fragment>
        <section className="description">
            <div className="description__container">
                <img src={dogImg} alt="4 программиста и собака"></img>
                <h1 className="description__heading">О нас</h1>
                <span className="description__container-text">
                    Это учебный проект, созданный с целью получения боевого опыта в разработке настоящего живого веб-приложения. 
                    Этот сервис имитирует работу каршеринга, в котором можно не только арендовать автомобили, но и сдавать их в аренду.
                </span>
            </div>
        </section>
        <section className="contacts">
            <div className="contacts__container">
                <h2>Контакты</h2>
                <div className="address__container">
                    <div className="address__container-heading">
                        <span>Электронная почта</span><br />
                        <span>drive@skillfactory.com</span>
                    </div>
                    <hr className="is-desktop" />
                    <div className="address__container-heading">
                        <span>Телефон</span><br />
                        <span>+7 912 123-45-67</span>
                    </div>
                </div>
            </div>
        </section>
    </Fragment>
)

export default DescrContacts;