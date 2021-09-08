const makrosComponent = yargs => {
    return (
`import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const ${yargs} = ({}) => {

    const [active, setActive] = useState(false);

    return (
        <div className="${yargs.toLowerCase()}__container">
        
        </div>
    )
}
`
    )
}


module.exports = makrosComponent;