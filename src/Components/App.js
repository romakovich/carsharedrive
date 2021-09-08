import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import About from './About-page/About';
import Registration from '../Containers/Registration/Registration';
import Success from './Registr-page/success/Success';
import Questions from './Questions-page/Questions';
import NotFound from './Global/Page404/Page404';
import Home from './Home-page/Home';
import ResetPassword from '../Containers/ResetPass';
import RentPage from '../Containers/RentPage/RentPage';
import MyCars from '../Containers/MyCars/MyCars';
import NewCar from '../Containers/NewCar/NewCar';
import CarPage from '../Containers/CarPage/CarPage';
import SuccessNewCar from './NewCar/SuccessNewCar';
import Messages from '../Containers/Messages/Messages';
import RegistrationRent from '../Containers/RegistrationRent/RegistrationRent';
import UserPage from '../Containers/UserPage/UserPage';

const App = () => {

  return (
    
      <Switch>
        <Route path="users/:id" />
        <Route path="/messages" component={Messages} />
        <Route path="/user-page" component={UserPage} />
        <Route path="/car-page" component={CarPage} />
        <Route path="/success-new-car" component={SuccessNewCar} />
        <Route path="/new-car" component={NewCar} />
        <Route path="/my-cars" component={MyCars} />
        <Route path="/rent-page" component={RentPage} />
        <Route path="/reset-pass" component={ResetPassword} />
        <Route path="/questions" component={Questions} />
        <Route path="/success" component={Success} />
        <Route path="/Registration" component={Registration} />
        <Route path="/registration-rent" component={RegistrationRent} />
        <Route path="/about" component={About} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
  );
}

export default App;