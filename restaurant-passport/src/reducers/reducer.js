import {
    LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE,
    REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILURE,
    LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_FAILURE,
    ADDPASSPORT_START, ADDPASSPORT_SUCCESS, ADDPASSPORT_FAILURE,
    UPDATEPASSPORT_START, UPDATEPASSPORT_SUCCESS, UPDATEPASSPORT_FAILURE,
    HANDLE_EDIT_START, HANDLE_EDIT_SUCCESS, HANDLE_EDIT_FAILURE

} from '../actions/actions';

const initialState = {
    loggingIn: false,
    loggedIn: false,
    token: null,
    user_id: null,
    flipped: false,
    explore: []
};

export default function reducer (state = initialState, action) {
    switch(action.type) {
        case LOGIN_START:
            return {
                ...state,
                loggingIn: true,
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('user_id', action.payload.user_id)
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
                token: action.payload.token,
                user_id: action.payload.user_id
            }           
        case LOGIN_FAILURE:
            return {
                ...state,
                loggingIn: false,
                loggedIn: false,
            }   
        case REGISTER_START: 
            return {
                ...state,
                loggingIn: true,
            }
        case REGISTER_SUCCESS: 
            return {
                ...state,
                loggingIn: false,
            }
        case REGISTER_FAILURE: 
            return {
                ...state
            }
        case LOGOUT_START:
            return {
                ...state,
                token: null,
                user_id: null
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loggedIn: false
            }
        case LOGOUT_FAILURE:
            return {
                ...state
            }
        case ADDPASSPORT_START:
            return {
                ...state
            }
        case ADDPASSPORT_SUCCESS:
            return {
                ...state
            }
        case ADDPASSPORT_FAILURE:
            return {
                ...state
            }
        case UPDATEPASSPORT_START:
            return {
                ...state
            }
        case UPDATEPASSPORT_SUCCESS:
            return {
                ...state,
                explore: action.payload
            }
        case UPDATEPASSPORT_FAILURE:
            return {
                ...state
            }
        case HANDLE_EDIT_START:
            return {
                ...state
            }
        case HANDLE_EDIT_SUCCESS:
            return {
                ...state
            }
        case HANDLE_EDIT_FAILURE:
            return {
                ...state
            }
        default:
                return state
    }
}