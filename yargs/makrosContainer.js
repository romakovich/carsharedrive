const makrosContainer = yargs => {
    return (
`import { connect } from 'react-redux';

import { ${yargs} } from '../../Components/${yargs}/${yargs}';

import { setRegButtonActive } from '../../Store/${yargs}/actions';

const mapStateToProps = state => {
    const { ${yargs} } = state;
    return  ${yargs};
}

const mapDispatchToProps = dispatch => ({
    setRegButtonActive: text => dispatch(setRegButtonActive(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(${yargs});
`
    )
}

module.exports = makrosContainer;