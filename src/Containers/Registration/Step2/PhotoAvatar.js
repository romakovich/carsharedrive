import { connect } from 'react-redux';

import { PhotoAvatar } from '../../../Components/Registr-page/Step2/PhotoAvatar';
import { setImgAvatarFile, setImgAvatarUrl, setRegButtonActive, uploadAvatar } from '../../../Store/Registration/actions';

const mapStateToProps = state => {
    const { registration } = state;
    return  registration;
}

const mapDispatchToProps = dispatch => ({
    setRegButtonActive: text => dispatch(setRegButtonActive(text)),
    setImgAvatarUrl: text => dispatch(setImgAvatarUrl(text)),
    setImgAvatarFile: text => dispatch(setImgAvatarFile(text)),
    uploadAvatar: text => dispatch(uploadAvatar(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoAvatar);