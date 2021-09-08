import { connect } from 'react-redux';
import { AllForms } from '../../Components/Global/Login/inputBlock/AllForms';

import { setLoginErrMail, setLoginErrPassword, setLoginErrServer, 
    setLoginMail, setLoginPassword, closeLogin, setFormForSend, onAuth, onForgetPass } 
from '../../Store/Login/actions';

const mapStateToProps = state => {
    const { login } = state;
    return  login;
}

const mapDispatchToProps = dispatch => ({
    setLoginMail: text => dispatch(setLoginMail(text)),
    setLoginPassword: text => dispatch(setLoginPassword(text)),
    setLoginErrMail: text => dispatch(setLoginErrMail(text)),
    setLoginErrPassword: text => dispatch(setLoginErrPassword(text)),
    setLoginErrServer: text => dispatch(setLoginErrServer(text)),
    closeLogin: text => dispatch(closeLogin(text)),
    setFormForSend: text => dispatch(setFormForSend(text)),
    onAuth: text => dispatch(onAuth(text)),
    onForgetPass: text => dispatch(onForgetPass(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllForms);