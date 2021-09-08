import { connect } from 'react-redux';

import { RentPage } from '../../Components/RentPage/RentPage';

import { setCarsCategory, setCarsCity, setCarsList, setCarsListFilter, setFirstCarLocation, sortCarsList } from '../../Store/RentPage/actions';

const mapStateToProps = state => {
    const { RentPage } = state;
    return  RentPage;
}

const mapDispatchToProps = dispatch => ({
    setCarsList: text => dispatch(setCarsList(text)),
    setCarsCategory: text => dispatch(setCarsCategory(text)),
    setCarsCity: text => dispatch(setCarsCity(text)),

    sortCarsList: (city, category, date) => dispatch(sortCarsList(city, category, date)),

    setFirstCarLocation: text => dispatch(setFirstCarLocation(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(RentPage);
