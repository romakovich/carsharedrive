export const onSubmitGET = (url, req, success, failure) => {
    return (dispatch, getState) => {
        dispatch(req());
        fetch(url)
        .then(response => {
            
            if(!response.ok) {
                return (dispatch(req())
                , dispatch(failure())
                , setTimeout(() => { dispatch(failure()) }, 2000) )};
            dispatch(success(response)) },
            error => {dispatch(failure(error)), 
                setTimeout(() => { dispatch(failure()) }, 2000)})
        }
}

export const onSubmitPOST = ( url, body, req, success, failure ) => {
    return dispatch => {
        dispatch(req());
        fetch(url, { method: "POST", headers: { 'Content-Type': 'application/json' }, body })
        .then(response => {
            if(!response.ok) return (dispatch(req()), dispatch(failure()), setTimeout(() => { dispatch(failure()) }, 2000) );
            response.json()
            .then(()=> {
                dispatch(success(json));
            })
        },
            error => {
                dispatch(failure(error)), 
                setTimeout(() => { dispatch(failure()) }, 2000)})
        }
}