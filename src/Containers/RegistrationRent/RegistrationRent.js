import { connect } from 'react-redux';

import { RegistrationRent } from '../../Components/RegistrationRent/RegistrationRent';

import { setRegButtonActive } from '../../Store/RegistrationRent/actions';

const mapStateToProps = state => {
    const { RegistrationRent } = state;
    return  RegistrationRent;
}

const mapDispatchToProps = dispatch => ({
    setRegButtonActive: text => dispatch(setRegButtonActive(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationRent);
