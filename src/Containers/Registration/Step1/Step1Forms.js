import { connect } from 'react-redux';
import { Step1Forms } from '../../../Components/Registr-page/Step1/Formblocks/Step1Forms';

import { 
    setRegButtonActive1, 
    setErrMail,
    submitFormsStep1,
    setStep2,
    setStep1
 } 
from '../../../Store/Registration/actions';

const mapStateToProps = state => {
    const { registration } = state;
    return  registration;
}

const mapDispatchToProps = dispatch => ({
    setRegButtonActive1: boolean => dispatch(setRegButtonActive1(boolean)),
    setErrMail: text => dispatch(setErrMail(text)),
    setStep2: boolean => dispatch(setStep2(boolean)),
    setStep1: boolean => dispatch(setStep1(boolean)),
    submitFormsStep1: text => dispatch(submitFormsStep1(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(Step1Forms);