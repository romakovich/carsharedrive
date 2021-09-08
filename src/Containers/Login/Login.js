import { connect } from 'react-redux';

import { Login } from '../../Components/Global/Login/Login';
import { setLoginButtonLoad, setLoginButtonActive, setLoginErrMail, setLoginErrPassword, setLoginErrServer, 
    setLoginMail, setLoginPassword, setFormMailSent, setFormForSend, closeLogin} 
from '../../Store/Login/actions';

const mapStateToProps = state => {
    const { login } = state;
    return  login;
}

const mapDispatchToProps = dispatch => ({
    setLoginMail: text => dispatch(setLoginMail(text)),
    setLoginPassword: text => dispatch(setLoginPassword(text)),
    setLoginButtonLoad: text => dispatch(setLoginButtonLoad(text)),
    setLoginButtonActive: text => dispatch(setLoginButtonActive(text)),
    setLoginErrMail: text => dispatch(setLoginErrMail(text)),
    setLoginErrPassword: text => dispatch(setLoginErrPassword(text)),
    setLoginErrServer: text => dispatch(setLoginErrServer(text)),
    setFormMailSent: text => dispatch(setFormMailSent(text)),
    setFormForSend: text => dispatch(setFormForSend(text)),
    closeLogin: text => dispatch(closeLogin(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);