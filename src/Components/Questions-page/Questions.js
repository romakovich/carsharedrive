import React, { Fragment, useEffect } from 'react';
import womanImg from '../../Assets/img/Question-woman.svg';
import Header from '../../Containers/Header/Header';
import Footer from '../Global/Footer/Footer';
import CollapsibleBlockAll from './CollapsibleBlockAll';

const Questions = () => {
  useEffect(() => {
    document.title="SkillDrive. Частые вопросы";
  });

  return (
  <Fragment>
    <Header />
    <main>
          <div className="questions__container">
              <img src={womanImg} alt="Woman with questions" />
              <h1>Частые вопросы</h1>
              <span>Отвечаем на вопросы, которые у вас могут возникнуть.</span>
              <CollapsibleBlockAll />
          </div>                
      </main>
    <Footer />
  </Fragment>
  )
}

export default Questions;