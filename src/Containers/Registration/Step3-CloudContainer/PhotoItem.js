import { connect } from 'react-redux';

import { PhotoItem } from '../../../Components/Registr-page/Step3-cloud_container/PhotoItem';
import { removePhotoDoc } from '../../../Store/Registration/actions';

const mapStateToProps = state => {
    const { registration } = state;
    return  registration;
}

const mapDispatchToProps = dispatch => ({
    removePhotoDoc: text => dispatch(removePhotoDoc(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoItem);