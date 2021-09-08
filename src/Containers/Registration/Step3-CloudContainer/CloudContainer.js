import { connect } from 'react-redux';

import { CloudContainer } from '../../../Components/Registr-page/Step3-cloud_container/CloudContainer';
import { addPhotoDoc, setImgDocFile } from '../../../Store/Registration/actions';

const mapStateToProps = state => {
    const { registration } = state;
    return  registration;
}

const mapDispatchToProps = dispatch => ({
    addPhotoDoc: text => dispatch(addPhotoDoc(text)),
    setImgDocFile: text => dispatch(setImgDocFile(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CloudContainer);