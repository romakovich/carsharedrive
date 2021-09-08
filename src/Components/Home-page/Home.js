import React, { Fragment, useEffect } from 'react';
import Header from '../../Containers/Header/Header';
import Footer from '../Global/Footer/Footer';
import Heading from './heading/Heading';
import Description from './Description/Description';
import RentRule from './RentRule/RentRule';
import Profit from './Profit/Profit';
import Review from './Review/Review';
import Cta from './Cta/Cta';



const Home = () => {
  useEffect(() => {
    document.title="SkillDrive. Главная";
  })

  return (
    <Fragment>
        <Header isMain/>
        
        <Heading />
        <Description />
        <RentRule />
        <Profit />
        <Review />
        <Cta />
        <Footer />
  </Fragment>
  )
};

export default Home;