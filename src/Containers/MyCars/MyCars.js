import { connect } from 'react-redux';

import { MyCars } from '../../Components/MyCars/MyCars';

import { setRegButtonActive } from '../../Store/MyCars/actions';
import { setCarsList, sortCarsList } from '../../Store/RentPage/actions';

const mapStateToProps = state => {
    const { MyCars } = state;
    return  MyCars;
}

const mapDispatchToProps = dispatch => ({
    setRegButtonActive: text => dispatch(setRegButtonActive(text)),
    sortCarsList: (city, category, date) => dispatch(sortCarsList(city, category, date)),
    setCarsList: text => dispatch(setCarsList(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCars);
