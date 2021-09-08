import { connect } from 'react-redux';
import { ResetPassword } from '../Components/Global/Login/ResetPassword/ResetPassword';
import { onResetPass } from '../Store/Login/actions';

const mapStateToProps = state => {
    const { login } = state;
    return  login;
}

const mapDispatchToProps = dispatch => ({
    onResetPass: text => dispatch(onResetPass(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);