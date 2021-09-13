import { defaultState } from './defaultState';
import * as c from './constants';

export const registration = (state = defaultState, action) => {

    switch(action.type) {
        case c.SET_USER_DATA:
            return {
                ...state,
                userData: action.payload
            };
        case c.SET_IMG_AVATAR_URL:
            return {
                ...state,
                imgAvatar: action.payload
            };
        case c.SET_IMG_AVATAR_FILE:
            return {
                ...state,
                imgAvatarFile: action.payload
            };
        case c.SET_IMG_AVATAR_LOAD:
            return {
                ...state,
                imgAvatarLoad: action.payload
            };
        case c.SET_REG_BUTTON_ACTIVE1:
            return {
                ...state,
                regButtonActive1: action.payload
            };
        case c.SET_REG_BUTTON_ACTIVE2:
            return {
                ...state,
                regButtonActive2: action.payload
            };
        case c.SET_REG_BUTTON_ACTIVE3:
            return {
                ...state,
                regButtonActive3: action.payload
                };
        case c.CHANGE_BUTTON_LOAD:
            return {
                ...state,
                buttonLoad: action.payload,
            };
        case c.CHANGE_REDIRECT:
            return {
                ...state,
                redirect: action.payload,
            };
        case c.CHANGE_ALL_VALID:
            return {
                ...state,
                isValid: action.payload,
            };
        case c.CHANGE_WARNING_TEXT:
            return {
                ...state,
                warning: action.payload,
            };
        case c.CHANGE_ERR_MAIL_TEXT:
            return {
                ...state,
                errMail: action.payload,
            };
        case c.SET_STEP1:
            return {
                ...state,
                isStep1: action.payload,
            };
        case c.SET_STEP2:
            return {
                ...state,
                isStep2: action.payload,
            };
        case c.SET_STEP3:
            return {
                ...state,
                isStep3: action.payload
            };
        case c.SET_STEP3_REQUEST:
            return {
                ...state,
                buttonLoad: state.buttonLoad ? false : true,
            };
        case c.SET_STEP3_FAILURE:
            return {
                ...state,
                buttonLoad: false,
                warning: state.warning == "Не удалось продолжить регистрацию. Попробуйте ещё раз" ? null : "Не удалось продолжить регистрацию. Попробуйте ещё раз",

            };
        case c.SET_STEP3_SUCCESS: 
            return {
                ...state,
                buttonLoad: false,
                isStep3: true,
                isStep2: false,
                errMail: action.payload,
            };
        case c.UPLOAD_AVATAR_REQUEST:
            return {
                ...state,
                buttonLoad: state.buttonLoad ? false : true,
            };
        case c.UPLOAD_AVATAR_FAILURE:
            return {
                ...state,
                buttonLoad: false,
                warning: action.payload,

            };
        case c.UPLOAD_AVATAR_SUCCESS: 
            return {
                ...state,
                buttonLoad: false,
            };
        case c.SET_PHOTO_DOC:
            return {
                ...state,
                photosDoc: state.photosDoc.concat(action.payload)
            };
        case c.REMOVE_PHOTO_DOC: 
            return {
                ...state,
                photosDoc: action.payload
            }
        case c.SET_IMG_DOC_FILE:
            return {
                ...state,
                imgDocFile: action.payload
            };
        case c.SET_PHOTO_DOC_REQUEST:
            return {
                ...state,
                buttonLoad: state.buttonLoad ? false : true,
            };
        case c.SET_PHOTO_DOC_FAILURE:
            return {
                ...state,
                buttonLoad: false,
                warning: action.payload,
            };
        case c.SET_PHOTO_DOC_SUCCESS: 
            return {
                ...state,
                buttonLoad: false,
            };
        case c.CHANGE_DOC_ITEM:
            return {
                ...state,
                docItem: state.docItem.concat(action.payload)
            }
        case c.SET_STEP1_FORMS_REQUEST: 
            return {
                ...state,
                buttonLoad: state.buttonLoad ? false : true,
            }
        case c.SET_STEP1_FORMS_SUCCESS: 
            return {
            ...state,
            buttonLoad: false,
            errMail: null,
            isStep1: false,
            isStep2: true,
            step1complited: true,
            regButtonActive: false
        };
        case c.SET_FINISH_REG: 
        return {
            ...state,
            isFinish: action.payload
        };
        case c.SET_STEP1_FORMS_FAILURE:
            return {
                ...state,
                buttonLoad: false,
                warning: action.payload,
            };
        case c.FINISH_REG_FAILURE:
            return {
                ...state,
                buttonLoad: false,
                warning: action.payload,
            };
        case c.FINISH_REG_REQUEST:
            return {
                ...state,
                buttonLoad: state.buttonLoad ? false : true,
            };
        case c.FINISH_REG_SUCCESS:
            return {
                ...state,
                buttonLoad: false,
                isStep3: false,
                isFinish: true,
                userData: {},
                isStep1: true,
            };
    default: return state;
        }
}