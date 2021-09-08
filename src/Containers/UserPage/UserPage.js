import { connect } from 'react-redux';

import { UserPage } from '../../Components/UserPage/UserPage';

import { getUser } from '../../Store/UserPage/actions';

const mapStateToProps = state => {
    const { UserPage } = state;
    return  UserPage;
}

const mapDispatchToProps = dispatch => ({
    getUser: (user) => dispatch(getUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
