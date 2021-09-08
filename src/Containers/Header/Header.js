import { connect } from 'react-redux';

import { Header } from '../../Components/Global/Header/Header';
import { closeLogin } 
from '../../Store/Login/actions';

const mapStateToProps = state => {
    return {
        loginIsClose: state.login.loginIsClose,
    };
}

const mapDispatchToProps = dispatch => ({
    closeLogin: text => dispatch(closeLogin(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);