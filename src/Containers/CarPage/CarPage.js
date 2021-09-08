import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { CarPage } from '../../Components/CarPage/CarPage';
import { setCarPage, createTrip } from '../../Store/CarPage/actions';

const mapStateToProps = state => {
    const { CarPage } = state;
    return  CarPage;
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        setCarPage,
        createTrip
    }
        , dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(CarPage);
