import { connect } from 'react-redux';

import { OnSubmit } from '../../../Components/Registr-page/Step1/OnSubmit';

import { setRedirect, setButtonLoad, setWarning, setRegButtonActive2, setRegButtonActive3, setErrMail, setStep3, setStep2, setImgAvatarLoad, toStep3, setFinishReg } 
from '../../../Store/Registration/actions';

const mapStateToProps = state => {
    const { registration } = state;
    return  registration;
}

const mapDispatchToProps = dispatch => ({
    setRedirect: text => dispatch(setRedirect(text)),
    setButtonLoad: text => dispatch(setButtonLoad(text)),
    setWarning: text => dispatch(setWarning(text)),
    setRegButtonActive2: boolean => dispatch(setRegButtonActive2(boolean)),
    setRegButtonActive3: boolean => dispatch(setRegButtonActive3(boolean)),
    setErrMail: text => dispatch(setErrMail(text)),
    setStep2: text => dispatch(setStep2(text)),
    setStep3: text => dispatch(setStep3(text)),
    setImgAvatarLoad: text => dispatch(setImgAvatarLoad(text)),
    toStep3: text => dispatch(toStep3(text)),
    setFinishReg: () => dispatch(setFinishReg())
});

export default connect(mapStateToProps, mapDispatchToProps)(OnSubmit);