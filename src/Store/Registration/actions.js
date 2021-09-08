import * as c from './constants';
import * as error from '../Constants/Errors';

const createAction = type => payload => ({ type, payload });
import { onSubmitGET, onSubmitPOST } from '../Submits';
import { setAuth } from '../Login/actions';
import jwtDecode from 'jwt-decode';
import { getName } from '../config/getName';

/*All inputs in step1*/

export const setAllValid = createAction(c.CHANGE_ALL_VALID);
export const setErrMail = createAction(c.CHANGE_ERR_MAIL_TEXT);
export const setUserData = createAction(c.SET_USER_DATA);

/*Step2*/
export const setImgAvatarFile = createAction(c.SET_IMG_AVATAR_FILE);
export const setImgAvatarUrl = createAction(c.SET_IMG_AVATAR_URL);
export const setImgAvatarLoad = createAction(c.SET_IMG_AVATAR_LOAD);

export const setStep3Request = () => ({ type: c.SET_STEP3_REQUEST });
export const setStep3Success = data => ({ type: c.SET_STEP3_SUCCESS, payload: data });
export const setStep3Failure = error => ({ type: c.SET_STEP3_FAILURE, payload: error })

export const uploadAvatarRequest = () => ({ type: c.UPLOAD_AVATAR_REQUEST });
export const uploadAvatarSuccess = data => ({ type: c.UPLOAD_AVATAR_SUCCESS, payload: data });
export const uploadAvatarFailure = error => ({ type: c.UPLOAD_AVATAR_FAILURE, payload: error })

export const changeDocItem = createAction(c.CHANGE_DOC_ITEM);

export const uploadAvatar = () => {

    return (dispatch, getStore) => {
        const formData = new FormData();
        formData.append('file', getStore().registration.imgAvatarFile);
        dispatch(uploadAvatarRequest());

        fetch('http://localhost:8000/users/registration/uploadAvatar'
        , { method: "POST", body: formData })
        .then(response => {
            if(!response.ok) {
                return (
                    dispatch(uploadAvatarRequest())
                    , dispatch(uploadAvatarFailure(error.CODE_500_PHOTO))
                    , setTimeout(() => { dispatch(uploadAvatarFailure(false)) }, 3000) )};
            response.json()
            .then(json=> {
                dispatch(uploadAvatarSuccess(json));
                dispatch(setImgAvatarUrl({
                    img: json.img,
                    url: `http://localhost:8000/static/avatar/${json.img}`
                }
                    ))
            })
        },
            error => {
                dispatch(uploadAvatarFailure(error)), 
                setTimeout(() => { dispatch(uploadAvatarFailure("Не удалось загрузить фото. Попробуйте ещё раз")) }, 2000)})
        }
}
export const setStep1 = createAction(c.SET_STEP1);
export const setStep2 = createAction(c.SET_STEP2);
export const setStep3 = createAction(c.SET_STEP3);

export const toStep3 = () => 
    onSubmitGET( 'http://localhost:8000/users/registration/tostep3', 
        setStep3Request,
        setStep3Success,
        setStep3Failure )

/*Step3*/

export const setRedirect = createAction(c.CHANGE_REDIRECT);
export const setPhotoDoc = createAction(c.SET_PHOTO_DOC);
export const removePhotoDoc = createAction(c.REMOVE_PHOTO_DOC);
export const setImgDocFile = createAction(c.SET_IMG_DOC_FILE);

export const setPhotoDocRequest = () => ({ type: c.SET_PHOTO_DOC_REQUEST });
export const setPhotoDocSuccess = data => ({ type: c.SET_PHOTO_DOC_SUCCESS, payload: data });
export const setPhotoDocFailure = error => ({ type: c.SET_PHOTO_DOC_FAILURE, payload: error })
export const setSumDocsSize = createAction(c.SET_SUM_DOCS_SIZE);
export const addPhotoDoc = () => {
    
    return (dispatch, getStore) => {
        const formData = new FormData();
        Object.values(getStore().registration.imgDocFile).map(el => {
            formData.append('uploadDocs', el)
        })
        dispatch(setPhotoDocRequest());
        fetch('http://localhost:8000/users/registration/uploadDocs'
        , { method: "POST", 
        body: formData })
        .then(response => {
            if(!response.ok) {
                return (dispatch(setPhotoDocRequest())
                , dispatch(setPhotoDocFailure(error.CODE_500_PHOTO))
                , setTimeout(() => { dispatch(setPhotoDocFailure(false)) }, 3000) )};
            response.json()
            .then(json=> {
                dispatch(setPhotoDocSuccess(json));
                let sumDocsSize = [];
                let docsArr = [];
                
                Object.values(json).map(el => {
                    docsArr.push({
                        imgUrl:`http://localhost:8000/static/docs/${el.img}`,
                        imgName: el.img,
                        imgSize: el.size,
                        imgExt: el.extension
                    });
                })
                try {
                    sumDocsSize = docsArr.concat(getStore().registration.photosDoc)
                    .map(el => Number(el.imgSize))
                    .reduce((accumulator, currentValue) => accumulator + currentValue ).toFixed(2);
                } catch (err) {}

                if(sumDocsSize > 30) return (
                    dispatch(finishRegFailure(error.VERY_SIZE_DOCS))
                    , setTimeout(() => { dispatch(finishRegFailure(false)) }, 2000)
                    );
                dispatch(setPhotoDoc(docsArr));
            })
        },
            error => {
                dispatch(setPhotoDocFailure(error.CODE_102_PHOTO)), 
                setTimeout(() => { dispatch(setPhotoDocFailure(false)) }, 2000)})
        }
}

export const setRegButtonActive1 = createAction(c.SET_REG_BUTTON_ACTIVE1);
export const setRegButtonActive2 = createAction(c.SET_REG_BUTTON_ACTIVE2);
export const setRegButtonActive3 = createAction(c.SET_REG_BUTTON_ACTIVE3);

export const setButtonLoad = createAction(c.CHANGE_BUTTON_LOAD);
export const setWarning = createAction(c.CHANGE_WARNING_TEXT);

export const step1FormsRequest = () => ({ type: c.SET_STEP1_FORMS_REQUEST });
export const step1FormsSuccess = data => ({ type: c.SET_STEP1_FORMS_SUCCESS, payload: data });
export const step1FormsFailure = error => ({ type: c.SET_STEP1_FORMS_FAILURE, payload: error })

export const submitFormsStep1 = data => {
    return (dispatch) => {
    dispatch(step1FormsRequest());
    fetch("http://localhost:8000/users/registration/step1", {
        method: 'POST',  
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify(data) })
    .then(response => {
        dispatch(step1FormsRequest())
        if(!response.ok) {
            return response.status == "401"
            ? (dispatch(step1FormsFailure(error.CODE_401))
            , dispatch(setErrMail(error.CODE_401))
            , setTimeout(() => { dispatch(setPhotoDocFailure(false)) }, 3000) )
            : (dispatch(step1FormsFailure(error.CODE_500))
            , setTimeout(() => { dispatch(setPhotoDocFailure(false)) }, 3000) )
        } else {
            dispatch(step1FormsSuccess())
            , dispatch(setUserData(data))
        }
    },
    err => {
        dispatch(step1FormsRequest());
        console.log(err);
        dispatch(step1FormsFailure(error.FAILED_TO_FETCH))
        , setTimeout(() => { dispatch(setPhotoDocFailure(false)) }, 3000);
    })
    }
}

export const finishRegRequest = () => ({ type: c.FINISH_REG_REQUEST });
export const finishRegSuccess = data => ({ type: c.FINISH_REG_SUCCESS, payload: data });
export const finishRegFailure = error => ({ type: c.FINISH_REG_FAILURE, payload: error })

export const setFinishReg = () => {
    
    return (dispatch, getStore) => {
        let photosDoc = getStore().registration.photosDoc;
        let imgAvatar = getStore().registration.imgAvatar.img;
        let userData = getStore().registration.userData;
        let fullUserData = {...userData};
        fullUserData.imgAvatar = imgAvatar;
        fullUserData.photosDoc = Object.values(photosDoc)
        .map(el => el = el.imgName);
        console.log("ok");
        dispatch(finishRegRequest());
        fetch("http://localhost:8000/users/registration/toSuccess", {
            method: 'POST',  
            headers: { 'Content-Type': 'application/json' },  
            body: JSON.stringify(fullUserData) })
            .then(response => {
                
                dispatch(finishRegRequest());
                
                if(!response.ok) {
                    (dispatch(finishRegFailure(error.CODE_500))
                    , setTimeout(() => { dispatch(finishRegFailure(false)) }, 3000) )
                } else {
                    return response.json()
                    .then(json => {
                       dispatch(finishRegSuccess());
                       localStorage.setItem("accessToken", json.accessToken);
                       localStorage.setItem("refreshToken", json.refreshToken);
                       localStorage.setItem("userMail", jwtDecode(json.accessToken).mail)
                       getName();
                    })
                }
            },
            err => {
                dispatch(finishRegRequest());
                console.log(err);
                dispatch(finishRegFailure(error.FAILED_TO_FETCH))
                , setTimeout(() => { dispatch(finishRegFailure(false)) }, 3000);
                }
            )
    
}
}

export const setFinishRegFalse = createAction(c.SET_FINISH_REG);