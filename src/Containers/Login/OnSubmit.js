import { connect } from 'react-redux';
import { OnSubmit } from '../../Components/Global/Login/OnSubmit/OnSubmit';

import { setLoginErrServer, setFormForSend, setFormMailSent, closeLogin, setLoginButtonLoad } 
from '../../Store/Login/actions';

const mapStateToProps = state => {
    const { login } = state;
    return  login;
}

const mapDispatchToProps = dispatch => ({
    setLoginErrServer: text => dispatch(setLoginErrServer(text)),
    setFormForSend: text => dispatch(setFormForSend(text)),
    setFormMailSent: text => dispatch(setFormMailSent(text)),
    closeLogin: text => dispatch(closeLogin(text)),
    setLoginButtonLoad: text => dispatch(setLoginButtonLoad(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnSubmit);