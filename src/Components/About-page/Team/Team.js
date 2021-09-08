import React from 'react';
import TeamName from './TeamName';
import imgTeam1 from '../../../Assets/img/About-page/Team_1.jpg';
import imgTeam2 from '../../../Assets/img/About-page/Team_2.jpg';
import imgTeam3 from '../../../Assets/img/About-page/Team_3.jpg';
import imgTeam4 from '../../../Assets/img/About-page/Team_4.jpg';
import imgTeam5 from '../../../Assets/img/About-page/Team_5.jpg';
import imgTeam6 from '../../../Assets/img/About-page/Team_6.jpg';

const Team = () => (
    <section className="teams">
        <div className="teams__container">
            <h2>Команда</h2>
            <div className="teams__item-container">
                <TeamName name="Иван Иванов" profession="CEO" imgName={imgTeam1} />
                <TeamName name="Алексей Смирнов" profession="Frontend-разработчик" imgName={imgTeam2} />
                <TeamName name="Денис Ярцев" profession="Backend-разработчик" imgName={imgTeam3} />
                <TeamName name="Николай Морозов" profession="Дизайнер" imgName={imgTeam4} />
                <TeamName name="Ирина Деева" profession="Копирайтер" imgName={imgTeam5} />
                <TeamName name="Мария Стрелкова" profession="SMM" imgName={imgTeam6} />
            </div>
        </div>
    </section>
)

export default Team;