import { combineReducers } from "redux";

import { registration } from "./Registration/reducers";
import { login } from "./login/reducers";
import { global } from "./global/reducers";
import { RentPage } from "./RentPage/reducers";
import { MyCars } from "./MyCars/reducers";
import { NewCar } from "./NewCar/reducers";
import { CarPage } from "./CarPage/reducers";
import { Messages } from "./Messages/reducers";
import { RegistrationRent } from "./RegistrationRent/reducers";
import { UserPage } from "./UserPage/reducers";

export default combineReducers({
  registration,
  login,
  RentPage,
  global,
  MyCars,
  NewCar,
  CarPage,
  Messages,
  RegistrationRent,
  UserPage
})