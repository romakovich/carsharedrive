import { connect } from 'react-redux';

import { Registration } from '../../Components/Registr-page/Registration';
import { setRegButtonActive, setImgAvatarUrl, setImgAvatarFile, setButtonLoad, setImgAvatarLoad, setWarning, setStep1, setStep2, setStep3, uploadAvatar, addPhotoDoc, setPhotoDoc } from '../../Store/Registration/actions';

const mapStateToProps = state => {
    const { registration } = state;
    return  registration;
}

const mapDispatchToProps = dispatch => ({

    setRegButtonActive: text => dispatch(setRegButtonActive(text)),
    setStep1: text => dispatch(setStep1(text)),
    setStep2: text => dispatch(setStep2(text)),
    setStep3: text => dispatch(setStep3(text)),

    setImgAvatarUrl: () => dispatch(setImgAvatarUrl()),
    setImgAvatarFile: text => dispatch(setImgAvatarFile(text)),
    setButtonLoad: text=> dispatch(setButtonLoad(text) ),
    setImgAvatarLoad: text => dispatch(setImgAvatarLoad(text)),
    uploadAvatar: () => dispatch(uploadAvatar()),
    setWarning: text => dispatch(setWarning(text)),
    addPhotoDoc: () => dispatch(addPhotoDoc()),
    setPhotoDoc: () => dispatch(setPhotoDoc())
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);