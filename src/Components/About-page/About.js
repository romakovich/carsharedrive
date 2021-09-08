import React, { Fragment, useEffect } from 'react';
import Header from '../../Containers/Header/Header';
import Footer from '../Global/Footer/Footer';
import DescrContacts from './DescrContacts/DescrContacts';
import Team from './Team/Team';

const About = () => {
  useEffect(() => {
    document.title="SkillDrive. О нас";
  });

  return (
  <Fragment>
    <Header />
    <DescrContacts />
    <Team />
    <Footer />
  </Fragment>
  )
}

export default About;