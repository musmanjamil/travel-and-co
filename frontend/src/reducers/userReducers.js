//import * as constants from '../constants/constants';
export const authReducer = (state = { user: { error: null } }, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
        case 'REGISTRATION_REQUEST':
        case 'LOAD_USER_REQUEST':
            return {
                loading: true,
                isAuthenticated: false,
                user: null,
                error: null
            }
        case 'LOGIN_SUCCESS':
        case 'REGISTRATION_SUCCESS':
        case 'LOAD_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case 'LOGIN_FAIL':
        case 'LOGOUT_FAIL':
        case 'REGISTRATION_FAIL':
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case 'LOAD_USER_FAIL':
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
            }
        case 'LOGOUT_SUCCESS':
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
            }
        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null,
            };
        default:
            return state
    }
}


export const userReducer = (state = { error: null }, action) => {
    switch (action.type) {
        case 'UPDATE_PASSWORD_REQUEST':
        case 'UPDATE_PROFILE_REQUEST':
        case 'UPDATE_USER_REQUEST':
        case 'USER_DETAILS_REQUEST':
        case 'DELETE_USER_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            }
        case 'UPDATE_PASSWORD_SUCCESS':
        case 'UPDATE_PROFILE_SUCCESS':
        case 'UPDATE_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }

        case 'DELETE_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            }
        case 'USER_DETAILS_SUCCESS':
            return {
                ...state,
                user: action.payload,
            }
        case 'UPDATE_PASSWORD_RESET':
        case 'UPDATE_PROFILE_RESET':
        case 'UPDATE_USER_RESET':
            return {
                ...state,
                isUpdated: false
            }
        case 'DELETE_USER_RESET':
            return {
                ...state,
                isDeleted: false
            }
        case 'UPDATE_PASSWORD_FAIL':
        case 'UPDATE_PROFILE_FAIL':
        case 'UPDATE_USER_FAIL':
        case 'USER_DETAILS_FAIL':
        case 'DELETE_USER_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null,
            };
        default:
            return state
    }
}


export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case 'FORGOT_PASSWORD_REQUEST':
        case 'New_PASSWORD_REQUEST':
            return {
                ...state,
                error: null
            }
        case 'FORGOT_PASSWORD_SUCCESS':
            return {
                ...state,
                message: action.payload,
            }
        case 'NEW_PASSWORD_SUCCESS':
            return {
                ...state,
                success: action.payload.success,
            }
        case 'FORGOT_PASSWORD_FAIL':
        case 'NEW_PASSWORD_FAIL':
            return {
                ...state,
                error: action.payload
            }
        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null,
            };
        default:
            return state
    }
}
